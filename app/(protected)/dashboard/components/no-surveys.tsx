import Link from "next/link";
import { getTeamSurveys } from "@/actions/get-team-surveys";

import { Button } from "@/components/ui/button";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import React from "react";

const NoSurveysCard = async () => {
  const surveys = await getTeamSurveys();

  if (surveys?.length! > 0) {
    return <></>;
  }

  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name="post" />
      <EmptyPlaceholder.Title>No Surveys</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        Create your first survey and get feedback from your team.
      </EmptyPlaceholder.Description>
      <Link href="/dashboard/survey/new">
        <Button>Create Survey</Button>
      </Link>
    </EmptyPlaceholder>
  );
};

export default NoSurveysCard;
