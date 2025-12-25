import { router } from "../trpc";
import { authRouter } from "./auth";
import { journeyRouter } from "./journey";
import { userRouter } from "./user";
import { usersRouter } from "./users";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  users: usersRouter,
  journey: journeyRouter,
  // More routers will be added as we build features
});

export type AppRouter = typeof appRouter;
