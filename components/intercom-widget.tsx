"use client";

import { useEffect } from "react";
import { User } from "@prisma/client";

interface IntercomWidgetProps {
  user?: User;
}
export default function IntercomWidget({ user }: IntercomWidgetProps) {
  useEffect(() => {
    if (user) {
      //@ts-ignore
      window.intercomSettings = {
        api_base: "https://api-iam.intercom.io",
        app_id: "jievhfpn",
        user_id: user.id, // IMPORTANT: Replace "user.id" with the variable you use to capture the user's ID
        name: user.name, // IMPORTANT: Replace "user.name" with the variable you use to capture the user's name
        email: user.email, // IMPORTANT: Replace "user.email" with the variable you use to capture the user's email address
        created_at: user.createdAt, // IMPORTANT: Replace "user.createdAt" with the variable you use to capture the user's sign-up date
      };
    } else {
      //@ts-ignore
      window.intercomSettings = {
        api_base: "https://api-iam.intercom.io",
        app_id: "jievhfpn",
      };
    }
    initIntercomWindow({
      appId: "jievhfpn",
      api_base: "https://api-iam.intercom.io",
    });
  }, [user]);
  return <></>;
}
