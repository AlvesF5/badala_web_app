
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";


const protectedDirectory = "/private";

export default async function middleware(req: NextRequest) {

  const isAuthenticated = () => {

    const token = cookies().get('balada-user-token');
    console.log("token: " + cookies().get('balada-user-token')?.value);


    if (!token) {
      return false
    }

    return true;
  };

  console.log("Está autenticado? " + isAuthenticated())
  console.log("Passou no middleware!")

  if (!isAuthenticated() && req.nextUrl.pathname.startsWith(protectedDirectory)) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}