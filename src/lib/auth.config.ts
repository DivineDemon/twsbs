import type { NextAuthConfig } from "next-auth";

// Public routes accessible to guests (unauthenticated users)
const _PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/dashboard", // Guests can access dashboard with limitations
  "/profile", // Guests can view profile page (will show limited info)
];

// Protected routes that require authentication (currently none - using guest mode)
const PROTECTED_ROUTES: string[] = [];

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      // Check if route is protected
      const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
        pathname.startsWith(route),
      );

      // If accessing protected route without auth, redirect to login
      if (isProtectedRoute && !isLoggedIn) {
        return false;
      }

      // If logged in and accessing auth pages, redirect to dashboard
      if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // Allow all other routes (guest mode enabled)
      return true;
    },
    // biome-ignore lint/suspicious/noExplicitAny: NextAuth types are complex
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.level = user.level;
        token.profilePicture = user.profilePicture;
      }
      return token;
    },
    // biome-ignore lint/suspicious/noExplicitAny: NextAuth types are complex
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.level = token.level as string;
        session.user.profilePicture = token.profilePicture as string | null;
      }
      return session;
    },
  },
  providers: [], // Configured in auth.ts
} satisfies NextAuthConfig;
