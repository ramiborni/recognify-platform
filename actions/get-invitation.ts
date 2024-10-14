import { prisma } from "@/lib/db";

export const getInvitation = async (invitationToken: string) => {
  if (!invitationToken) {
    throw new Error("No invitation token provided");
  }

  const invitation = await prisma.teamInvitation.findUnique({
    where: { token: invitationToken },
    include: {
      team: {
        select: {
          teamMembers: {
            where: {
              role: "TEAM_LEADER",
            },
          },
        },
      },
    },
  });

  if (!invitation) {
    return ("Invitation not found");
  }

  return invitation;
};
