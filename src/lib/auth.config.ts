import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      // If user is accessing dashboard but not logged in, return false (redirect to login)
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }
      // If user is logged in but accessing login/register page, redirect to dashboard
      else if (isLoggedIn) {
        if (nextUrl.pathname === "/login" || nextUrl.pathname === "/register") {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
      }
      return true;
    },
    // biome-ignore lint/suspicious/noExplicitAny: NextAuth types are complex
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.level = user.level;
      }
      return token;
    },
    // biome-ignore lint/suspicious/noExplicitAny: NextAuth types are complex
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.level = token.level as string;
      }
      return session;
    },
  },
  providers: [], // Configured in auth.ts
} satisfies NextAuthConfig;
