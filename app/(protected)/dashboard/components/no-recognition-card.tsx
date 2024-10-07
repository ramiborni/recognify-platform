import Link from "next/link";

import { Button } from "@/components/ui/button";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

const NoRecognitionCard = () => {
  return (
    <>
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="recognition" />
        <EmptyPlaceholder.Title>No Recognitions</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          Create your first recognition and appreciate your team.
        </EmptyPlaceholder.Description>
        <Link href="/dashboard/recognition/new">
          <Button>Create Recognition for your team</Button>
        </Link>
      </EmptyPlaceholder>
    </>
  );
};

export default NoRecognitionCard;
