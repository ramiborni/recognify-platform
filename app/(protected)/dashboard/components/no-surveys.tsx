import React from "react";
import Link from "next/link";
import { getTeamSurveys } from "@/actions/get-team-surveys";
import { Survey, UserRole } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

interface NoSurveysCardProps {
  hideCreateSurvey?: boolean;
  role?: UserRole;
  surveys: Survey[];
}

const NoSurveysCard = async ({
  hideCreateSurvey,
  role,
  surveys,
}: NoSurveysCardProps) => {
  if (surveys?.length! > 0) {
    return <></>;
  }

  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name="post" />
      <EmptyPlaceholder.Title>No Surveys</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        {role === UserRole.TEAM_LEADER && (
          <> your first survey and get feedbacks from your team.</>
        )}
        {role === UserRole.USER && (
          <> No surveys has been created by team leader.</>
        )}
      </EmptyPlaceholder.Description>
      {hideCreateSurvey ||
        (role === UserRole.TEAM_LEADER && (
          <Link href="/dashboard/surveys/">
            <Button>Create Survey</Button>
          </Link>
        ))}
    </EmptyPlaceholder>
  );
};

export default NoSurveysCard;

/*
  if (surveys?.length! > 0) {
    return <></>;
  }
    */
