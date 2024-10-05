import { Team, User } from "@prisma/client";

export interface GetTeamMembersResponse {
  teamMembers: ({
    recognitionsReceived: {
      points: number;
    }[];
  } & User)[];
}
