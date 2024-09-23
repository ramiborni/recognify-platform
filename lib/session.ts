import "server-only";

import { cache } from "react";
import { auth } from "@/auth";

import { prisma } from "./db";

export const getCurrentUser = cache(async () => {
  const session = await auth();
  if (!session?.user) {
    return undefined;
  }
  const user = prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      Team: true,
    },
  });
  if (!user) {
    return undefined;
  }
  return user;
});
