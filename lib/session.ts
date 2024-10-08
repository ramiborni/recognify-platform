import "server-only";

import { cache } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { prisma } from "./db";

export const getCurrentUser = cache(async () => {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  if (!kindeUser) {
    return undefined;
  }
  const user = prisma.user.findUnique({
    where: {
      id: kindeUser.id,
    },
    include: {
      team: true,
    },
  });
  if (!user) {
    return undefined;
  }
  return user;
});
