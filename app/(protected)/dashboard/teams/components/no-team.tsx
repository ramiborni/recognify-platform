import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

const NoTeam = () => {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name="team" />
      <EmptyPlaceholder.Title>No Team members</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        Invite your team by clicking in the button above and share recognition
        and surveys with your team.
      </EmptyPlaceholder.Description>
    </EmptyPlaceholder>
  );
};

export default NoTeam;
