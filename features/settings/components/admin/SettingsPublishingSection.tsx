"use client";

import { Eye, Globe2 } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { SiteSettingsFormValues } from "@/features/settings/schemas/site-settings-schema";

interface SettingsPublishingSectionProps {
  register: UseFormRegister<SiteSettingsFormValues>;
  errors: FieldErrors<SiteSettingsFormValues>;
}

export default function SettingsPublishingSection({
  register,
  errors,
}: SettingsPublishingSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <Globe2
              size={19}
              aria-hidden="true"
            />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Website Status
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Control whether the website configuration is active.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-[#0878E8] hover:bg-blue-50/30">
          <input
            type="checkbox"
            {...register("active")}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-[#0878E8] focus:ring-2 focus:ring-blue-200"
          />

          <span className="min-w-0">
            <span className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
              <Eye
                size={16}
                aria-hidden="true"
              />

              Website Active
            </span>

            <span className="mt-1 block text-xs leading-5 text-[#64748B]">
              Keep this enabled to use these business settings across the
              public website.
            </span>
          </span>
        </label>

        {errors.active && (
          <p
            role="alert"
            className="mt-2 text-xs font-medium text-red-600"
          >
            {errors.active.message}
          </p>
        )}

        <div className="mt-4 rounded-lg border border-amber-100 bg-amber-50 px-4 py-3">
          <p className="text-xs leading-5 text-amber-800">
            Disabling this setting may prevent your application from finding
            active website configuration. Keep it enabled during normal
            operation.
          </p>
        </div>
      </div>
    </section>
  );
}