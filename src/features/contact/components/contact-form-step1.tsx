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
    <div>
      <div className="flex flex-col gap-1 mb-2">
        <p className="text-sm font-medium text-muted-foreground">
          {t("phase")}
        </p>
        <h2 className="text-xl font-semibold text-foreground">{t("title")}</h2>
      </div>
      <Controller
        control={control}
        name="primary_reason"
        rules={{ required: validationT("primaryReasonRequired") }}
        render={({ field }) => (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col flex-1 gap-6 ">
              {reasonOptions.map((reason) => {
                const isSelected = field.value === reason;

                return (
                  <label
                    key={reason}
                    className="flex cursor-pointer flex-row items-center gap-6 rounded-lg border py-3 px-4"
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => {
                        console.log("step1 checkbox changed", {
                          checked,
                          reason,
                        });
                        field.onChange(checked ? reason : undefined);
                      }}
                      onBlur={field.onBlur}
                    />
                    <p className="text-sm font-medium text-primary">
                      {t(`options.${reason}.label`)}
                    </p>

                    <div className="flex flex-1 flex-col gap-1">
                      <p className="text-sm text-muted-foreground">
                        {t(`options.${reason}.description`)}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
            {errorMessage ? (
              <p className="text-sm text-destructive">{errorMessage}</p>
            ) : null}
          </div>
        )}
      />
    </div>
  );
}
