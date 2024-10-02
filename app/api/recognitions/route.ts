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

  const { receiverId, message, isPublic, badges }: Partial<Recognition> =
    await req.json();

  if (!receiverId || !message || !isPublic || !badges) {
    return new Response("Missing data in the request");
  }

  const recognition = await prisma.recognition.create({
    data: {
      giverId: userId,
      receiverId: receiverId,
      message: message.trim(),
      isPublic: isPublic,
      badges: badges,
    },
  });

  return new Response("Recognition has been added", { status: 201 });
};

export const GET = ( req: Request, res: Response) => {
    
}