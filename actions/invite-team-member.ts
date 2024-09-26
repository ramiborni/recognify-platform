import { prisma } from "@/lib/db"
import { sendJoinRequest } from "@/lib/email";
import { signIn } from "next-auth/react";

export const inviteTeamMember = async (userId: string, userEmail: string, userFullName: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { Team: true },
    });

    if(!user){
        return null;
    }

    if(!user.isTeamLeader){
        throw new Error("We apologize, but you do not have the necessary permissions to invite team members.");
    }

    if(!user.Team){
        throw new Error("We apologize, but you do not have a team to invite members to.");
    }

    // Invite team member
    const invitedUser = await prisma.user.create({
        data: {
            email: userEmail,
            name: userFullName,
        },
    });

    const team = await prisma.team.update({
        where: { id: user.Team?.id },
        data: {
            teamMembers: {
                connect: {
                    id: invitedUser.id,
                },
            },
        },
    });


    const signInResult = await signIn("resend-invite", {
        email: userEmail,
        redirect: false,
        callbackUrl: "/dashboard/invited-user",
    });

    if(signInResult?.error){
        throw new Error("We apologize, but we were unable to invite the team member.");
    }
  
}