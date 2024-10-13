import { prisma } from "@/lib/db";

export const getSurveys = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      team: {
        include: {
          surveys: {
            include: {
              selectedTeamMembers: true,
              responses: {
                where: {
                  userId: userId,
                },
              },
            },
          },
        },
      },
    },
  });

  return user?.team?.surveys;
};

export const getSurveyById = async (surveyId: string, userId: string) => {
  const survey = await prisma.survey.findUnique({
    where: {
      id: surveyId,
    },
    include: {
      responses: {
        where: {
          userId: userId,
        },
      },
      selectedTeamMembers: true
    },
  });

  return survey;
};


export const getSurveyByIdWithAllResponses = async (surveyId: string) => {
  const survey = await prisma.survey.findUnique({
    where: {
      id: surveyId,
    },
    include: {
      responses: true
    },
  });

  return survey;
};
