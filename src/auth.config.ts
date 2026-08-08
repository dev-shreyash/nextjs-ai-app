// src/auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtectedPage = nextUrl.pathname === '/withdraw' || nextUrl.pathname.startsWith('/dashboard');
      
      if (isProtectedPage) {
        if (isLoggedIn) return true;
        return false; // Automatically redirects to pages.signIn
      }
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;
