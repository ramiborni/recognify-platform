import { prisma } from "@/lib/db";

export const getRecognitions = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      team: true,
    },
  });

  const recognitions = await prisma.recognition.findMany({
    where: {
      teamId: user?.teamId!,
    },
    include: {
      receiver: true,
      giver: true,
    },
    orderBy: {
      createdAt: "desc", // Sort by createdAt in descending order (newer to older)
    },
  });
  
  return recognitions.filter((recognition) => {
    if (!recognition.isPublic && recognition.receiverId === userId) {
      return recognition;
    } else if (recognition.isPublic) {
      return recognition;
    }
  });
};
