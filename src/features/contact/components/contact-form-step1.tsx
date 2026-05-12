"use client";

import type { PrimaryReason } from "@/src/features/contact/models";
import { Controller, type Control } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/checkbox";

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

  return (
    <Controller
      control={control}
      name="primary_reason"
      rules={{ required: validationT("primaryReasonRequired") }}
      render={({ field }) => (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-muted-foreground">
              {t("phase")}
            </p>
            <h2 className="text-xl font-semibold text-foreground">
              {t("title")}
            </h2>
            <p className="text-sm text-muted-foreground">{t("description")}</p>
          </div>
          <div className="flex flex-col gap-6 ">
            {reasonOptions.map((reason) => {
              const isSelected = field.value === reason;

              return (
                <div
                  key={reason}
                  className="flex flex-row items-center justify-center border rounded-lg py-3 px-4"
                >
                  <Checkbox />
                  <p className="text-sm font-medium text-primary ml-6">
                    {t(`options.${reason}.label`)}
                  </p>

                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-sm font-semibold text-foreground">
                      {t(`options.${reason}.title`)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t(`options.${reason}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {errorMessage ? (
            <p className="text-sm text-destructive">{errorMessage}</p>
          ) : null}
        </div>
      )}
    />
  );
}
