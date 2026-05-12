"use client";

import type { PrimaryReason } from "@/src/features/contact/models";
import { QuestionSelectTemplate } from "@/src/features/contact/components/question-select-template";
import { useTranslations } from "next-intl";
import type { Control } from "react-hook-form";

type ContactFormStep1Props = {
  control: Control<{ primary_reason?: PrimaryReason }>;
  errorMessage?: string;
};

const reasonOptions: PrimaryReason[] = ["planning", "crisis", "art", "general"];

export function ContactFormStep1({
  control,
  errorMessage,
}: ContactFormStep1Props) {
  const t = useTranslations("contact.step1");
  const validationT = useTranslations("contact.validation");
  const options = reasonOptions.map((reason) => ({
    description: t(`options.${reason}.description`),
    value: reason,
  })) as [
    { description: string; value: PrimaryReason },
    { description: string; value: PrimaryReason },
    { description: string; value: PrimaryReason },
    { description: string; value: PrimaryReason },
  ];

  return (
    <div>
      <div className="mb-2 flex flex-col gap-1">
        <p className="text-sm font-medium text-muted-foreground">
          {t("phase")}
        </p>
      </div>
      <QuestionSelectTemplate
        control={control}
        errorMessage={errorMessage}
        name="primary_reason"
        options={options}
        question={{
          description: t("description"),
          requiredMessage: validationT("primaryReasonRequired"),
          title: t("title"),
        }}
      />
    </div>
  );
}
