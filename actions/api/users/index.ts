import { User } from "@prisma/client";
import axios from "axios";

import { env } from "@/env.mjs";

export const addUser = async (token: string, inviteToken: string) => {
  const response = await axios.post(
    env.NEXT_PUBLIC_APP_URL + "/api/users",
    {
      inviteToken: inviteToken,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

export const getUser = async (token: string) => {
  const response = await axios.get(env.NEXT_PUBLIC_APP_URL + "/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data as User;
};
