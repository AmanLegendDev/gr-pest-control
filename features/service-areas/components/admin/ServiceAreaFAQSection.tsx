"use client";

import { HelpCircle, Plus, Trash2 } from "lucide-react";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { useFieldArray } from "react-hook-form";

import type { ServiceAreaFormValues } from "@/features/service-areas/schemas/service-area-schema";

interface ServiceAreaFAQSectionProps {
  control: Control<ServiceAreaFormValues>;
  register: UseFormRegister<ServiceAreaFormValues>;
  errors: FieldErrors<ServiceAreaFormValues>;
}

export default function ServiceAreaFAQSection({
  control,
  register,
  errors,
}: ServiceAreaFAQSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs",
  });

  const addFAQ = () => {
    append({
      question: "",
      answer: "",
      sortOrder: fields.length,
    });
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
              <HelpCircle size={19} aria-hidden="true" />
            </div>

            <div>
              <h2 className="font-semibold text-[#0F172A]">
                Service Area FAQs
              </h2>

              <p className="mt-1 text-sm text-[#64748B]">
                Add useful questions and answers specifically relevant to this
                service area.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={addFAQ}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0878E8] px-4 text-sm font-semibold text-white transition hover:bg-[#066BCF] focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
          >
            <Plus size={16} aria-hidden="true" />
            Add FAQ
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {fields.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
            <HelpCircle
              size={30}
              className="mx-auto text-slate-400"
              aria-hidden="true"
            />

            <p className="mt-3 text-sm font-semibold text-[#0F172A]">
              No FAQs added
            </p>

            <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-[#64748B]">
              Add only genuine questions customers may have about pest-control
              service in this area.
            </p>

            <button
              type="button"
              onClick={addFAQ}
              className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-[#0F172A] transition hover:border-[#0878E8] hover:text-[#0878E8] focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <Plus size={14} aria-hidden="true" />
              Add First FAQ
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {fields.map((field, index) => {
              const faqError = errors.faqs?.[index];

              return (
                <div
                  key={field.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-xs font-bold text-[#0878E8] shadow-sm">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-sm font-semibold text-[#0F172A]">
                        FAQ
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      aria-label={`Remove FAQ ${index + 1}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-white text-red-500 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                    >
                      <Trash2 size={15} aria-hidden="true" />
                    </button>
                  </div>

                  <div className="mt-4 grid gap-4">
                    {/* Question */}
                    <div>
                      <label
                        htmlFor={`service-area-faq-question-${index}`}
                        className="mb-2 block text-sm font-semibold text-[#0F172A]"
                      >
                        Question
                      </label>

                      <input
                        id={`service-area-faq-question-${index}`}
                        type="text"
                        placeholder="e.g. Do you provide pest control in this area?"
                        {...register(`faqs.${index}.question`)}
                        aria-invalid={Boolean(faqError?.question)}
                        aria-describedby={
                          faqError?.question
                            ? `service-area-faq-question-${index}-error`
                            : undefined
                        }
                        className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                          faqError?.question
                            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                            : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
                        }`}
                      />

                      {faqError?.question?.message && (
                        <p
                          id={`service-area-faq-question-${index}-error`}
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-red-600"
                        >
                          {faqError.question.message}
                        </p>
                      )}
                    </div>

                    {/* Answer */}
                    <div>
                      <label
                        htmlFor={`service-area-faq-answer-${index}`}
                        className="mb-2 block text-sm font-semibold text-[#0F172A]"
                      >
                        Answer
                      </label>

                      <textarea
                        id={`service-area-faq-answer-${index}`}
                        rows={4}
                        placeholder="Write a clear and useful answer..."
                        {...register(`faqs.${index}.answer`)}
                        aria-invalid={Boolean(faqError?.answer)}
                        aria-describedby={
                          faqError?.answer
                            ? `service-area-faq-answer-${index}-error`
                            : undefined
                        }
                        className={`w-full resize-y rounded-lg border bg-white px-3 py-3 text-sm leading-6 text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                          faqError?.answer
                            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                            : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
                        }`}
                      />

                      {faqError?.answer?.message && (
                        <p
                          id={`service-area-faq-answer-${index}-error`}
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-red-600"
                        >
                          {faqError.answer.message}
                        </p>
                      )}
                    </div>

                    {/* Sort Order */}
                    <div className="max-w-[180px]">
                      <label
                        htmlFor={`service-area-faq-sort-${index}`}
                        className="mb-2 block text-sm font-semibold text-[#0F172A]"
                      >
                        Display Order
                      </label>

                      <input
                        id={`service-area-faq-sort-${index}`}
                        type="number"
                        min={0}
                        {...register(`faqs.${index}.sortOrder`, {
                          valueAsNumber: true,
                        })}
                        aria-invalid={Boolean(faqError?.sortOrder)}
                        className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-[#0F172A] outline-none transition focus:ring-2 ${
                          faqError?.sortOrder
                            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                            : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
                        }`}
                      />

                      {faqError?.sortOrder?.message && (
                        <p
                          role="alert"
                          className="mt-1.5 text-xs font-medium text-red-600"
                        >
                          {faqError.sortOrder.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {fields.length > 0 && (
          <button
            type="button"
            onClick={addFAQ}
            className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-[#0F172A] transition hover:border-[#0878E8] hover:text-[#0878E8] focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <Plus size={16} aria-hidden="true" />
            Add Another FAQ
          </button>
        )}
      </div>
    </section>
  );
}