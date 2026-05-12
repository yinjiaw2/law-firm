"use client";

import type { Control } from "react-hook-form";
import { useTranslations } from "next-intl";
import { QuestionSelectTemplate } from "@/src/features/contact/components/question-select-template";
import type { ContactFormData } from "@/src/features/contact/models";

type ContactFormStep3Props = {
  control: Control<ContactFormData>;
};

export function ContactFormStep3({ control }: ContactFormStep3Props) {
  const t = useTranslations("contact.step3");
  const validationT = useTranslations("contact.validation");

  return (
    <div className="flex flex-col gap-8">
      <p className="text-sm font-medium text-muted-foreground">
        {t("phase")}
      </p>

      <QuestionSelectTemplate
        control={control}
        name="age_group"
        options={[
          { description: t("age_group.options.18_24"), value: "18_24" },
          { description: t("age_group.options.25_32"), value: "25_32" },
          { description: t("age_group.options.33_39"), value: "33_39" },
          { description: t("age_group.options.40_44"), value: "40_44" },
          { description: t("age_group.options.45_plus"), value: "45_plus" },
        ]}
        question={{
          title: t("age_group.title"),
          requiredMessage: validationT("ageGroupRequired"),
        }}
      />

      <QuestionSelectTemplate
        control={control}
        name="education"
        options={[
          { description: t("education.options.doctorate"), value: "doctorate" },
          { description: t("education.options.masters_bachelors"), value: "masters_bachelors" },
          { description: t("education.options.diploma_trade"), value: "diploma_trade" },
          { description: t("education.options.secondary_below"), value: "secondary_below" },
        ]}
        question={{
          title: t("education.title"),
          requiredMessage: validationT("educationRequired"),
        }}
      />

      <QuestionSelectTemplate
        control={control}
        name="english_level"
        options={[
          { description: t("english_level.options.superior"), value: "superior" },
          { description: t("english_level.options.proficient"), value: "proficient" },
          { description: t("english_level.options.competent"), value: "competent" },
          { description: t("english_level.options.not_tested"), value: "not_tested" },
        ]}
        question={{
          title: t("english_level.title"),
          requiredMessage: validationT("englishLevelRequired"),
        }}
      />
    </div>
  );
}
