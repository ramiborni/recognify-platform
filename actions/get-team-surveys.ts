"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getTeamSurveys() {
  const user = await getCurrentUser();
  if (!user || !user?.teamId) {
    return;
  }
  const surveys = await prisma.survey.findMany({
    where: {
      teamId: user?.teamId!,
      selectedTeamMembers: {
        some: {
          id: user.id
        }
      }
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return surveys;
}
