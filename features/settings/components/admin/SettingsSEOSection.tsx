"use client";

import { Search } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { SiteSettingsFormValues } from "@/features/settings/schemas/site-settings-schema";

interface SettingsSEOSectionProps {
  register: UseFormRegister<SiteSettingsFormValues>;
  errors: FieldErrors<SiteSettingsFormValues>;
}

export default function SettingsSEOSection({
  register,
  errors,
}: SettingsSEOSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <Search
              size={19}
              aria-hidden="true"
            />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Website SEO
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Configure the default title and description for the website.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {/* Site Title */}
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label
              htmlFor="settings-site-title"
              className="text-sm font-semibold text-[#0F172A]"
            >
              Site Title
            </label>

            <span className="text-xs text-[#94A3B8]">
              Max 70 characters
            </span>
          </div>

          <input
            id="settings-site-title"
            type="text"
            maxLength={70}
            placeholder="GR Pest Control | Professional Pest Control Services"
            {...register("siteTitle")}
            aria-invalid={Boolean(
              errors.siteTitle,
            )}
            aria-describedby={
              errors.siteTitle
                ? "settings-site-title-error"
                : "settings-site-title-help"
            }
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.siteTitle
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.siteTitle ? (
            <p
              id="settings-site-title-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.siteTitle.message}
            </p>
          ) : (
            <p
              id="settings-site-title-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Keep the main website title clear, descriptive and brand-focused.
            </p>
          )}
        </div>

        {/* Site Description */}
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label
              htmlFor="settings-site-description"
              className="text-sm font-semibold text-[#0F172A]"
            >
              Site Description
            </label>

            <span className="text-xs text-[#94A3B8]">
              Max 160 characters
            </span>
          </div>

          <textarea
            id="settings-site-description"
            rows={4}
            maxLength={160}
            placeholder="Professional pest control services for homes and businesses..."
            {...register("siteDescription")}
            aria-invalid={Boolean(
              errors.siteDescription,
            )}
            aria-describedby={
              errors.siteDescription
                ? "settings-site-description-error"
                : "settings-site-description-help"
            }
            className={`w-full resize-y rounded-lg border px-3 py-3 text-sm leading-6 text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.siteDescription
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.siteDescription ? (
            <p
              id="settings-site-description-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.siteDescription.message}
            </p>
          ) : (
            <p
              id="settings-site-description-help"
              className="mt-1.5 text-xs leading-5 text-[#64748B]"
            >
              Write a concise description that explains what the business
              offers and where it operates.
            </p>
          )}
        </div>

        {/* SEO Preview */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Search
              size={16}
              className="text-[#0878E8]"
              aria-hidden="true"
            />

            <p className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
              Search Preview
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="truncate text-base font-medium text-blue-700">
              Your website title will appear here
            </p>

            <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#64748B]">
              Your website description will appear here when search engines
              use this metadata.
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
          <p className="text-xs leading-5 text-blue-800">
            These are default website-level SEO values. Individual service,
            blog and location pages can use their own SEO metadata.
          </p>
        </div>
      </div>
    </section>
  );
}