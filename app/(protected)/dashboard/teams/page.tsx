import { DashboardHeader } from "@/components/dashboard/header";

import AddTeamMemberButton from "./components/add-team-member-button";

const TeamPage = async () => {

  return (
    <>
      <DashboardHeader
        heading="Teams"
        text={`Manage your team and invite memebers to get started.`}
      >
        <AddTeamMemberButton />
      </DashboardHeader>
    </>
  );
};

export default TeamPage;
