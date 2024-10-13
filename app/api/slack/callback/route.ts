import * as querystring from "querystring";
import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@prisma/client";
import axios from "axios";

import { env } from "@/env.mjs";
import { prisma } from "@/lib/db";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const query = req.nextUrl.searchParams;
  const code = query.get("code");
  const userId = query.get("state");

  try {
    const response = await axios.post(
      "https://slack.com/api/oauth.v2.access",
      querystring.stringify({
        client_id: env.SLACK_CLIENT_ID,
        client_secret: env.SLACK_CLIENT_SECRET,
        code: code?.toString(),
        redirect_uri: env.SLACK_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const {
      access_token: accessToken,
      refresh_token,
      user_id,
      incoming_webhook,
    } = response.data;
    console.log(response.data);

    if (!accessToken) {
      return new Response("Error obtaining access token", {
        status: 500,
      });
    }

    const webhookUrl = incoming_webhook.url;
    if (!webhookUrl) {
      return new Response("Error obtaining webhook URL", {
        status: 500,
      });
    }
    // Store webhook URL

    try {
      const user = await prisma.user.findFirst({
        where: {
          id: userId!,
        },
      });
      if (!user) {
        return new Response("User not found", {
          status: 404,
        });
      }

      await prisma.user.update({
        where: {
          id: userId!,
        },
        data: {
          slackWebhook: webhookUrl,
        },
      });
      return NextResponse.redirect(
        env.NEXT_PUBLIC_APP_URL +
          "/dashboard/integrations?success=true&type=slack",
      );
    } catch (e) {
      console.error(e);
      return new Response("Failed to add notification method", {
        status: 500,
      });
    }
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
};
