import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/utils/AuthServer';

export default async function middleware(req: NextRequest) {
  console.log("Está autenticado? " + isAuthenticated());
  console.log("Passou no middleware!");

  if (!isAuthenticated()) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

export const config = { matcher: ['/auth/:path*'] };