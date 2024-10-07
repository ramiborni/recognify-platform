import { User } from "@prisma/client";
import axios from "axios";

import { env } from "@/env.mjs";

export const addUser = async (inviteToken: string) => {
  const response = await axios.post("/api/users", {
    inviteToken: inviteToken,
  });

  return response.data;
};

export const getUser = async () => {
  const baseURL = env.NEXT_PUBLIC_APP_URL || ""; // Adjust the environment variable name based on your setup
  const response = await axios.get(`${baseURL}/api/users`);

  return response.data as User;
};
