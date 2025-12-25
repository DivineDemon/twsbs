import crypto from "node:crypto";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { sendPasswordResetEmail } from "@/lib/integrations/nodemailer";
import { prisma } from "@/lib/prisma";
import {
  forgotPasswordSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/lib/validations/auth";
import { publicProcedure, router } from "../trpc";

export const authRouter = router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      const { email, password, firstName, lastName, mentorEmail, ...rest } =
        input;

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User with this email already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Handle Mentor Logic (simplified for now)
      let uplineId: string | null = null;
      let mentorEmailNotFound: string | null = null;

      if (mentorEmail) {
        const mentor = await prisma.user.findUnique({
          where: { email: mentorEmail },
        });

        if (mentor) {
          uplineId = mentor.id;
        } else {
          mentorEmailNotFound = mentorEmail;
        }
      }

      // Create User
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: `${firstName} ${lastName}`,
          dateOfBirth: new Date(rest.dateOfBirth),
          phone: rest.phone,
          locationCountry: rest.country,
          locationState: rest.state,
          locationTownSuburb: rest.townSuburb,
          locationMetro: rest.metro,
          preferredContact: rest.preferredContact,
          wantsBible: rest.wantsBible,
          uplineId,
          mentorEmailNotFound,
          // Defaults: role=User, level=Sharer (from Schema)
        },
      });

      return {
        status: 201,
        message: "Account created successfully",
        userId: user.id,
      };
    }),

  forgotPassword: publicProcedure
    .input(forgotPasswordSchema)
    .mutation(async ({ input }) => {
      const { email } = input;

      // Check if user exists (but don't reveal this to the client)
      const user = await prisma.user.findUnique({
        where: { email },
      });

      // Always return success to prevent email enumeration
      if (!user) {
        return {
          success: true,
          message: "If an account exists, a password reset email has been sent",
        };
      }

      // Generate secure random token
      const resetToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = await bcrypt.hash(resetToken, 10);

      // Set expiration to 15 minutes from now
      const expires = new Date(Date.now() + 15 * 60 * 1000);

      // Delete any existing tokens for this user
      await prisma.verificationToken.deleteMany({
        where: { identifier: email },
      });

      // Store hashed token
      await prisma.verificationToken.create({
        data: {
          identifier: email,
          token: hashedToken,
          expires,
        },
      });

      // Send email with reset link
      const resetUrl = `${
        process.env.NEXTAUTH_URL
      }/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

      try {
        await sendPasswordResetEmail(email, resetUrl);
      } catch (error) {
        console.error("Failed to send password reset email:", error);
        // Don't throw error to prevent email enumeration
      }

      return {
        success: true,
        message: "If an account exists, a password reset email has been sent",
      };
    }),

  verifyResetToken: publicProcedure
    .input(forgotPasswordSchema)
    .query(async ({ input }) => {
      const { email } = input;

      const tokens = await prisma.verificationToken.findMany({
        where: {
          identifier: email,
          expires: { gt: new Date() },
        },
      });

      return {
        valid: tokens.length > 0,
      };
    }),

  resetPassword: publicProcedure
    .input(resetPasswordSchema)
    .mutation(async ({ input }) => {
      const { token, password } = input;

      // Extract email from token (we'll pass it separately in the actual implementation)
      // For now, we need to find the token by checking all non-expired tokens
      const tokens = await prisma.verificationToken.findMany({
        where: {
          expires: { gt: new Date() },
        },
      });

      let validToken = null;
      let userEmail = null;

      // Check each token to find a match
      for (const dbToken of tokens) {
        const isValid = await bcrypt.compare(token, dbToken.token);
        if (isValid) {
          validToken = dbToken;
          userEmail = dbToken.identifier;
          break;
        }
      }

      if (!validToken || !userEmail) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid or expired reset token",
        });
      }

      // Find user
      const user = await prisma.user.findUnique({
        where: { email: userEmail },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Update password
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      // Delete used token
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: userEmail,
            token: validToken.token,
          },
        },
      });

      return {
        success: true,
        message: "Password reset successfully",
      };
    }),
});
