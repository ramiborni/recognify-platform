import Link from "next/link";
import { Survey, SurveyStatus, UserRole } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

interface SurveysSummaryCardProps {
  surveys: Survey[];
  role: UserRole;
}

export default function SurveysSummaryCard({
  surveys,
  role,
}: SurveysSummaryCardProps) {
  if (surveys.length === 0) {
    return <></>;
  }

  const getStatusColor = (status: Survey["status"]) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-200 text-yellow-800 hover:bg-yellow-300";
      case "ACTIVE":
        return "bg-green-200 text-green-800 hover:bg-green-300";
      case "COMPLETED":
        return "bg-blue-200 text-blue-800 hover:bg-blue-300";
      default:
        return "bg-gray-200 text-gray-800 hover:bg-gray-300";
    }
  };

  const surveyUserLink = (id: string) => "/dashboard/surveys/" + id + "/";
  const surveyTeamLeaderLink = (id: string) =>
    "/dashboard/surveys/" + id + "/" + "/statistics/";

  return (
    <Card className="flex size-full flex-col border border-dashed">
      <CardTitle className="px-6 pb-6 pt-8">Pending Surveys</CardTitle>
      <CardContent className="grow px-6 pb-4">
        <div className="flex flex-col justify-start gap-y-4">
          {surveys
            .filter((s) => s.status !== SurveyStatus.COMPLETED)
            .map((survey, index) => (
              <Link
                key={index}
                href={
                  role === UserRole.TEAM_LEADER
                    ? surveyTeamLeaderLink(survey.id)
                    : surveyUserLink(survey.id)
                }
              >
                <div className="flex flex-row items-center gap-x-4 rounded-lg px-2 py-1 transition duration-300 ease-in-out hover:bg-primary/10">
                  <div className="flex flex-col gap-y-1">
                    <div className="flex flex-row gap-x-2">
                      <h3 className="text-sm font-semibold">{survey.title}</h3>
                      <Badge className={getStatusColor(survey.status)}>
                        {survey.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500">
                      {survey.description}
                    </p>
                  </div>
                  <div className="flex-1"></div>
                  <div className="shrink-0">
                    <ChevronRightIcon className="size-4" />
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto px-6 pb-6">
        {role !== UserRole.TEAM_LEADER && (
          <Link href="/dashboard/surveys/" className="w-full">
            <Button className="w-full">Create Survey</Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
