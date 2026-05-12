import { z } from "zod";

export const step1Schema = z.object({
  primary_reason: z.enum(["planning", "crisis", "art", "general"]),
});

export const step2Schema = z.object({
  location: z.enum(["onshore", "offshore"]).optional(),
  current_visa: z.string().optional(),
  migration_stream: z.string().optional(),
  notification_date: z.string().optional(),
  refusal_issue: z.string().optional(),
  bridging_visa: z.string().optional(),
});

export const step3Schema = z.object({
  age_group: z.string().min(1, "Required"),
  education: z.string().min(1, "Required"),
  english_level: z.string().min(1, "Required"),
});

export const step4Schema = z.object({
  timeline: z.string().min(1, "Required"),
  full_name: z.string().min(1, "Required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(1, "Required"),
});

export const contactFormSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
  ...step4Schema.shape,
});

export const stepSchemas = [step1Schema, step2Schema, step3Schema, step4Schema] as const;
