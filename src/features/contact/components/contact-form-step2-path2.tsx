"use client";

import type { Control } from "react-hook-form";
import { useTranslations } from "next-intl";
import { QuestionSelectTemplate } from "@/src/features/contact/components/question-select-template";
import type { ContactFormData } from "@/src/features/contact/models";

type ContactFormStep2Path2Props = {
  control: Control<ContactFormData>;
  errorMessages?: {
    notification_date?: string;
    refusal_issue?: string;
    bridging_visa?: string;
  };
};

export function ContactFormStep2Path2({
  control,
  errorMessages = {},
}: ContactFormStep2Path2Props) {
  const t = useTranslations("contact.step2");
  const validationT = useTranslations("contact.validation");

  return (
    <div className="flex flex-col gap-8">
      <p className="text-sm font-medium text-muted-foreground">
        {t("crisis.phase")}
      </p>

      <QuestionSelectTemplate
        control={control}
        errorMessage={errorMessages.notification_date}
        name="notification_date"
        options={[
          { description: t("crisis.notification_date.options.within_7.description"), value: "within_7" },
          { description: t("crisis.notification_date.options.within_21.description"), value: "within_21" },
          { description: t("crisis.notification_date.options.over_21.description"), value: "over_21" },
          { description: t("crisis.notification_date.options.no_letter.description"), value: "no_letter" },
        ]}
        question={{
          title: t("crisis.notification_date.title"),
          requiredMessage: validationT("notificationDateRequired"),
        }}
      />

      <QuestionSelectTemplate
        control={control}
        errorMessage={errorMessages.refusal_issue}
        name="refusal_issue"
        options={[
          { description: t("crisis.refusal_issue.options.gte.description"), value: "gte" },
          { description: t("crisis.refusal_issue.options.financial.description"), value: "financial" },
          { description: t("crisis.refusal_issue.options.skills.description"), value: "skills" },
          { description: t("crisis.refusal_issue.options.health.description"), value: "health" },
          { description: t("crisis.refusal_issue.options.breach.description"), value: "breach" },
        ]}
        question={{
          title: t("crisis.refusal_issue.title"),
          requiredMessage: validationT("refusalIssueRequired"),
        }}
      />

      <QuestionSelectTemplate
        control={control}
        errorMessage={errorMessages.bridging_visa}
        name="bridging_visa"
        options={[
          { description: t("crisis.bridging_visa.options.bva_bvb_bvc.description"), value: "bva_bvb_bvc" },
          { description: t("crisis.bridging_visa.options.bve.description"), value: "bve" },
          { description: t("crisis.bridging_visa.options.substantive.description"), value: "substantive" },
          { description: t("crisis.bridging_visa.options.none.description"), value: "none" },
        ]}
        question={{
          title: t("crisis.bridging_visa.title"),
          requiredMessage: validationT("bridgingVisaRequired"),
        }}
      />
    </div>
  );
}
