
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export default async function middleware(req: NextRequest) {

  const isAuthenticated = () => {

    const token = cookies().get('balada-user-token');
 
    if (!token) {
      return false
    }

    return true;
  };

  console.log("Está autenticado? " + isAuthenticated())
  console.log("Passou no middleware!")

  if (!isAuthenticated()) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

export const config = {
  matcher: ['/auth/:path*']
}