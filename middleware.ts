import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";

export default withAuth(async function middleware(req) {
  // Create a new request header and set the custom 'x-url' header
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-url', req.url);

  // Return the response with updated headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
});

export const config = {
  unstable_allowDynamic: ["**/node_modules/@react-email*/**/*.mjs*"],
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
