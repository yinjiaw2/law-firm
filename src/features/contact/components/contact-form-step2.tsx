"use client";

import type { Control } from "react-hook-form";
import type { ContactFormData } from "@/src/features/contact/models";
import { ContactFormStep2Path1 } from "@/src/features/contact/components/contact-form-step2-path1";
import { ContactFormStep2Path2 } from "@/src/features/contact/components/contact-form-step2-path2";

type ContactFormStep2Props = {
  control: Control<ContactFormData>;
  isHighUrgency: boolean;
};

export function ContactFormStep2({
  control,
  isHighUrgency,
}: ContactFormStep2Props) {
  if (isHighUrgency) {
    return <ContactFormStep2Path2 control={control} />;
  }

  return <ContactFormStep2Path1 control={control} />;
}
