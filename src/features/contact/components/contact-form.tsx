"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContactFormStep1 } from "@/src/features/contact/components/contact-form-step1";
import { ContactFormStep2 } from "@/src/features/contact/components/contact-form-step2";
import { ContactFormStep3 } from "@/src/features/contact/components/contact-form-step3";
import { ContactFormStep4 } from "@/src/features/contact/components/contact-form-step4";
import type { ContactFormData } from "@/src/features/contact/models";
import { useTranslations } from "next-intl";

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL!;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [currentStep, setCurrentStep] = useState(1);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    control,
    getValues,
    handleSubmit,
    trigger,
    formState: { isSubmitting },
    clearErrors,
  } = useForm<ContactFormData>({
    defaultValues: {
      primary_reason: undefined,
      location: undefined,
      current_visa: undefined,
      migration_stream: undefined,
      notification_date: undefined,
      refusal_issue: undefined,
      bridging_visa: undefined,
    },
    mode: "onSubmit",
  });

  const primaryReason = useWatch({ control, name: "primary_reason" });
  const isHighUrgency = primaryReason === "crisis" || primaryReason === "art";

  const handleContinue = async () => {
    if (currentStep === 1) {
      const valid = await trigger("primary_reason");
      if (!valid || !primaryReason) return;

      setCurrentStep(primaryReason === "general" ? 3 : 2);
      setTimeout(() => {
        clearErrors();
      }, 0);
      return;
    }

    if (currentStep === 2) {
      const location = getValues("location");
      const step2Fields = isHighUrgency
        ? (["notification_date", "refusal_issue", "bridging_visa"] as const)
        : location === "onshore"
          ? (["location", "current_visa", "migration_stream"] as const)
          : (["location", "migration_stream"] as const);

      const valid = await trigger(step2Fields);
      if (!valid) return;
    }

    if (currentStep === 3) {
      const valid = await trigger(["age_group", "education", "english_level"]);
      if (!valid) return;
    }

    setCurrentStep((step) => step + 1);
    setTimeout(() => {
      clearErrors();
    }, 0);
  };

  const onSubmit = async (values: ContactFormData) => {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ ...values, is_high_urgency: isHighUrgency }),
      });
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="flex w-full justify-center px-4 py-10">
        <Card className="w-full max-w-3xl">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle>{t("successTitle")}</CardTitle>
            <CardDescription>{t("successDescription")}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center px-4 py-10">
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="text-3xl">{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {currentStep === 1 && <ContactFormStep1 control={control} />}

            {currentStep === 2 && (
              <ContactFormStep2
                control={control}
                isHighUrgency={isHighUrgency}
              />
            )}

            {currentStep === 3 && <ContactFormStep3 control={control} />}

            {currentStep === 4 && <ContactFormStep4 control={control} />}

            <div className="flex flex-col gap-3">
              {submitStatus === "error" && (
                <p className="text-sm text-destructive text-right">
                  {t("submitError")}
                </p>
              )}
              <div className="flex items-center justify-between">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep((s) => s - 1)}
                  >
                    {t("back")}
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={handleContinue}
                    disabled={isSubmitting}
                  >
                    {t("submit")}
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isHighUrgency ? t("emergencySubmit") : t("inquirySubmit")}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
