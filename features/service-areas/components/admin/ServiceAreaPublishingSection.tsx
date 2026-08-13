"use client";

import { Globe2, Star } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { ServiceAreaFormValues } from "@/features/service-areas/schemas/service-area-schema";

interface ServiceAreaPublishingSectionProps {
  register: UseFormRegister<ServiceAreaFormValues>;
  errors: FieldErrors<ServiceAreaFormValues>;
}

export default function ServiceAreaPublishingSection({
  register,
  errors,
}: ServiceAreaPublishingSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-[#39A935]">
            <Globe2 size={19} aria-hidden="true" />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Publishing
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Control whether this service area is visible publicly and how
              prominently it appears.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5 sm:p-6">
        {/* Active */}
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300">
          <input
            type="checkbox"
            {...register("active")}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-[#0878E8] accent-[#0878E8] focus:ring-2 focus:ring-blue-100"
          />

          <span className="min-w-0">
            <span className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
              <Globe2
                size={16}
                className="text-[#39A935]"
                aria-hidden="true"
              />
              Active
            </span>

            <span className="mt-1 block text-xs leading-5 text-[#64748B]">
              When enabled, this service area can appear on the public website.
            </span>
          </span>
        </label>

        {/* Featured */}
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300">
          <input
            type="checkbox"
            {...register("featured")}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-[#0878E8] accent-[#0878E8] focus:ring-2 focus:ring-blue-100"
          />

          <span className="min-w-0">
            <span className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
              <Star
                size={16}
                className="text-[#7ED321]"
                aria-hidden="true"
              />
              Featured Area
            </span>

            <span className="mt-1 block text-xs leading-5 text-[#64748B]">
              Featured areas can receive higher visibility in supported public
              sections.
            </span>
          </span>
        </label>

        {/* Sort Order */}
        <div className="pt-1">
          <label
            htmlFor="sortOrder"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Display Order
          </label>

          <input
            id="sortOrder"
            type="number"
            min={0}
            step={1}
            {...register("sortOrder", {
              valueAsNumber: true,
            })}
            aria-invalid={Boolean(errors.sortOrder)}
            aria-describedby={
              errors.sortOrder
                ? "service-area-sort-order-error"
                : "service-area-sort-order-help"
            }
            className={`h-11 w-full max-w-[220px] rounded-lg border bg-white px-3 text-sm text-[#0F172A] outline-none transition focus:ring-2 ${
              errors.sortOrder
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.sortOrder?.message ? (
            <p
              id="service-area-sort-order-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.sortOrder.message}
            </p>
          ) : (
            <p
              id="service-area-sort-order-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Lower numbers appear earlier when areas are sorted by display
              order.
            </p>
          )}
        </div>

        {/* Publishing note */}
        <div className="rounded-xl border border-green-100 bg-green-50/60 p-4">
          <p className="text-sm font-semibold text-[#062B63]">
            Publishing note
          </p>

          <p className="mt-1 text-xs leading-5 text-[#64748B]">
            Keep an area active only when GR Pest Control genuinely provides
            service there. Do not publish locations solely for search-engine
            targeting.
          </p>
        </div>
      </div>
    </section>
  );
}