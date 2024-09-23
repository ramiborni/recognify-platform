"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getTeamSurveys() {
  const user = await getCurrentUser();
  if (!user || !user?.Team) {
    return;
  }
  const surveys = await prisma.survey.findMany({
    where: {
      teamId: user?.Team!.id,
    },
  });

  return surveys;
}
