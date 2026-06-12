import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyURLs: Routes = {
  "/": true,
  "/create-account": true,
  "/login": true,
  "/sms": true,
  "/github/start": true,
  "/github/complete": true,
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const session = await getSession();
  const isPublicOnlyPage = publicOnlyURLs[path];

  if (!session.id) {
    if (!isPublicOnlyPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (isPublicOnlyPage) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|\\.well-known|favicon.ico).*)"],
};
