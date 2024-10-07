import React from "react";
import { getSurveyById } from "@/actions/get-surveys";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserRole } from "@prisma/client";

import { getUserById } from "@/lib/user";
import { DashboardHeader } from "@/components/dashboard/header";

import CompleteSurvey from "../components/complete-survey";

const StartSurvey = async ({ params }: { params: { surveyId: string } }) => {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  const user = await getUserById(kindeUser.id);
  const survey = (await getSurveyById(params.surveyId, kindeUser.id))!;

  return (
    <>
      <DashboardHeader
        heading={"Start your survey - " + survey.title!}
        text={survey.description}
      ></DashboardHeader>
      <div className="py-6">
        {user?.role === UserRole.USER && <CompleteSurvey survey={survey} />}
        {user?.role !== UserRole.USER && (
          <>You are not allowed to answer this survey</>
        )}
      </div>
    </>
  );
};

export default StartSurvey;
