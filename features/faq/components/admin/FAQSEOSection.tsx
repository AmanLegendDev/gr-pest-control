"use client";

import { Search } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { FAQFormValues } from "@/features/faq/schemas/faq-schema";

interface FAQSEOSectionProps {
  register: UseFormRegister<FAQFormValues>;
  errors: FieldErrors<FAQFormValues>;
}

export default function FAQSEOSection({
  register,
  errors,
}: FAQSEOSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <Search size={19} aria-hidden="true" />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              SEO Settings
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Optional search-engine metadata for this FAQ.
            </p>
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-5 p-5 sm:p-6">
        {/* SEO Title */}
        <div>
          <label
            htmlFor="faq-seo-title"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            SEO Title
          </label>

          <input
            id="faq-seo-title"
            type="text"
            placeholder="Leave blank to use the FAQ question"
            {...register("seoTitle")}
            maxLength={70}
            aria-invalid={Boolean(errors.seoTitle)}
            aria-describedby={
              errors.seoTitle
                ? "faq-seo-title-error"
                : "faq-seo-title-help"
            }
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.seoTitle
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.seoTitle ? (
            <p
              id="faq-seo-title-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.seoTitle.message}
            </p>
          ) : (
            <p
              id="faq-seo-title-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Keep it concise and relevant. Maximum 70 characters.
            </p>
          )}
        </div>

        {/* SEO Description */}
        <div>
          <label
            htmlFor="faq-seo-description"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            SEO Description
          </label>

          <textarea
            id="faq-seo-description"
            rows={4}
            placeholder="Write a concise description for search engines..."
            {...register("seoDescription")}
            maxLength={160}
            aria-invalid={Boolean(errors.seoDescription)}
            aria-describedby={
              errors.seoDescription
                ? "faq-seo-description-error"
                : "faq-seo-description-help"
            }
            className={`w-full resize-y rounded-lg border px-3 py-3 text-sm leading-6 text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.seoDescription
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.seoDescription ? (
            <p
              id="faq-seo-description-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.seoDescription.message}
            </p>
          ) : (
            <p
              id="faq-seo-description-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Keep it natural and useful. Maximum 160 characters.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}