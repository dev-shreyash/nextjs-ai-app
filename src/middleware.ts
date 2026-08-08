// src/middleware.ts
import { NextResponse } from 'next/server'
import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

// Initialize an isolated, database-free auth handler for the Edge layer
const { auth } = NextAuth(authConfig)

export default auth(async function middleware(request) {
  const token = request.auth
  const url = request.nextUrl

  const isAuthPage = url.pathname === '/sign-in' || 
                     url.pathname === '/sign-up' || 
                     url.pathname.startsWith('/verify');

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
})
 
export const config = {
  unstable_allowDynamic: [
    '/src/lib/dbConnector.ts', // Permits database modules to sit cleanly inside compilation traces
    '**/node_modules/mongoose/**'
  ],
  matcher: [
    '/sign-in',
    '/sign-up',
    '/',
    '/withdraw',
    '/dashboard/:path*',
    '/verify/:path*'
  ]
}
