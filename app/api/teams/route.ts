import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { InviteLinkEmail } from "@/emails/invite-link-email";
import { jwtValidationResponse, validateToken } from "@kinde/jwt-validator";
import { UserRole } from "@prisma/client";
import { jwtDecode } from "jwt-decode";

import { prisma } from "@/lib/db";
import { resend } from "@/lib/email";
import * as Sentry from "@sentry/nextjs";

export const POST = async (req, res) => {
  try {
    const token: string = (req.headers.get("Authorization") || "").replace("Bearer ", "");

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
      return new Response("Please provide all required fields", {
        status: 400,
      });
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

    if (!user.teamId) {
      return new Response("You are not part of a team", {
        status: 401,
      });
    }

    // Check if there's already an invitation for the same email
    const existingInvitation = await prisma.teamInvitation.findUnique({
      where: { email },
    });

    if (existingInvitation) {
      return new Response("An invitation with this email already exists", {
        status: 400,
      });
    }

    console.log("Creating team invitation for team id: ", user.teamId);

    const team = await prisma.team.findUnique({
      where: {
        id: user.teamId,
      },
      select: {
        teamMembers: {
          where: {
            id: {
              not: userId, 
            },
          },
          include: {
            recognitionsReceived: {
              select: {
                points: true,
              },
            },
          },
        },
      },
    });

    const memberCount = team!.teamMembers.length;

    if (
      (user.ltdPlan === "starter" && memberCount >= 20) ||
      (user.ltdPlan === "growth" && memberCount >= 100)
    ) {
      return new Response(
        `Cannot invite more members. The ${user.ltdPlan} plan allows a maximum of ${user.ltdPlan === "starter" ? 20 : 100} members.`,
        { status: 403 }
      );
    }

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

    const { data, error } = await resend.emails.send({
      from: "no-reply@recognify.io",
      to: email,
      subject: "You have been invited to join a team in Recognify!",
      react: InviteLinkEmail({
        invitationName: name,
        invitationEmail: email,
        senderName: user.name!,
        invitationToken: invitedMember.token,
      }),
      headers: {
        "X-Entity-Ref-ID": new Date().getTime() + "",
      },
    });
    console.log(data);

    if (error || !data) {
      console.error(error);
      return new Response("Can't send invitation email", { status: 500 });
    }

    return new Response(
      JSON.stringify({
        data: invitedMember,
        message: "Invitation has been created successfully",
      }),
      { status: 201 },
    );
  } catch (e) {
    console.error(e.stack || e);
    return new Response("An error occurred", { status: 500 });
  }
};

export const GET = async (req: Request, res: Response) => {
  try {
    // Extract token from the request headers
    const token: string = (req.headers.get("Authorization") || "").replace("Bearer ", "");

    // Validate the token using Kinde validation
    const validationResult: jwtValidationResponse = await validateToken({
      token,
      domain: process.env.KINDE_ISSUER_URL,
    });

    // Check if the token is valid
    if (!validationResult.valid) {
      return new Response("Invalid token", { status: 401 });
    }

    // Decode the token to extract the userId
    const userId = jwtDecode(token).sub;

    if (!userId) {
      return new Response("Invalid user", { status: 401 });
    }

    // Find the user in the database by their id
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Return 404 if the user is not found
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Check if the user has the TEAM_LEADER role
    if (user.role !== UserRole.TEAM_LEADER) {
      return new Response("You are not authorized to perform this action", {
        status: 401,
      });
    }

    // Check if the user is part of a team
    if (!user.teamId) {
      return new Response("You are not part of a team", {
        status: 401,
      });
    }

    // Find the team, but exclude the team member with the matching userId
    const team = await prisma.team.findUnique({
      where: {
        id: user.teamId,
      },
      select: {
        teamMembers: {
          where: {
            id: {
              not: userId, // Exclude the userId from team members
            },
          },
          include: {
            recognitionsReceived: {
              select: {
                points: true,
              },
            },
          },
        },
      },
    });

    // If no team is found, return a 404 response
    if (!team) {
      return new Response("No team has been found", {
        status: 404,
      });
    }

    // Return the team information excluding the current user
    return new Response(JSON.stringify(team), {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return new Response("Error happened", {
      status: 500,
    });
  }
};

export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse("", {
    status: 200,
  });
};
