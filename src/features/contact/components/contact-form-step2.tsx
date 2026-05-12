"use client";

import type { Control } from "react-hook-form";
import type { ContactFormData, PrimaryReason } from "@/src/features/contact/models";
import { ContactFormStep2Path1 } from "@/src/features/contact/components/contact-form-step2-path1";
import { ContactFormStep2Path2 } from "@/src/features/contact/components/contact-form-step2-path2";

type Step2ErrorMessages = {
  location?: string;
  current_visa?: string;
  migration_stream?: string;
  notification_date?: string;
  refusal_issue?: string;
  bridging_visa?: string;
};

type ContactFormStep2Props = {
  control: Control<ContactFormData>;
  primaryReason: Exclude<PrimaryReason, "general">;
  errorMessages?: Step2ErrorMessages;
};

export function ContactFormStep2({
  control,
  primaryReason,
  errorMessages = {},
}: ContactFormStep2Props) {
  if (primaryReason === "planning") {
    return (
      <ContactFormStep2Path1
        control={control}
        errorMessages={errorMessages}
      />
    );
  }

  return (
    <ContactFormStep2Path2
      control={control}
      errorMessages={errorMessages}
    />
  );
}
