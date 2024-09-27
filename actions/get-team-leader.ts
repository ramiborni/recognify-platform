import { prisma } from "@/lib/db";

export async function getTeamLeader(teamId: string) {
    const teamLeader = await prisma.user.findFirst({
        where: {
            teamId: teamId,
            isTeamLeader: true,
        },
    });

    return teamLeader;
}
