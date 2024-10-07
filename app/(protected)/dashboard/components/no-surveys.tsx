import React from "react";
import Link from "next/link";
import { getTeamSurveys } from "@/actions/get-team-surveys";

import { Button } from "@/components/ui/button";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

interface NoSurveysCardProps {
  hideCreateSurvey?: boolean;
}

const NoSurveysCard = async ({ hideCreateSurvey }: NoSurveysCardProps) => {
  const surveys = await getTeamSurveys();

  if (surveys?.length! > 0) {
    return <></>;
  }

  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name="post" />
      <EmptyPlaceholder.Title>No Surveys</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        Create your first survey and get feedbacks from your team.
      </EmptyPlaceholder.Description>
      {!hideCreateSurvey && (
        <Link href="/dashboard/survey/">
          <Button>Create Survey</Button>
        </Link>
      )}
    </EmptyPlaceholder>
  );
};

export default NoSurveysCard;
