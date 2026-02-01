// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = getSessionCookie(request);

  // 1) PUBLIC: login page + Better Auth endpoints
  const isPublic =
    pathname === "/login" ||
    pathname.startsWith("/api/admin/auth") || //basepath untuk auth admin
    pathname.startsWith("/api/display/"); 

  if (isPublic) return NextResponse.next();

  // 2) PROTECTED ADMIN API: /api/admin/* (kecuali /api/admin/auth/*)
  const isAdminApi =
    pathname.startsWith("/api/admin/") && !pathname.startsWith("/api/admin/auth");

  if (isAdminApi && !sessionToken) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  // 3) PROTECTED ADMIN PAGES: /admin/*
  const isAdminPage = pathname.startsWith("/admin");
  if (isAdminPage && !sessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};