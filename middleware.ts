import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userId = request.cookies.get("demo_user_id")?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  if (!userId && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (userId && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
