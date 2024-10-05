import { prisma } from "@/lib/db";

export const getLeaderboard = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      team: {
        include: {
          teamMembers: true,
        },
      },
    },
  });

  const team = user?.team;

  const recognitions = await prisma.recognition.findMany({
    where: {
      teamId: team?.id,
    },
  });

  const usersWithPoints = team?.teamMembers
    .map((teamMember) => {
      let totalUserPoints = 0;
      recognitions.forEach((recognition) => {
        if (recognition.receiverId === teamMember?.id) {
          totalUserPoints += recognition.points;
        }
      });

      return {
        ...teamMember,
        points: totalUserPoints,
      };
    })
    .sort(
      (teamMember1, teamMember2) => teamMember2.points - teamMember1.points,
    );

  return usersWithPoints;
};
