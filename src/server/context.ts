import { auth } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function createContext() {
  const session = await auth();

  return {
    session,
    prisma,
    user: session?.user,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
