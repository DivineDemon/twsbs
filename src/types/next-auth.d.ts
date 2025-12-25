import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      level: string;
      profilePicture?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    level: string;
    profilePicture?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    level: string;
    profilePicture?: string | null;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: string;
    level: string;
    profilePicture?: string | null;
  }
}
