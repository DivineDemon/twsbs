import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 characters")
      .optional(),
    dateOfBirth: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
      message: "Invalid date of birth",
    }),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),

    // Location
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    townSuburb: z.string().min(1, "Town/Suburb is required"),
    metro: z.string().optional(),

    // Preferences
    preferredContact: z
      .array(z.string())
      .min(1, "Select at least one contact method"),
    wantsBible: z.boolean(),

    // Privacy & Terms
    acceptSmsPolicy: z
      .boolean()
      .default(false)
      .refine((val) => val === true, {
        message: "You must accept the SMS Messaging Policy to continue.",
      }),

    // Mentorship
    mentorEmail: z.email().optional().or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;
