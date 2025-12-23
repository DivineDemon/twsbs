import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations/auth";
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
});
