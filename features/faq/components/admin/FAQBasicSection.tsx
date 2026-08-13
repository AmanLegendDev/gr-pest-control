"use client";

import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { HelpCircle } from "lucide-react";

import type { FAQFormValues } from "@/features/faq/schemas/faq-schema";

interface FAQBasicSectionProps {
  register: UseFormRegister<FAQFormValues>;
  errors: FieldErrors<FAQFormValues>;
}

export default function FAQBasicSection({
  register,
  errors,
}: FAQBasicSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <HelpCircle size={19} aria-hidden="true" />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              FAQ Details
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Add the question and answer visitors should see.
            </p>
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-5 p-5 sm:p-6">
        {/* Question */}
        <div>
          <label
            htmlFor="faq-question"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Question
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="faq-question"
            type="text"
            placeholder="e.g. How often should pest control be done?"
            {...register("question")}
            aria-invalid={Boolean(errors.question)}
            aria-describedby={
              errors.question
                ? "faq-question-error"
                : "faq-question-help"
            }
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.question
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.question ? (
            <p
              id="faq-question-error"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.question.message}
            </p>
          ) : (
            <p
              id="faq-question-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Write the question exactly as a customer might ask it.
            </p>
          )}
        </div>

        {/* Answer */}
        <div>
          <label
            htmlFor="faq-answer"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Answer
            <span className="ml-1 text-red-500">*</span>
          </label>

          <textarea
            id="faq-answer"
            rows={7}
            placeholder="Write a clear and helpful answer..."
            {...register("answer")}
            aria-invalid={Boolean(errors.answer)}
            aria-describedby={
              errors.answer
                ? "faq-answer-error"
                : "faq-answer-help"
            }
            className={`min-h-40 w-full resize-y rounded-lg border px-3 py-3 text-sm leading-6 text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.answer
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.answer ? (
            <p
              id="faq-answer-error"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.answer.message}
            </p>
          ) : (
            <p
              id="faq-answer-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Keep the answer accurate, concise and useful for customers.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}