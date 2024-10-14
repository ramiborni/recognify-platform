import { UserRole } from "@prisma/client";

import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const continueRegistration = async (id: string, invitationToken: string) => {
  console.log(id, invitationToken);

  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  if (!kindeUser) {
    return undefined;
  }
  

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if(user){
    return;
  }

  const newUser = await prisma.user.create({
    data: {
      id: kindeUser.id,
      name: `${kindeUser.given_name ?? ""} ${kindeUser.family_name ?? ""}`.trim(),
      email: kindeUser.email,
      role: UserRole.USER
    },
  });


  let invitation;

  if (invitationToken) {
    invitation = await prisma.teamInvitation.findUnique({
      where: {
        token: invitationToken,
      },
      include: {
        team: true,
      },
    });
  }

  if (!invitation) {
    await prisma.user.update({
      where:{
        id: kindeUser.id!
      },
      data:{
        role: UserRole.TEAM_LEADER,
        isTeamLeader: true,
      }
    });
    await prisma.team.create({
      data: {
        name: "My Team",
        teamMembers: {
          connect: {
            id: kindeUser.id,
          },
        },
      },
    });
  } else {
    await prisma.team.update({
      where: {
        id: invitation.team.id,
      },
      data: {
        teamMembers: {
          connect: {
            id: kindeUser.id,
          },
        },
      },
    });
    await prisma.teamInvitation.delete({
      where: {
        token: invitationToken,
      },
    });
  }
};
