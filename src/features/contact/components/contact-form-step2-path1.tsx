"use client";

import { useWatch } from "react-hook-form";
import type { Control } from "react-hook-form";
import { useTranslations } from "next-intl";
import { QuestionSelectTemplate } from "@/src/features/contact/components/question-select-template";
import type { ContactFormData } from "@/src/features/contact/models";

type ContactFormStep2Path1Props = {
  control: Control<ContactFormData>;
  errorMessages?: {
    location?: string;
    current_visa?: string;
    migration_stream?: string;
  };
};

export function ContactFormStep2Path1({
  control,
  errorMessages = {},
}: ContactFormStep2Path1Props) {
  const t = useTranslations("contact.step2");
  const validationT = useTranslations("contact.validation");

  const location = useWatch({ control, name: "location" });

  return (
    <div className="flex flex-col gap-8">
      <p className="text-sm font-medium text-muted-foreground">
        {t("planning.phase")}
      </p>

      <QuestionSelectTemplate
        control={control}
        errorMessage={errorMessages.location}
        name="location"
        options={[
          { description: t("planning.location.options.onshore.description"), value: "onshore" },
          { description: t("planning.location.options.offshore.description"), value: "offshore" },
        ]}
        question={{
          title: t("planning.location.title"),
          requiredMessage: validationT("locationRequired"),
        }}
      />

      {location === "onshore" && (
        <QuestionSelectTemplate
          control={control}
          errorMessage={errorMessages.current_visa}
          name="current_visa"
          options={[
            { description: t("planning.current_visa.options.student_500.description"), value: "student_500" },
            { description: t("planning.current_visa.options.graduate_485.description"), value: "graduate_485" },
            { description: t("planning.current_visa.options.work_482.description"), value: "work_482" },
            { description: t("planning.current_visa.options.visitor_600.description"), value: "visitor_600" },
            { description: t("planning.current_visa.options.other.description"), value: "other" },
          ]}
          question={{
            title: t("planning.current_visa.title"),
            requiredMessage: validationT("currentVisaRequired"),
          }}
        />
      )}

      <QuestionSelectTemplate
        control={control}
        errorMessage={errorMessages.migration_stream}
        name="migration_stream"
        options={[
          { description: t("planning.migration_stream.options.skilled.description"), value: "skilled" },
          { description: t("planning.migration_stream.options.employer.description"), value: "employer" },
          { description: t("planning.migration_stream.options.business.description"), value: "business" },
          { description: t("planning.migration_stream.options.family.description"), value: "family" },
        ]}
        question={{
          title: t("planning.migration_stream.title"),
          requiredMessage: validationT("migrationStreamRequired"),
        }}
      />
    </div>
  );
}
