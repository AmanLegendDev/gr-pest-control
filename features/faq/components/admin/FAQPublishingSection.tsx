"use client";

import { Eye, Star } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { FAQFormValues } from "@/features/faq/schemas/faq-schema";

interface FAQPublishingSectionProps {
  register: UseFormRegister<FAQFormValues>;
  errors: FieldErrors<FAQFormValues>;
}

export default function FAQPublishingSection({
  register,
  errors,
}: FAQPublishingSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-[#39A935]">
            <Eye size={19} aria-hidden="true" />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Publishing
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Control whether this FAQ is visible on the public website.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4 p-5 sm:p-6">
        {/* Active */}
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-[#0878E8] hover:bg-blue-50/30">
          <input
            type="checkbox"
            {...register("active")}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0878E8] accent-[#0878E8] focus:ring-2 focus:ring-blue-200"
          />

          <span className="min-w-0">
            <span className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
              <Eye size={16} aria-hidden="true" />
              Active
            </span>

            <span className="mt-1 block text-xs leading-5 text-[#64748B]">
              Active FAQs can appear on the public FAQ page.
            </span>
          </span>
        </label>

        {/* Featured */}
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-[#39A935] hover:bg-green-50/30">
          <input
            type="checkbox"
            {...register("featured")}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#39A935] accent-[#39A935] focus:ring-2 focus:ring-green-200"
          />

          <span className="min-w-0">
            <span className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
              <Star size={16} aria-hidden="true" />
              Featured FAQ
            </span>

            <span className="mt-1 block text-xs leading-5 text-[#64748B]">
              Mark this FAQ as featured for prominent placements where the
              public architecture supports it.
            </span>
          </span>
        </label>

        {errors.active && (
          <p
            role="alert"
            className="text-xs font-medium text-red-600"
          >
            {errors.active.message}
          </p>
        )}

        {errors.featured && (
          <p
            role="alert"
            className="text-xs font-medium text-red-600"
          >
            {errors.featured.message}
          </p>
        )}
      </div>
    </section>
  );
}