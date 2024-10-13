import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { AddedRecognition } from "@/emails/added-recognition";
import { jwtValidationResponse, validateToken } from "@kinde/jwt-validator";
import { Recognition } from "@prisma/client";
import { jwtDecode } from "jwt-decode";

import { prisma } from "@/lib/db";
import { resend } from "@/lib/email";

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

  const url = new URL(req.url);
  console.log(url);

  const pathSegments = url.pathname.split("/");


  const recognitionId = pathSegments[pathSegments.length - 2];

  console.log(recognitionId);

  const recognition = await prisma.recognition.findUnique({
    where: {
      id: recognitionId,
    },
  });

  if (!recognition) {
    return new Response("Recognition not found", { status: 404 });
  }

  const recognitionClap = await prisma.clap.create({
    data: {
      userId: userId,
      recognitionId: recognitionId,
    },
  });

  return new Response("Clap has been added", { status: 201 });
};

export const DELETE = async (req: Request, res: Response) => {
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

  const url = new URL(req.url);
  const pathSegments = url.pathname.split("/");

  const recognitionId = pathSegments[pathSegments.length - 2];

  const recognition = await prisma.recognition.findUnique({
    where: {
      id: recognitionId,
    },
    include: {
      claps: true,
    },
  });

  if (!recognition) {
    return new Response("Recognition not found", { status: 404 });
  }

  const clap = recognition.claps.find(
    (c) => c.recognitionId === recognitionId && c.userId === userId,
  );

  if (!clap) {
    return new Response("Clap not found", { status: 404 });
  }

  await prisma.clap.delete({
    where: {
      id: clap?.id,
    },
  });

  return new Response("Recognition has been added", { status: 201 });
};
