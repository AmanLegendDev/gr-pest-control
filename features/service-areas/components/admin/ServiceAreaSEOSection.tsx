"use client";

import { Search } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { ServiceAreaFormValues } from "@/features/service-areas/schemas/service-area-schema";

interface ServiceAreaSEOSectionProps {
  register: UseFormRegister<ServiceAreaFormValues>;
  errors: FieldErrors<ServiceAreaFormValues>;
}

export default function ServiceAreaSEOSection({
  register,
  errors,
}: ServiceAreaSEOSectionProps) {
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
              Add optional search-engine metadata for this service area page.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 p-5 sm:p-6">
        {/* SEO Title */}
        <div>
          <label
            htmlFor="seoTitle"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            SEO Title
          </label>

          <input
            id="seoTitle"
            type="text"
            maxLength={70}
            placeholder="Pest Control in Shimla | GR Pest Control"
            {...register("seoTitle")}
            aria-invalid={Boolean(errors.seoTitle)}
            aria-describedby={
              errors.seoTitle
                ? "service-area-seo-title-error"
                : "service-area-seo-title-help"
            }
            className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.seoTitle
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.seoTitle?.message ? (
            <p
              id="service-area-seo-title-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.seoTitle.message}
            </p>
          ) : (
            <p
              id="service-area-seo-title-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Keep it clear and relevant to the actual service area.
            </p>
          )}
        </div>

        {/* SEO Description */}
        <div>
          <label
            htmlFor="seoDescription"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            SEO Description
          </label>

          <textarea
            id="seoDescription"
            rows={4}
            maxLength={160}
            placeholder="Professional pest control services for homes and businesses in this area."
            {...register("seoDescription")}
            aria-invalid={Boolean(errors.seoDescription)}
            aria-describedby={
              errors.seoDescription
                ? "service-area-seo-description-error"
                : "service-area-seo-description-help"
            }
            className={`w-full resize-y rounded-lg border bg-white px-3 py-3 text-sm leading-6 text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.seoDescription
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.seoDescription?.message ? (
            <p
              id="service-area-seo-description-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.seoDescription.message}
            </p>
          ) : (
            <p
              id="service-area-seo-description-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Write a natural description that accurately represents this
              location page.
            </p>
          )}
        </div>

        {/* SEO Guidance */}
        <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
          <p className="text-sm font-semibold text-[#062B63]">
            SEO guidance
          </p>

          <ul className="mt-2 space-y-1.5 text-xs leading-5 text-[#64748B]">
            <li>
              • Use the actual service area name instead of keyword stuffing.
            </li>

            <li>
              • Keep the title unique and useful for the page.
            </li>

            <li>
              • Make the description describe the real content available on
              this location page.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}