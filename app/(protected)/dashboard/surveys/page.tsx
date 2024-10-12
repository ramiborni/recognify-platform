import React from "react";
import { getSurveys } from "@/actions/get-surveys";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserRole } from "@prisma/client";

import { getUserById } from "@/lib/user";
import { DashboardHeader } from "@/components/dashboard/header";

import NoSurveysCard from "../components/no-surveys";
import AddNewSurvey from "./components/add-new-survey";
import SurveysGrid from "./components/surveys-grid";

const SurveysPage = async () => {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  const user = await getUserById(kindeUser.id);
  const surveys = (await getSurveys(kindeUser.id)) || [];

  return (
    <>
      <DashboardHeader
        heading="Surveys"
        text={`Collect your team's opinions to help us improve. Let’s hear what they think!`}
      >
        {user?.role === UserRole.TEAM_LEADER && <AddNewSurvey />}
      </DashboardHeader>
      <div className="py-6">
        <NoSurveysCard role={user?.role} surveys={surveys} hideCreateSurvey />
        <SurveysGrid userRole={user?.role!} surveys={surveys} />
      </div>
    </>
  );
};

export default SurveysPage;
