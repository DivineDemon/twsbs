import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { signOut } from "@/lib/auth";
import {
  updateAvatarSchema,
  updateModeSchema,
  updateProfileSchema,
} from "@/lib/validations/user";
import { adminProcedure, protectedProcedure, router } from "../trpc";

export const userRouter = router({
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
    .input(updateProfileSchema)
    .mutation(async ({ ctx, input }) => {
      // Convert dateOfBirth string to Date object if provided
      const data = {
        ...input,
        dateOfBirth: input.dateOfBirth
          ? new Date(input.dateOfBirth)
          : undefined,
      };

      const updatedUser = await ctx.prisma.user.update({
        where: { id: ctx.user.id },
        data,
      });

      return {
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
      };
    }),

  // Update avatar
  updateAvatar: protectedProcedure
    .input(updateAvatarSchema)
    .mutation(async ({ ctx, input }) => {
      const updatedUser = await ctx.prisma.user.update({
        where: { id: ctx.user.id },
        data: { profilePicture: input.profilePicture },
      });

      return {
        success: true,
        message: "Avatar updated successfully",
        profilePicture: updatedUser.profilePicture,
      };
    }),

  // Update user mode
  updateMode: protectedProcedure
    .input(updateModeSchema)
    .mutation(async ({ ctx, input }) => {
      const updatedUser = await ctx.prisma.user.update({
        where: { id: ctx.user.id },
        data: {
          defaultMode: input.defaultMode,
          defaultSubMode: input.defaultSubMode,
        },
      });

      return {
        success: true,
        message: "Mode updated successfully",
        mode: updatedUser.defaultMode,
        subMode: updatedUser.defaultSubMode,
      };
    }),

  // Delete account (user can delete own, admin can delete any)
  deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
    // Delete the user account
    await ctx.prisma.user.delete({
      where: { id: ctx.user.id },
    });

    // Sign out the user
    await signOut({ redirect: false });

    return {
      success: true,
      message: "Account deleted successfully",
    };
  }),

  // Admin: Delete any user account
  adminDeleteAccount: adminProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Prevent deleting own account through admin route
      if (input.userId === ctx.user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Use deleteAccount to delete your own account",
        });
      }

      // Delete the user account
      await ctx.prisma.user.delete({
        where: { id: input.userId },
      });

      return {
        success: true,
        message: "User account deleted successfully",
      };
    }),
});
