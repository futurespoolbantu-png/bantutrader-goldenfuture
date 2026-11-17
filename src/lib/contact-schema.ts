import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255).transform((value) => value.toLowerCase()),
  profile: z.string().trim().min(1).max(100),
  message: z.string().trim().min(1).max(1000),
  website: z.string().max(0).default(""),
});
export const contactRequestSchema = z.object({
  name: z.unknown(), email: z.unknown(), profile: z.unknown(), message: z.unknown(), website: z.unknown().optional(),
});