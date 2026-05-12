"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

const LABELS = ["A", "B", "C", "D", "E"] as const;

type QuestionSelectOption<TValue extends string> = {
  description: string;
  value: TValue;
};

type QuestionSelectTemplateProps<
  TFieldValues extends FieldValues,
  TValue extends string,
> = {
  control: Control<TFieldValues>;
  errorMessage?: string;
  name: FieldPath<TFieldValues>;
  options: readonly [QuestionSelectOption<TValue>, QuestionSelectOption<TValue>, ...QuestionSelectOption<TValue>[]];
  question: {
    description?: string;
    requiredMessage: string;
    title: string;
  };
};

export function QuestionSelectTemplate<
  TFieldValues extends FieldValues,
  TValue extends string,
>({
  control,
  errorMessage,
  name,
  options,
  question,
}: QuestionSelectTemplateProps<TFieldValues, TValue>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: question.requiredMessage }}
      render={({ field }) => (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-foreground">
              {question.title}
            </h2>
            {question.description ? (
              <p className="text-sm text-muted-foreground">
                {question.description}
              </p>
            ) : null}
          </div>
          <div className="flex flex-1 flex-col gap-6">
            {options.map((option, index) => {
              const isSelected = field.value === option.value;

              return (
                <label
                  key={option.value}
                  className="flex cursor-pointer flex-row items-center gap-6 rounded-lg border px-4 py-3"
                >
                  <Checkbox
                    checked={isSelected}
                    onBlur={field.onBlur}
                    onCheckedChange={(checked) =>
                      field.onChange(checked ? option.value : undefined)
                    }
                  />
                  <p className="text-sm font-medium text-primary">
                    {LABELS[index]}
                  </p>
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-sm text-muted-foreground">
                      {option.description}
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
  );
}
