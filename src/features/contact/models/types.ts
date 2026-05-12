import type { z } from "zod";
import type {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  contactFormSchema,
} from "./schema";

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;

export type PrimaryReason = Step1Data["primary_reason"];
export type Location = NonNullable<Step2Data["location"]>;
