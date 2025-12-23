import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      level: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    level: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    level: string;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: string;
    level: string;
  }
}
