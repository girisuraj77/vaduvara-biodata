import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 1. Immediately redirect dashboard and pricing pages to home page
  if (path.startsWith("/dashboard") || path === "/pricing" || path.startsWith("/pricing/")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 2. Protect admin portal - only allow Role.ADMIN
  if (path.startsWith("/admin")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isAdmin = token?.role === "ADMIN";

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/pricing/:path*"],
};
