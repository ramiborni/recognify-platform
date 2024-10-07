import { signIn } from "next-auth/react";

import { prisma } from "@/lib/db";

export const inviteTeamMember = async (
  userId: string,
  userEmail: string,
  userFullName: string,
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { team: true },
  });

  if (!user) {
    return null;
  }

  if (!user.isTeamLeader) {
    throw new Error(
      "We apologize, but you do not have the necessary permissions to invite team members.",
    );
  }

  if (!user.team) {
    throw new Error(
      "We apologize, but you do not have a team to invite members to.",
    );
  }

  const userExists = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (userExists) {
    throw new Error(
      "We apologize, but the user you are trying to invite is already a member of the team.",
    );
  }

  // Invite team member
  const invitedUser = await prisma.user.create({
    data: {
      email: userEmail,
      name: userFullName,
    },
  });

  const team = await prisma.team.update({
    where: { id: user.team?.id },
    data: {
      teamMembers: {
        connect: {
          id: invitedUser.id,
        },
      },
    },
  });
};
