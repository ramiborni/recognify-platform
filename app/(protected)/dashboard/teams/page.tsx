import React from "react";
import { redirect } from "next/navigation";
import { getUser } from "@/actions/api/users";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserRole } from "@prisma/client";

import { DashboardHeader } from "@/components/dashboard/header";

import AddTeamMemberButton from "./components/add-team-member-button";
import TeamList from "./components/team-list";

const TeamPage = async () => {
  const { getAccessTokenRaw } = getKindeServerSession();
  const token = await getAccessTokenRaw();
  const user = await getUser();

  if (user.role === UserRole.USER) {
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
      <div className="py-6">
        <TeamList />
      </div>
    </>
  );
};

export default TeamPage;
