"use server";

import { prisma } from "@/lib/db";

export async function checkPrivileges(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { Team: true },
  });

  if (!user) return null;

  if (user.isTeamLeader) {
    // User is a team leader
    return {
      canInviteMembers: true,
      canManageTeam: true,
      // Other privileges
    };
  } else {
    // User is a team member
    return {
      canInviteMembers: false,
      canManageTeam: false,
      // Other privileges
    };
  }
}
