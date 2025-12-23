import { router } from "../trpc";
import { authRouter } from "./auth";
import { usersRouter } from "./users";

export const appRouter = router({
  auth: authRouter,
  users: usersRouter,
  // More routers will be added as we build features
});

export type AppRouter = typeof appRouter;
