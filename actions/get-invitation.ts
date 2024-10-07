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
    throw new Error("Invitation not found");
  }

  return invitation;
};
