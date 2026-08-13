"use client";

import {
  Eye,
  ListOrdered,
  Send,
  Star,
} from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { TestimonialFormValues } from "@/features/testimonials/schemas/testimonial-schema";

interface TestimonialPublishingSectionProps {
  register: UseFormRegister<TestimonialFormValues>;
  errors: FieldErrors<TestimonialFormValues>;
}

export default function TestimonialPublishingSection({
  register,
  errors,
}: TestimonialPublishingSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <Send
              size={19}
              aria-hidden="true"
            />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Publishing
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Control visibility, featured placement and display order.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        {/* Active */}
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

              Active
            </span>

            <span className="mt-1 block text-xs leading-5 text-[#64748B]">
              Active testimonials are allowed to appear on the public website.
            </span>
          </span>
        </label>

        {/* Featured */}
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-amber-400 hover:bg-amber-50/30">
          <input
            type="checkbox"
            {...register("featured")}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-amber-500 focus:ring-2 focus:ring-amber-200"
          />

          <span className="min-w-0">
            <span className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
              <Star
                size={16}
                aria-hidden="true"
              />

              Featured Testimonial
            </span>

            <span className="mt-1 block text-xs leading-5 text-[#64748B]">
              Use this testimonial in prominent testimonial sections.
            </span>
          </span>
        </label>

        {/* Sort Order */}
        <div className="rounded-xl border border-slate-200 p-4">
          <label
            htmlFor="testimonial-sort-order"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F172A]"
          >
            <ListOrdered
              size={16}
              aria-hidden="true"
            />

            Sort Order
          </label>

          <input
            id="testimonial-sort-order"
            type="number"
            min={0}
            step={1}
            {...register("sortOrder", {
              valueAsNumber: true,
            })}
            aria-invalid={Boolean(
              errors.sortOrder,
            )}
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition focus:ring-2 ${
              errors.sortOrder
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.sortOrder ? (
            <p
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.sortOrder.message}
            </p>
          ) : (
            <p className="mt-1.5 text-xs leading-5 text-[#64748B]">
              Lower numbers appear first when testimonials are manually sorted.
            </p>
          )}
        </div>

        {/* Errors */}
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