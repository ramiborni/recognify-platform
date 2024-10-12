import Link from "next/link";
import { UserRole } from "@prisma/client";
import {
  ChevronRightIcon,
  List,
  PhoneCallIcon,
  SlackIcon,
  Text,
  UsersIcon,
} from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface FirstThingsToDoProps {
  role?: UserRole;
}

interface FirstThingsToDoListItem {
  icon: JSX.Element;
  title: string;
  description: string;
  href: string;
  role: UserRole[];
}

const FirstThingsToDo = ({ role }: FirstThingsToDoProps) => {
  const firstThingsToDoList: FirstThingsToDoListItem[] = [
    {
      icon: <UsersIcon className="size-6" />,
      title: "Invite your team",
      description: "Invite your team to send them recognations and feedbacks.",
      href: "/dashboard/team/",
      role: [UserRole.TEAM_LEADER],
    },
    {
      icon: <Text className="size-6" />,
      title: "Create a recognition",
      description:
        "Create a recognition and boost moral for your team.",
      href: "/dashboard/recognitions",
      role: [UserRole.TEAM_LEADER, UserRole.USER],
    },
    {
      icon: <List className="size-6" />,
      title: "Create a survey",
      description: "Create a survey and get feedback from your team.",
      href: "/dashboard/surveys",
      role: [UserRole.TEAM_LEADER, UserRole.USER],
    },
    {
      icon: <PhoneCallIcon className="size-6" />,
      title: "Schedule an onboarding call",
      description: "Schedule an onboarding call with our team to get started.",
      href: "https://cal.com/rami-borni/recognify-onboarding-30min",
      role: [UserRole.TEAM_LEADER],
    },
    {
      icon: <SlackIcon className="size-6" />,
      title: "Join our Slack community",
      description: "Join our Slack community to get support and updates.",
      href: "https://join.slack.com/",
      role: [UserRole.TEAM_LEADER],
    },
  ];

  return (
    <>
      <Card className="flex flex-col gap-y-2 rounded-lg border border-dashed p-8 shadow-sm animate-in fade-in-50">
        <CardTitle>
          <div className="flex flex-row items-center gap-x-2">
            <span>First Things To Do</span>
          </div>
        </CardTitle>
        <CardContent className="px-0">
          <p className="text-sm text-card-foreground">
            Here are a few things you can do to get started.
          </p>

          {role && (
            <div className="mb-0 mt-4 flex flex-col gap-y-4">
              {firstThingsToDoList.map(
                (item, index) =>
                  item.role.includes(role!) && (
                    <Link key={index} href={item.href}>
                      <div className="flex flex-row items-center gap-x-2 rounded-lg px-2 py-1 transition duration-300 ease-in-out hover:bg-primary/10">
                        <div className="flex size-8 shrink-0 items-center justify-center">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex-1"></div>
                        <div className="shrink-0">
                          <ChevronRightIcon className="size-4" />
                        </div>
                      </div>
                    </Link>
                  ),
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default FirstThingsToDo;
