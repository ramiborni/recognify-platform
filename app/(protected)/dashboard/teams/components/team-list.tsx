import React from "react";
import { getTeamMembers } from "@/actions/get-team-members";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { AwardIcon, BadgeIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import NoTeam from "./no-team";

dayjs.extend(utc);
dayjs.extend(timezone);

const TeamList = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const teamMembers = await getTeamMembers(user.id, false);

  const userTimeZone = dayjs.tz.guess();

  if (!teamMembers || teamMembers.length <= 0) {
    return <NoTeam />;
  }

  return (
    <Card className="my-2 rounded-xl border border-dashed text-center shadow-sm animate-in fade-in-50">
      <Table>
        <TableHeader className="rounded-xl">
          <TableRow className="rounded-xl">
            <TableHead>Full name</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-left">Added Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamMembers.map((member) => (
            <TableRow key={member.email}>
              <TableCell className="text-left font-medium">
                {member.name}
              </TableCell>
              <TableCell className="text-left">{member.email}</TableCell>
              <TableCell className="text-left">
                <div className="flex flex-row items-center text-lg font-bold text-primary">
                  <AwardIcon className="size-6 px-0 text-primary" />
                  {member.points}
                </div>
              </TableCell>
              <TableCell className="text-left">
                {member.status === "Pending" ? (
                  <Badge className="bg-[#ffad01] hover:bg-[#ffad01]">
                    {member.status}
                  </Badge>
                ) : (
                  <Badge>{member.status}</Badge>
                )}
              </TableCell>
              <TableCell className="text-left">
                {dayjs(member.createdAt)
                  .tz(userTimeZone)
                  .format("MMMM D, YYYY h:mm A")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default TeamList;
