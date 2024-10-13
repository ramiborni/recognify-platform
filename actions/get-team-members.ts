import { UserRole } from "@prisma/client";
import { string } from "prop-types";

import { prisma } from "@/lib/db";

export const getTeamMembers = async (userId: string, allData: boolean) => {
  if (!userId) {
    throw new Error("invalid userId");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      team: {
        include: {
          teamMembers: {
            include: {
              recognitionsReceived: true,
            },
            where: {
              NOT: {
                id: userId,
              },
            },
          },
          TeamInvitation: true,
          surveys: {
            include: {
              responses: true,
            },
          },
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

  if (allData) {
    return user.team?.teamMembers;
  }

  const teamMembers: {
    name: string;
    email: string;
    createdAt: Date;
    status: "Accepted" | "Pending";
    points: number;
  }[] = [];

  user.team?.TeamInvitation.forEach((invitation) => {
    teamMembers.push({
      name: invitation.name,
      email: invitation.email,
      createdAt: invitation.createdAt,
      status: "Pending",
      points: 0, 
    });
  });

  user.team?.teamMembers.forEach((member) => {
    const totalPoints = member.recognitionsReceived.reduce((acc, recognition) => acc + recognition.points, 0);

    teamMembers.push({
      name: member.name!,
      email: member.email!,
      createdAt: member.createdAt,
      status: "Accepted",
      points: totalPoints,
    });
  });

  const sortedTeamMembers = teamMembers.sort((a, b) => {
    // Sort by createdAt (most recent first)
    const dateDiff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    
    // Sort by status, prioritize "Accepted"
    const statusDiff = a.status === "Accepted" && b.status !== "Accepted" ? -1 : b.status === "Accepted" && a.status !== "Accepted" ? 1 : 0;
  
    // Sort by points (highest first)
    const pointsDiff = b.points - a.points;
  
    // Apply sorting rules in order: date, status, then points
    return statusDiff || dateDiff || pointsDiff;
  });

  return sortedTeamMembers;
};
