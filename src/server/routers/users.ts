import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const usersRouter = router({
  // Get current user profile
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.user.id },
      include: {
        stats: true,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    return user;
  }),

  // Update user profile
  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).optional(),
        phone: z.string().optional(),
        dateOfBirth: z.date().optional(),
        locationCountry: z.string().length(2).optional(),
        locationState: z.string().optional(),
        locationTownSuburb: z.string().optional(),
        locationMetro: z.string().optional(),
        preferredContact: z
          .array(z.enum(["email", "sms", "whatsapp"]))
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedUser = await ctx.prisma.user.update({
        where: { id: ctx.user.id },
        data: input,
      });

      return updatedUser;
    }),

  // Upload profile picture
  uploadProfilePicture: protectedProcedure
    .input(
      z.object({
        imageUrl: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedUser = await ctx.prisma.user.update({
        where: { id: ctx.user.id },
        data: { profilePicture: input.imageUrl },
      });

      return updatedUser;
    }),

  // Get user by ID (for network viewing)
  getById: protectedProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.userId },
        include: {
          stats: true,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return user;
    }),
});
