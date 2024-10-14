import { FeedbackSubmitted } from "@/emails/feedback-submitted";
import { InviteSurvey } from "@/emails/invite-survey";
import { jwtValidationResponse, validateToken } from "@kinde/jwt-validator";
import { Survey, SurveyStatus, UserRole } from "@prisma/client";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { jwtDecode } from "jwt-decode";

import { prisma } from "@/lib/db";
import { resend } from "@/lib/email";

export const POST = async (req, res) => {
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

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  if (user.role !== UserRole.USER) {
    return new Response("You have no right to do this operation", {
      status: 401,
    });
  }

  const {
    surveyId,
    surveyResponses,
  }: { surveyId: string; surveyResponses: Record<string, string> } =
    await req.json();

  if (!surveyId || surveyId === "") {
    return new Response("Missing or invalid 'surveyId'", { status: 400 });
  }

  if (!surveyResponses) {
    return new Response("Missing or invalid 'questions'", { status: 400 });
  }

  const survey = await prisma.survey.findUnique({
    where: {
      id: surveyId,
    },
  });

  if (!survey) {
    return new Response("Can't find survey", {
      status: 404,
    });
  }

  const feedback = await prisma.feedback.create({
    data: {
      surveyId: surveyId,
      userId: userId,
      responses: Object.entries(surveyResponses).map(
        ([questionId, userResponse]) => ({
          questionId,
          userResponse,
        }),
      ),
    },
  });

  const updatedSurvey = await prisma.survey.findUnique({
    where: {
      id: surveyId,
    },
    include: {
      responses: true,
      selectedTeamMembers: true,
    },
  });

  if (
    updatedSurvey?.selectedTeamMembers.length ===
    updatedSurvey?.responses.length
  ) {
    await prisma.survey.update({
      where: {
        id: surveyId,
      },
      data: {
        status: SurveyStatus.COMPLETED,
      },
    });
  }

  const teamLeader = (await prisma.user.findFirst({
    where: {
      teamId: survey.teamId,
      isTeamLeader: true,
      role: UserRole.TEAM_LEADER,
    },
  }))!;

  const { data, error } = await resend.emails.send({
    from: "no-reply@recognify.io",
    to: teamLeader!.email!,
    subject: "📝 You Have a New Survey to Complete!",
    react: FeedbackSubmitted({
      surveyCreatorName: teamLeader.name!,
      respondentName: user.name!,
      surveyName: survey.title,
      surveyId: survey.id,
    }),
    headers: {
      "X-Entity-Ref-ID": new Date().getTime() + "",
    },
  });

  return new Response("Feedback has been submited", {
    status: 201,
  });
};
