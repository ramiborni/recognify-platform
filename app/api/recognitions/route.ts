import { AddedRecognition } from "@/emails/added-recognition";
import { jwtValidationResponse, validateToken } from "@kinde/jwt-validator";
import { jwtDecode } from "jwt-decode";
import { Recognition } from "@prisma/client";

import { prisma } from "@/lib/db";
import { resend } from "@/lib/email";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  const token: string = req.headers
    .get("Authorization")!
    .replace("Bearer ", "");
  const validationResult: jwtValidationResponse = await validateToken({
    token,
    domain: process.env.KINDE_ISSUER_URL,
  });

  if (!validationResult.valid) {
    return new Response("Invalid token", { status: 401 });
  }

  const userId = jwtDecode(token).sub;

  if (!userId) {
    return new Response("Invalid user", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const {
    receiverId,
    message,
    isPublic,
    badges,
    points,
  }: Partial<Recognition> = await req.json();

  if (!receiverId || receiverId === "") {
    return new Response("Missing or invalid 'receiverId'", { status: 400 });
  }

  if (!message || message === "") {
    return new Response("Missing or invalid 'message'", { status: 400 });
  }

  if (typeof isPublic === "undefined") {
    return new Response("Missing or invalid 'isPublic'", { status: 400 });
  }

  if (!badges || badges.length <= 0) {
    return new Response("Missing or invalid 'badges'", { status: 400 });
  }

  const receiver = await prisma.user.findUnique({
    where: {
      id: receiverId,
    },
  });

  if (!receiver) {
    return new Response("Can't find the receiver in the database", {
      status: 404,
    });
  }

  const recognition = await prisma.recognition.create({
    data: {
      giverId: userId,
      receiverId: receiverId,
      message: message!.trim(),
      isPublic: isPublic,
      badges: badges,
      points: points!,
      teamId: user.teamId!
    },
  });

  if (recognition) {
    const { data, error } = await resend.emails.send({
      from: "no-reply@recognify.io",
      to: receiver.email!,
      subject: "👏 You're Awesome! Someone Just Recognized You!",
      react: AddedRecognition({
        receiverFullName: receiver.name!,
        senderFullName: user.name!,
        points: points!,
      }),
      // Set this to prevent Gmail from threading emails.
      // More info: https://resend.com/changelog/custom-email-headers
      headers: {
        "X-Entity-Ref-ID": new Date().getTime() + "",
      },
    });
    console.log(data);
  }

  return new Response("Recognition has been added", { status: 201 });
};


export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse('', {
    status: 200
  })
}