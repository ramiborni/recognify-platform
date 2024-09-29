import {
  validateToken,
  type jwtValidationResponse,
} from "@kinde/jwt-validator";
import { init, Users } from "@kinde/management-api-js";
import { UserRole } from "@prisma/client";
import { jwtDecode } from "jwt-decode";

import { prisma } from "@/lib/db";

export const GET = async (req, res) => {
  const token: string = req.headers.get("Authorization").replace("Bearer ", "");

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

  init();
  const users = await Users.getUsers();
  const user = await Users.getUserData({
    id: userId,
  });

  if (!user) {
    return new Response("Invalid user", { status: 401 });
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    return new Response("User not found", { status: 404 });
  }

  return new Response(JSON.stringify(dbUser), { status: 200 });
};

export const POST = async (req, res) => {
  const token: string = req.headers.get("Authorization").replace("Bearer ", "");
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

  init();
  const user = await Users.getUserData({
    id: userId,
  });

  if (!user) {
    return new Response("Invalid user", { status: 401 });
  }

  const inviteToken = req.body.inviteToken;

  let invitation;

  if(inviteToken){
    invitation = await prisma.teamInvitation.findUnique({
      where: {
        token: inviteToken,
      },
      include: {
        team: true,
      }
    });
  }

  try {
    const dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.preferred_email,
        name: user.first_name + " " + user.last_name,
        profilePicute: user.picture,
        role: invitation ? UserRole.USER : UserRole.TEAM_LEADER,
      },
    });

    if (!invitation) {
      await prisma.team.create({
        data: {
          name: "My Team",
          teamMembers: {
            connect: {
              id: dbUser.id,
            },
          },
        },
      });
    } else {
      await prisma.team.update({
        where: {
          id: invitation.team.id,
        },
        data: {
          teamMembers: {
            connect: {
              id: dbUser.id,
            },
          },
        },
      });
    }

    return new Response("User created successfully!", { status: 200 });
  } catch (e) {
    console.error(e);
    if (e.code === "P2002") {
      return new Response("User already exists", { status: 409 });
    }
    return new Response("Internal server error", { status: 500 });
  }
};

export const DELETE = async (req) => {
  if (!req.auth) {
    return new Response("Not authenticated", { status: 401 });
  }

  const currentUser = req.auth.user;
  if (!currentUser) {
    return new Response("Invalid user", { status: 401 });
  }

  try {
    await prisma.user.delete({
      where: {
        id: currentUser.id,
      },
    });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }

  return new Response("User deleted successfully!", { status: 200 });
};
