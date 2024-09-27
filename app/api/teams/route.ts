import { inviteTeamMember } from "@/actions/invite-team-member";
import { auth } from "@/auth";

import { prisma } from "@/lib/db";

export const POST = auth(async (req) => {
  if (!req.auth) {
    return new Response("Not authenticated", { status: 401 });
  }

  const currentUser = req.auth.user;

  const { email, name } = await req.json();

  if (!email || !name) {
    return new Response("Please provide all required fields", { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: currentUser.id },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  try {
    await inviteTeamMember(currentUser?.id!, email, name);
  } catch (e) {
    return new Response(e.message, { status: 500 });
  }

  return new Response("Team member has been added", { status: 201 });
});
