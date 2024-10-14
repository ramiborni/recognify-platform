import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

import { prisma } from "@/lib/db";

interface User {
  email: string;
  first_name: string;
  id: string;
  is_password_reset_requested: boolean;
  is_suspended: boolean;
  last_name: string | null;
  organizations: Organization[];
  phone: string | null;
  username: string | null;
}

interface Organization {
  code: string;
  permissions: any; // You can replace `any` with a more specific type if you know the structure of `permissions`
  roles: any; // You can replace `any` with a more specific type if you know the structure of `roles`
}

interface UserWrapper {
  user: User;
}

// The Kinde issuer URL should already be in your `.env` file
// from when you initially set up Kinde. This will fetch your
// public JSON web keys file
const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

/*

export async function POST(req: NextRequest) {
  try {
    // Get the token from the request
    const token = await req.text();

    console.log(req.nextUrl.href);

    // Decode the token
    const { header } = jwt.decode(token, { complete: true })!;
    const { kid } = header;

    // Verify the token
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const event = (await jwt.verify(token, signingKey)) as JwtPayload;
    console.log(event);

    const userKinde: UserWrapper = event.data;

    // Handle various events
    switch (event?.type) {
      case "user.updated":
        // handle user updated event
        // e.g update database with event.data
        await prisma.user.update({
          where: {
            id: userKinde.user.id,
          },
          data: {
            name: `${userKinde.user.first_name ?? ""} ${userKinde.user.last_name ?? ""}`.trim(),
            email: userKinde.user.email,
          },
        });
        break;
      case "user.created":
        // handle user created event
        // e.g add user to database with event.data
        console.log(event.data);

        await prisma.user.create({
          data: {
            id: userKinde.user.id,
            name: `${userKinde.user.first_name ?? ""} ${userKinde.user.last_name ?? ""}`.trim(),
            email: userKinde.user.email,
          },
        });

        break;
      default:
        // other events that we don't handle
        break;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
  return NextResponse.json({ status: 200, statusText: "success" });
}


*/
