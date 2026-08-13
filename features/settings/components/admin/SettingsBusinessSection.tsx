"use client";

import { Building2 } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { SiteSettingsFormValues } from "@/features/settings/schemas/site-settings-schema";

interface SettingsBusinessSectionProps {
  register: UseFormRegister<SiteSettingsFormValues>;
  errors: FieldErrors<SiteSettingsFormValues>;
}

export default function SettingsBusinessSection({
  register,
  errors,
}: SettingsBusinessSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <Building2 size={19} aria-hidden="true" />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Business Information
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Manage the main business identity displayed across the website.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {/* Business Name */}
        <div>
          <label
            htmlFor="businessName"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Business Name
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="businessName"
            type="text"
            maxLength={160}
            placeholder="e.g. GR Pest Control"
            {...register("businessName")}
            aria-invalid={Boolean(errors.businessName)}
            className={`h-11 w-full rounded-lg border px-3 text-sm outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.businessName
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.businessName && (
            <p
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.businessName.message}
            </p>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label
            htmlFor="shortDescription"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Short Description
          </label>

          <textarea
            id="shortDescription"
            rows={4}
            maxLength={500}
            placeholder="Briefly describe your business..."
            {...register("shortDescription")}
            aria-invalid={Boolean(errors.shortDescription)}
            className={`w-full resize-y rounded-lg border px-3 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.shortDescription
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.shortDescription && (
            <p
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.shortDescription.message}
            </p>
          )}
        </div>

        {/* CTA + Currency */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* CTA */}
          <div>
            <label
              htmlFor="primaryCTA"
              className="mb-2 block text-sm font-semibold text-[#0F172A]"
            >
              Primary CTA
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              id="primaryCTA"
              type="text"
              maxLength={100}
              placeholder="Get a Free Quote"
              {...register("primaryCTA")}
              aria-invalid={Boolean(errors.primaryCTA)}
              className={`h-11 w-full rounded-lg border px-3 text-sm outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                errors.primaryCTA
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
              }`}
            />

            {errors.primaryCTA && (
              <p
                role="alert"
                className="mt-1.5 text-xs font-medium text-red-600"
              >
                {errors.primaryCTA.message}
              </p>
            )}
          </div>

          {/* Currency */}
          <div>
            <label
              htmlFor="currency"
              className="mb-2 block text-sm font-semibold text-[#0F172A]"
            >
              Currency
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              id="currency"
              type="text"
              maxLength={10}
              placeholder="INR"
              {...register("currency")}
              aria-invalid={Boolean(errors.currency)}
              className={`h-11 w-full rounded-lg border px-3 text-sm uppercase outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                errors.currency
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
              }`}
            />

            {errors.currency && (
              <p
                role="alert"
                className="mt-1.5 text-xs font-medium text-red-600"
              >
                {errors.currency.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}