import { getRecognitions } from "@/actions/get-recognitions";
import { getTeamSurveys } from "@/actions/get-team-surveys";
import { RecognitionWithReceiverAndSender } from "@/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { getCurrentUser } from "@/lib/session";
import { getUserById } from "@/lib/user";
import { constructMetadata } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

import FirstThingsToDo from "./components/first-things-to-do";
import NoRecognitionCard from "./components/no-recognition-card";
import NoSurveysCard from "./components/no-surveys";
import SurveysSummaryCard from "./components/surveys-summary-card";
import RecognitionSummaryCard from "./components/recognations-summary-card";

export const metadata = constructMetadata({
  title: "Dashboard - Recognify",
  description: "",
});

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  const user = await getUserById(kindeUser.id);
  const surveys = (await getTeamSurveys())?.slice(0, 3) || [];
  const recognations: RecognitionWithReceiverAndSender[] =
    (await getRecognitions(kindeUser.id))?.slice(0, 3) || [];

  return (
    <>
      <DashboardHeader
        heading="Dashboard"
        text={`Welcome back, here's what you've been up to.`}
      />
      <div className="flex grow flex-col gap-8 lg:flex-row">
        <NoSurveysCard role={user?.role} surveys={surveys} />
        <SurveysSummaryCard surveys={surveys!} role={user?.role!} />
        <FirstThingsToDo role={user?.role} />
      </div>
      <div className="my-6 flex flex-col">
        <NoRecognitionCard recognitions={recognations} />
        <RecognitionSummaryCard recognitions={recognations} />
      </div>
    </>
  );
}
