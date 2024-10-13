import * as querystring from "querystring";
import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@prisma/client";

import { env } from "@/env.mjs";
import { prisma } from "@/lib/db";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const userId = atob(req.nextUrl.searchParams.get("u")!.toString()!);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  if (!user?.isTeamLeader || user?.role !== UserRole.TEAM_LEADER) {
    return new Response("You have no right to do this operation", {
      status: 401,
    });
  }

  const authUrl = `https://slack.com/oauth/v2/authorize?scope=chat:write,chat:write.public,incoming-webhook&${querystring.stringify(
    {
      client_id: env.SLACK_CLIENT_ID,
      redirect_uri: env.SLACK_REDIRECT_URI,
      user_scope: "",
      state: userId,
    },
  )}`;

  return NextResponse.redirect(authUrl);
};
