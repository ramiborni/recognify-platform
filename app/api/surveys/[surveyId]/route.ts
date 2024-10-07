import { jwtValidationResponse, validateToken } from "@kinde/jwt-validator";
import { Survey, SurveyStatus, UserRole } from "@prisma/client";
import { jwtDecode } from "jwt-decode";

import { prisma } from "@/lib/db";
import { InputJsonValue } from "@prisma/client/runtime/library";

export const PATCH = async (
  req: Request,
  { params }: { params: { surveyId: string } },
) => {
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

  if (user.role !== UserRole.TEAM_LEADER) {
    return new Response("You have no right to do this operation", {
      status: 401,
    });
  }

  const { surveyId } = params;
  const {
    title,
    description,
    questions,
    teamMembers,
  }: Partial<Survey & { teamMembers: string[] }> = await req.json();

  const selectedTeamMembers = await prisma.user.findMany({
    where: {
      id: {
        in: teamMembers,
      },
    },
  });

  const survey = await prisma.survey.update({
    where: {
      id: surveyId, // The ID of the survey you want to update
    },
    data: {
      title: title, // Update the title
      description: description, // Update the description
      teamId: user.teamId!, // Update the teamId if necessary
      questions: questions as unknown as InputJsonValue[], // Update questions
      selectedTeamMembers: {
        set: [], // Clear existing members first (optional, depends on your use case)
        connect: selectedTeamMembers.map((member) => ({ id: member.id })), // Update members
      },
      status: SurveyStatus.ACTIVE, // Update status
    },
  });

  return new Response("Survey has been updates", {
    status: 200,
  });

}

export const DELETE = async (
  req: Request,
  { params }: { params: { surveyId: string } },
) => {
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

  if (user.role !== UserRole.TEAM_LEADER) {
    return new Response("You have no right to do this operation", {
      status: 401,
    });
  }

  const { surveyId } = params;

  await prisma.survey.delete({
    where: {
      id: surveyId,
    },
  });

  return new Response("Survey deleted", {
    status: 200,
  });
};
