import Link from "next/link";
import { RecognitionWithReceiverAndSender } from "@/types";

import { Button } from "@/components/ui/button";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

interface NoRecognitionCardProps {
  recognitions: RecognitionWithReceiverAndSender[];
}

const NoRecognitionCard = ({ recognitions }: NoRecognitionCardProps) => {
  if (recognitions.length > 0) {
    return <></>;
  }
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
