import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextMiddleware } from 'next/server';

// This function can be marked `async` if using `await` inside
export const middleware: NextMiddleware = async (request: NextRequest) => {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = request.nextUrl;

  // If token exists and user tries to access sign-in, sign-up, or verify, redirect to home
  if (token && (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up') || pathname.startsWith('/verify'))) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // If token does not exist and user tries to access dashboard or verify routes, redirect to sign-in
  if (!token && (pathname.startsWith('/dashboard') || pathname.startsWith('/verify'))) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Allow the request to proceed if none of the above conditions match
  return NextResponse.next();
};

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/verify/:path*',
    '/dashboard/:path*',
  ],
};
