import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const adminAuth = req.cookies.get("admin-auth")?.value;
  const role = req.cookies.get("role")?.value;
  const path = req.nextUrl.pathname;

  // Admin routes — admin-auth cookie check karo
  if (path.startsWith("/admin")) {
    if (adminAuth !== "true" || role !== "Admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // User dashboard + proposal center — koi bhi logged in user
  if (path.startsWith("/dashboard") || path.startsWith("/proposal-center")) {
    if (!role && adminAuth !== "true") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/proposal-center/:path*",
  ],
};