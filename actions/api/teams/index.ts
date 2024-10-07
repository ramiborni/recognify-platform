import { Team, User } from "@prisma/client";
import axios from "axios";

import { env } from "@/env.mjs";

import { GetTeamMembersResponse } from "./types";

export const addTeamMember = async (
  userFullName: string,
  userEmail: string,
) => {
  const response = await axios.post('/api/teams/', {
    name: userFullName,
    email: userEmail,
  });

  return response.data;
};

export const getTeamMembers = async (): Promise<GetTeamMembersResponse> => {
  const response = await axios.get('/api/teams/');

  return response.data;
};
