"use client";

import { Input } from "@/components/ui/input";
import { QuestionSelectTemplate } from "@/src/features/contact/components/question-select-template";
import type { ContactFormData } from "@/src/features/contact/models";
import { useTranslations } from "next-intl";
import { Controller, type Control } from "react-hook-form";

type ContactFormStep4Props = {
  control: Control<ContactFormData>;
};

type LeadFieldProps = {
  autoComplete?: string;
  control: Control<ContactFormData>;
  label: string;
  name: "full_name" | "email" | "phone";
  placeholder?: string;
  rules:
    | {
        required: string;
      }
    | {
        pattern: {
          message: string;
          value: RegExp;
        };
        required: string;
      };
  type?: string;
};

function LeadField({
  autoComplete,
  control,
  label,
  name,
  placeholder,
  rules,
  type = "text",
}: LeadFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground" htmlFor={name}>
            {label}
          </label>
          <Input
            {...field}
            aria-invalid={fieldState.invalid}
            autoComplete={autoComplete}
            id={name}
            placeholder={placeholder}
            type={type}
            value={field.value ?? ""}
          />
          {fieldState.error?.message ? (
            <p className="text-sm text-destructive">{fieldState.error.message}</p>
          ) : null}
        </div>
      )}
    />
  );
}

export function ContactFormStep4({ control }: ContactFormStep4Props) {
  const t = useTranslations("contact.step4");
  const validationT = useTranslations("contact.validation");

  return (
    <div className="flex flex-col gap-8">
      <p className="text-sm font-medium text-muted-foreground">{t("phase")}</p>

      <QuestionSelectTemplate
        control={control}
        name="timeline"
        options={[
          { description: t("timeline.options.immediately"), value: "immediately" },
          { description: t("timeline.options.within_3_months"), value: "within_3_months" },
          { description: t("timeline.options.six_months_or_longer"), value: "six_months_or_longer" },
        ]}
        question={{
          requiredMessage: validationT("timelineRequired"),
          title: t("timeline.title"),
        }}
      />

      <div className="flex flex-col gap-4 rounded-xl border p-4">
        <h2 className="text-xl font-semibold text-foreground">{t("lead.title")}</h2>

        <LeadField
          autoComplete="name"
          control={control}
          label={t("lead.full_name")}
          name="full_name"
          rules={{ required: validationT("fullNameRequired") }}
        />

        <LeadField
          autoComplete="email"
          control={control}
          label={t("lead.email")}
          name="email"
          rules={{
            pattern: {
              message: validationT("emailInvalid"),
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            },
            required: validationT("emailRequired"),
          }}
          type="email"
        />

        <LeadField
          autoComplete="tel"
          control={control}
          label={t("lead.phone")}
          name="phone"
          rules={{ required: validationT("phoneRequired") }}
          type="tel"
        />
      </div>
    </div>
  );
}
