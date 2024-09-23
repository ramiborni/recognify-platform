import { getTeamSurveys } from "@/actions/get-team-surveys";

import { Button } from "@/components/ui/button";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

const NoSurveysCard = async () => {
  const surveys = await getTeamSurveys();

  if (surveys?.length! > 0) {
    return <></>;
  }

  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name="post" />
      <EmptyPlaceholder.Title>No content created</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        You don&apos;t have any content yet. Start creating content.
      </EmptyPlaceholder.Description>
      <Button>Add Content</Button>
    </EmptyPlaceholder>
  );
};

export default NoSurveysCard;
