import { DashboardHeader } from "@/components/dashboard/header";

import AddTeamMemberButton from "./components/add-team-member-button";
import React from "react";
import { getUser } from "@/actions/api/users";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

const TeamPage = async () => {

  const {getAccessTokenRaw} = getKindeServerSession();
  const token = (await getAccessTokenRaw())
  const user = await getUser(token);

  if(user.role === UserRole.USER){
    redirect("/404");
  }

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
