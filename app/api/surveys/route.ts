import { jwtValidationResponse, validateToken } from "@kinde/jwt-validator";
import { Survey, SurveyStatus, UserRole } from "@prisma/client";
import { jwtDecode } from "jwt-decode";

import { prisma } from "@/lib/db";

export const GET = async (req, res) => {
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

  let surveys: Survey[] = [];

  if (user.role === UserRole.TEAM_LEADER) {
    surveys = await prisma.survey.findMany({
      where: {
        teamId: user.teamId!,
      },
    });
  } else {
    surveys = await prisma.survey.findMany({
      where: {
        teamId: user.teamId!,
        selectedTeamMembers: {
          some: {
            id: user.id,
          },
        },
      },
    });
  }

  return new Response(JSON.stringify(surveys), {
    status: 200,
  });
};

export const POST = async (req, res) => {
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

  const {
    title,
    description,
    questions,
    teamMembers,
  }: Partial<Survey & { teamMembers: string[] }> = await req.json();

  if (!title || title === "") {
    return new Response("Missing or invalid 'title'", { status: 400 });
  }

  if (!description || description === "") {
    return new Response("Missing or invalid 'description'", { status: 400 });
  }

  if (!questions) {
    return new Response("Missing or invalid 'questions'", { status: 400 });
  }

  if (!teamMembers || teamMembers.length <= 0) {
    return new Response("Missing or invalid 'teamMembers'", { status: 400 });
  }

  const selectedTeamMembers = await prisma.user.findMany({
    where: {
      id: {
        in: teamMembers,
      },
    },
  });

  const survey = await prisma.survey.create({
    data: {
      title: title,
      description: description,
      teamId: user.teamId!,
      questions: questions,
      selectedTeamMembers: {
        connect: selectedTeamMembers.map((member) => ({ id: member.id })),
      },
      status: SurveyStatus.ACTIVE,
    },
  });

  return new Response("Survey has been created", {
    status: 201,
  });
};
