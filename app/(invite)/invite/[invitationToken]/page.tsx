import { redirect, useSearchParams } from "next/navigation";
import { getInvitation } from "@/actions/get-invitation";

import { siteConfig } from "@/config/site";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Button } from "@/components/ui/button";
import JoinTeamBtn from "../../components/join-team-btn";

const InvitationLandingPage = async ({
  params: { invitationToken },
}: {
  params: { invitationToken: string };
}) => {
  
  if (!invitationToken) {
    redirect("/404");
  }

  const invitationData = await getInvitation(invitationToken!);



  return (
    <MaxWidthWrapper
      className="flex h-14 items-center justify-center py-4"
      large={false}
    >
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>
            <span className="font-urban text-4xl font-bold text-primary">
              {siteConfig.name}
            </span>{" "}
            &nbsp;
            <p className="mt-6">You are invited to join Recognify!</p>
          </CardTitle>
        </CardHeader>
        <div className="px-6 pb-6 pt-0">
          <p>
            Welcome to Recognify! You have been invited by{" "}
            <b>{invitationData.team.teamMembers[0].name}</b> to join their team.
            Click the button below to activate your account and start
            collaborating with your new team.
          </p>
        </div>
        <div className="flex flex-col pb-8 px-4">
          <JoinTeamBtn token={invitationToken} />
        </div>
      </Card>
    </MaxWidthWrapper>
  );
};

export default InvitationLandingPage;
