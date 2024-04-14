import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/auth") {
    const token = searchParams.get("token");
    const url = request.nextUrl.clone();

    url.searchParams.delete('token')
    url.pathname = "/courses";

    return NextResponse.redirect(url);
  }

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/courses";

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
