"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactFormStep1 } from "@/src/features/contact/components/contact-form-step1";
import type { PrimaryReason } from "@/src/features/contact/models";
import { step1Schema } from "@/src/features/contact/models";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

type Step1FormValues = {
  primary_reason?: PrimaryReason;
};

const defaultValues: Step1FormValues = {
  primary_reason: undefined,
};

export function ContactForm() {
  const t = useTranslations("contact.form");
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step1FormValues>({
    defaultValues,
    mode: "onSubmit",
  });

  const onSubmit = async (values: Step1FormValues) => {
    const result = step1Schema.safeParse(values);

    if (!result.success) {
      return;
    }

    console.log(result.data);
  };

  return (
    <div className="flex w-full justify-center px-4 py-10">
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            <ContactFormStep1
              control={control}
              errorMessage={errors.primary_reason?.message}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {t("submit")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
