import React from "react";
import { IntegrationLdg } from "@/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { env } from "@/env.mjs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard/header";
import { Icons } from "@/components/shared/icons";

const IntegrationsPage = async () => {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  const integrations: IntegrationLdg[] = [
    {
      title: "Slack",
      description:
        "Instantly share recognitions in your team's Slack channels, fostering a culture of appreciation in real-time.",
      link: `${env.NEXT_PUBLIC_APP_URL}/api/slack/?u=${btoa(kindeUser.id)}`,
      icon: "slack",
    },
    {
      title: "Microsoft Teams",
      soon: true,
      description:
        "Integrate seamlessly with Microsoft Teams to celebrate achievements and boost team morale directly in your workspace.",
      link: "/",
      icon: "microsoftTeams",
    },
    {
      title: "Google Workspace",
      soon: true,
      description:
        "Enhance collaboration by connecting Recognify with Google Workspace, making recognition a part of your daily workflow.",
      link: "/",
      icon: "googleWorkspace",
    },
    {
      title: "Trello",
      soon: true,
      description:
        "Automatically trigger recognitions when team members complete tasks or move cards, reinforcing productivity with positive feedback.",
      link: "/",
      icon: "trello",
    },
    {
      title: "Jira",
      soon: true,
      description:
        "Seamlessly integrate recognition into your development process, acknowledging team efforts as you track and manage projects.",
      link: "/",
      icon: "jira",
    },
    {
      title: "Asana",
      soon: true,
      description:
        "Combine task management with team recognition, creating a more motivating and productive work environment within Asana.",
      link: "/",
      icon: "asana",
    },
  ];

  const availableIntegrations = integrations.filter(
    (integration) => !integration.soon,
  );
  const comingSoonIntegrations = integrations.filter(
    (integration) => integration.soon,
  );

  const IntegrationCard = ({
    integration,
  }: {
    integration: IntegrationLdg;
  }) => {
    const Icon = Icons[integration.icon];
    return (
      <Card className="flex flex-col justify-between">
        <div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">
              {integration.title}
            </CardTitle>
            {Icon && <Icon className="h-8 w-8 text-primary" />}
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm">
              {integration.description}
            </CardDescription>
          </CardContent>
        </div>
        <CardContent className="pt-4">
          {!integration.soon ? (
            <Button size="sm" className="w-full">
              <a href={integration.link} className="w-full">
                Connect
              </a>
            </Button>
          ) : (
            <></>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <DashboardHeader
        heading="Integrations"
        text="Connect Recognify with various platforms and tools to stay connected with your team"
      />
      <div className="space-y-8">
        <div>
          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            Available Integrations
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableIntegrations.map((integration) => (
              <IntegrationCard
                key={integration.title}
                integration={integration}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            Coming Soon
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {comingSoonIntegrations.map((integration) => (
              <IntegrationCard
                key={integration.title}
                integration={integration}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default IntegrationsPage;
