import { UserRole } from "@prisma/client";
import { string } from "prop-types";

import { prisma } from "@/lib/db";

export const getTeamMembers = async (userId: string) => {
  if (!userId) {
    throw new Error("invalid userId");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      Team: {
        include: {
          teamMembers: true,
          TeamInvitation: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }
  if (user.role !== UserRole.TEAM_LEADER) {
    throw new Error("You're not allowed to do this operation");
  }

  const teamMembers: {
    name: string;
    email: string;
    createdAt: Date;
    status: "Accepted" | "Pending";
    points: number;
  }[] = [];

  user.Team?.TeamInvitation.forEach((invitation) => {
    teamMembers.push({
      name: invitation.name,
      email: invitation.email,
      createdAt: invitation.createdAt,
      status: "Pending",
      points: 0, //TODO add points here
    });
  });

  user.Team?.teamMembers.forEach((member) => {
    teamMembers.push({
      name: member.name!,
      email: member.email!,
      createdAt: member.createdAt,
      status: "Accepted",
      points: 0, //TODO add points here
    });
  });

  const sortedTeamMembers = teamMembers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return sortedTeamMembers;
};
