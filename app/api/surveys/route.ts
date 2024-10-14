import { sendSlackNotification } from "@/actions/slack-notifications";
import { InviteSurvey } from "@/emails/invite-survey";
import { jwtValidationResponse, validateToken } from "@kinde/jwt-validator";
import { Survey, SurveyStatus, UserRole } from "@prisma/client";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { jwtDecode } from "jwt-decode";

import { env } from "@/env.mjs";
import { prisma } from "@/lib/db";
import { resend } from "@/lib/email";

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

  // Check if the user's ltdPlan is 'starter'
  if (user.ltdPlan === "starter") {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1); // Start of current month

    // Count how many surveys the user has created this month
    const surveyCount = await prisma.survey.count({
      where: {
        teamId: user.teamId!,
        createdAt: {
          gte: startOfMonth, // Only count surveys created since the beginning of this month
        },
      },
    });

    if (surveyCount >= 10) {
      return new Response("You have reached the limit of 10 surveys for this month on the Starter plan", {
        status: 403,
      });
    }
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
      questions: questions as unknown as InputJsonValue[],
      selectedTeamMembers: {
        connect: selectedTeamMembers.map((member) => ({ id: member.id })),
      },
      status: SurveyStatus.ACTIVE,
    },
  });
  
  if (user.slackWebhook) {
    sendSlackNotification({
      type: "survey",
      surveyUrl: env.NEXT_PUBLIC_APP_URL + "/dashboard/surveys/" + survey.id,
      webhookUrl: user.slackWebhook!,
    });
  }

  if (survey) {
    for (let i = 0; i < selectedTeamMembers.length; i++) {
      const { data, error } = await resend.emails.send({
        from: "no-reply@recognify.io",
        to: selectedTeamMembers[i].email!,
        subject: "📝 You Have a New Survey to Complete!",
        react: InviteSurvey({
          receiverFullName: selectedTeamMembers[i].name!,
          senderFullName: user.name!,
          surveyId: survey.id!,
        }),
        headers: {
          "X-Entity-Ref-ID": new Date().getTime() + "",
        },
      });
    }
  }

  return new Response("Survey has been created", {
    status: 201,
  });
};


export const DELETE = async (req, res) => {
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

  const { surveyId } = await req.json();

  await prisma.survey.delete({
    where: {
      id: surveyId,
    },
  });

  return new Response("Survey deleted", {
    status: 200,
  });
};
