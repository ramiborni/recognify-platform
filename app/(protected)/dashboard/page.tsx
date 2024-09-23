import { getTeamSurveys } from "@/actions/get-team-surveys";

import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

import FirstThingsToDo from "./components/first-things-to-do";
import NoSurveysCard from "./components/no-surveys";

export const metadata = constructMetadata({
  title: "Dashboard – SaaS Starter",
  description: "Create and manage content.",
});

export default async function DashboardPage() {
  return (
    <>
      <DashboardHeader
        heading="Dashboard"
        text={`Welcome back, here's what you've been up to.`}
      />
      <div className="flex flex-col gap-8 lg:flex-row">
        <NoSurveysCard />
        <FirstThingsToDo />
      </div>
    </>
  );
}
