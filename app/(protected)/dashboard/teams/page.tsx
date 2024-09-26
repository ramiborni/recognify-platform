import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";

const TeamPage = () => {
  const addTeamMember = () => {
    
  };
  return (
    <>
      <DashboardHeader
        heading="Teams"
        text={`Manage your team and invite memebers to get started.`}
      >
        <Button onClick={addTeamMember}>
          <PlusIcon className="size-6" /> &nbsp; Add team member
        </Button>
      </DashboardHeader>
    </>
  );
};

export default TeamPage;
