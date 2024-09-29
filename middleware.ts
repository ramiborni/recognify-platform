import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default function middleware(req) {
  return withAuth(req);
}

export const config = {
  unstable_allowDynamic: ["**/node_modules/@react-email*/**/*.mjs*"],
  matcher: ["/admin/:path*", "/dashboard/:path*"]
};