import { prisma } from "@/lib/db"

export const getSurveys = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            team: {
                include: {
                    surveys: true,
                }
            }
        }
    }) ;

    return user?.team?.surveys;
}