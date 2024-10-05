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
  const response = await axios.get("/api/users");

  return response.data as User;
};
