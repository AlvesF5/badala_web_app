import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
  exp: number;
}

export default async function middleware(req: NextRequest) {
  const isAuthenticated = () => {
    const tokenCookie = cookies().get('balada-user-token');
    if (!tokenCookie) {
      return false;
    }
    const token = tokenCookie.value; // Acessa a propriedade 'value' do objeto RequestCookie
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        // Token is expired
        cookies().delete('balada-user-token');
        return false;
      }
      return true;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return false;
    }
  };

  console.log("Está autenticado? " + isAuthenticated());
  console.log("Passou no middleware!");

  if (!isAuthenticated()) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

export const config = { matcher: ['/auth/:path*'] };