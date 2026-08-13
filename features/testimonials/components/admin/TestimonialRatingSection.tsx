"use client";

import { Star } from "lucide-react";
import {
  useController,
  type Control,
  type FieldErrors,
} from "react-hook-form";

import type { TestimonialFormValues } from "@/features/testimonials/schemas/testimonial-schema";

interface TestimonialRatingSectionProps {
  control: Control<TestimonialFormValues>;
  errors: FieldErrors<TestimonialFormValues>;
}

export default function TestimonialRatingSection({
  control,
  errors,
}: TestimonialRatingSectionProps) {
  const { field } = useController({
    name: "rating",
    control,
    defaultValue: 5,
  });

  const rating = field.value ?? 5;

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
            <Star
              size={19}
              fill="currentColor"
              aria-hidden="true"
            />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Customer Rating
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Select the rating given by the customer.
            </p>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="p-5 sm:p-6">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div
            className="flex items-center gap-2"
            role="radiogroup"
            aria-label="Customer rating"
          >
            {[1, 2, 3, 4, 5].map((star) => {
              const isActive = star <= rating;

              return (
                <button
                  key={star}
                  type="button"
                  role="radio"
                  aria-checked={rating === star}
                  aria-label={`${star} out of 5 stars`}
                  onClick={() => {
                    field.onChange(star);
                  }}
                  className="rounded-md p-1 text-amber-400 outline-none transition hover:scale-110 focus:ring-2 focus:ring-amber-200"
                >
                  <Star
                    size={32}
                    fill={
                      isActive
                        ? "currentColor"
                        : "none"
                    }
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#0F172A]">
              {rating} / 5
            </p>

            <p className="text-xs text-[#64748B]">
              {rating === 5
                ? "Excellent"
                : rating === 4
                  ? "Very good"
                  : rating === 3
                    ? "Good"
                    : rating === 2
                      ? "Needs improvement"
                      : "Poor"}
            </p>
          </div>
        </div>

        {errors.rating && (
          <p
            role="alert"
            className="mt-2 text-xs font-medium text-red-600"
          >
            {errors.rating.message}
          </p>
        )}
      </div>
    </section>
  );
}