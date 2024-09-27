import {
  InviteMagicLinkEmail,
  MagicLinkEmail,
} from "@/emails/magic-link-email";
import { User } from "@prisma/client";
import { EmailConfig } from "next-auth/providers/email";
import { Resend } from "resend";

import { env } from "@/env.mjs";
import { siteConfig } from "@/config/site";

import { prisma } from "./db";
import { getUserByEmail } from "./user";
import { getTeamLeader } from "@/actions/get-team-leader";

export const resend = new Resend(env.RESEND_API_KEY);

type GetUserByEmailData = {
  name: string | null;
  emailVerified: Date | null;
} | null;

export const sendVerificationRequest: EmailConfig["sendVerificationRequest"] =
  async ({ identifier, url, provider }) => {
    console.log(provider);
    let user: GetUserByEmailData | User = await getUserByEmail(identifier);

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: identifier,
        },
      });

      const team = await prisma.team.create({
        data: {
          teamMembers: {
            connect: {
              id: (user as User).id,
            },
          },
        },
      });
    } else {
      const user = await prisma.user.findUnique({
        where: { email: identifier },
      });

      if (!user?.teamId) {
        const team = await prisma.team.create({
          data: {
            teamMembers: {
              connect: {
                id: (user as User).id,
              },
            },
          },
        });

        await prisma.user.update({
          where: { email: identifier },
          data: {
            teamId: team.id,
            isTeamLeader: true,
          },
        });
      }
    }

    const userVerified = user?.emailVerified ? true : false;
    const authSubject = userVerified
      ? `Sign-in link for ${siteConfig.name}`
      : "Activate your account";

    try {
      if ((user as User).isTeamLeader && (user as User).teamId) {
        const { data, error } = await resend.emails.send({
          from: provider.from,
          to: identifier,
          subject: authSubject,
          react: MagicLinkEmail({
            firstName: (user?.name as string) || "",
            actionUrl: url,
            mailType: userVerified ? "login" : "register",
            siteName: siteConfig.name,
          }),
          // Set this to prevent Gmail from threading emails.
          // More info: https://resend.com/changelog/custom-email-headers
          headers: {
            "X-Entity-Ref-ID": new Date().getTime() + "",
          },
        });

        if (error || !data) {
          throw new Error(error?.message);
        }
      } else if(!(user as User).isTeamLeader && (user as User).teamId && !(user as User).emailVerified) {
        const teamLeader = await getTeamLeader((user as User).teamId!);

        const { data, error } = await resend.emails.send({
          from: provider.from,
          to: identifier,
          subject: authSubject,
          react: InviteMagicLinkEmail({
            firstName: (user?.name as string) || "",
            invitedBy: teamLeader?.name!,
            actionUrl: url,
            mailType: "join-team",
            siteName: siteConfig.name,
          }),
          // Set this to prevent Gmail from threading emails.
          // More info: https://resend.com/changelog/custom-email-headers
          headers: {
            "X-Entity-Ref-ID": new Date().getTime() + "",
          },
        });

        if (error || !data) {
          throw new Error(error?.message);
        }
      }

      // console.log(data)
    } catch (error) {
      console.error(error);
      throw new Error("Failed to send verification email.");
    }
  };

export const sendJoinRequest: EmailConfig["sendVerificationRequest"] = async ({
  identifier: email,
  url,
  provider,
}) => {
  const user: GetUserByEmailData | User = await getUserByEmail(email);

  if (!user) {
    throw new Error("User not found.");
  }

  const userVerified = user?.emailVerified ? true : false;
  const authSubject = "You have been invited to join a team";

  try {
    const { data, error } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to: email,
      subject: authSubject,
      react: InviteMagicLinkEmail({
        firstName: (user?.name as string) || "",
        actionUrl: "https://google.com",
        mailType: "join-team",
        siteName: siteConfig.name,
      }),
      // Set this to prevent Gmail from threading emails.
      // More info: https://resend.com/changelog/custom-email-headers
      headers: {
        "X-Entity-Ref-ID": new Date().getTime() + "",
      },
    });

    if (error || !data) {
      throw new Error(error?.message);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send verification email.");
  }
};
