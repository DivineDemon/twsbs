import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .optional()
    .or(z.literal("")),
  dateOfBirth: z
    .string()
    .refine((val) => !Number.isNaN(Date.parse(val)), {
      message: "Invalid date of birth",
    })
    .optional(),
  locationCountry: z.string().min(1, "Country is required").optional(),
  locationState: z.string().min(1, "State is required").optional(),
  locationTownSuburb: z.string().min(1, "Town/Suburb is required").optional(),
  locationMetro: z.string().optional().or(z.literal("")),
  preferredContact: z.array(z.string()).optional(),
  wantsBible: z.boolean().optional(),
  profilePicture: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const updateAvatarSchema = z.object({
  profilePicture: z.string().url("Invalid profile picture URL"),
});

export type UpdateAvatarInput = z.infer<typeof updateAvatarSchema>;

export const updateModeSchema = z.object({
  defaultMode: z.enum([
    "movement",
    "new_believer",
    "evangelist",
    "neighborhoods",
    "crusade",
  ]),
  defaultSubMode: z
    .enum(["organizer", "volunteer", "church", "new_believer_event"])
    .nullable()
    .optional(),
});

export type UpdateModeInput = z.infer<typeof updateModeSchema>;
