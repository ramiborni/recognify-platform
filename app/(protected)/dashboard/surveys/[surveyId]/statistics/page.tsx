import React from "react";
import { getSurveyById, getSurveyByIdWithAllResponses } from "@/actions/get-surveys";
import { getTeamMembers } from "@/actions/get-team-members";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Feedback, Survey, User, UserRole } from "@prisma/client";

import { getUserById } from "@/lib/user";
import { DashboardHeader } from "@/components/dashboard/header";

import SurveyResultsContent from "../../components/survey-results-content";
import { UserWithFeedbacks } from "@/types";

interface TeamLeaderSurveyResultsProps {
  params: { surveyId: string };
}



const TeamLeaderSurveyResults: React.FC<TeamLeaderSurveyResultsProps> = async ({
  params,
}) => {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  const user = await getUserById(kindeUser.id);
  const survey = (await getSurveyByIdWithAllResponses(
    params.surveyId,
  )) as Survey & { responses: Feedback[] };
  const allUsers =
    ((await getTeamMembers(
      kindeUser.id,
      true,
    )) as unknown as UserWithFeedbacks[]) || [];

  if (user?.role !== UserRole.TEAM_LEADER) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <>
      <DashboardHeader
        heading={`Survey Results - ${survey.title}`}
        text={survey.description}
      />
      <SurveyResultsContent survey={survey} allUsers={allUsers} />
    </>
  );
};

export default TeamLeaderSurveyResults;
