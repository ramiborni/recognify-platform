import { inviteTeamMember } from "@/actions/invite-team-member";
import { auth } from "@/auth";
import { jwtValidationResponse, validateToken } from "@kinde/jwt-validator";
import { UserRole } from "@prisma/client";
import { jwtDecode } from "jwt-decode";

import { prisma } from "@/lib/db";

export const POST = async (req, res) => {
  try{
    console.log("IM IN THE POST FUNCTION");
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
  
    const { email, name } = await req.json();
  
    if (!email || !name) {
      return new Response("Please provide all required fields", { status: 400 });
    }
  
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
  
    if (user.role !== UserRole.TEAM_LEADER) {
      return new Response("You are not authorized to perform this action", {
        status: 401,
      });
    }

    if(!user.teamId){
      return new Response("You are not part of a team", {
        status: 401,
      });
    }

    console.log("Creating team invitation for team id: ", user.teamId);

    console.log(prisma.teamInvitation.fields);
  
    const invitedMember = await prisma.teamInvitation.create({
      data: {
        email,
        name: name!,
        token:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        team: {
          connect: {
            id: user.teamId!,
          },
        },
      },
    });
  
    return new Response(
      JSON.stringify({
        data: invitedMember,
        message: "Invitation has been created successfully",
      }),
      { status: 201 },
    );
  }catch(e){
    console.error(e.stack || e);
    return new Response("An error occurred", { status: 500 });
  }
};
