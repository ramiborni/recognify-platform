import React from "react";
import { getSurveyById } from "@/actions/get-surveys";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserRole } from "@prisma/client";

import { getUserById } from "@/lib/user";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

import CompleteSurvey from "../components/complete-survey";

const StartSurvey = async ({ params }: { params: { surveyId: string } }) => {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  const user = await getUserById(kindeUser.id);
  const survey = (await getSurveyById(params.surveyId, kindeUser.id))!;

  const AccessMessage = ({ title, message }: { title: string; message: string }) => (
    <Card className="max-w-lg mx-auto mt-24">
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{message}</CardDescription>
        <Button className="mt-4 w-full">
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </CardContent>
    </Card>
  );

  if (
    survey.selectedTeamMembers &&
    !survey.selectedTeamMembers.some((member) => member.id === user?.id)
  ) {
    return (
      <>
        <AccessMessage 
          title="Limited Access" 
          message="We're sorry, but it looks like you don't have access to this survey. If you think this is a mistake, please contact your team administrator."
        />
      </>
    );
  }

  if (user?.role !== UserRole.USER) {
    return (
      <>
        <DashboardHeader
          heading="Survey Access"
          text="We couldn't load the survey for you."
        />
        <AccessMessage 
          title="User Role Restriction" 
          message="We're sorry, but your current user role doesn't allow you to answer this survey. If you need access, please reach out to your system administrator."
        />
      </>
    );
  }

  return (
    <>
      <DashboardHeader
        heading={`Survey: ${survey.title}`}
        text={survey.description}
      />
      <div className="py-6">
        <CompleteSurvey survey={survey} />
      </div>
    </>
  );
};

export default StartSurvey;