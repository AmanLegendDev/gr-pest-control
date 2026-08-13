"use client";

import { MessageSquare, UserRound } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { TestimonialFormValues } from "@/features/testimonials/schemas/testimonial-schema";

interface TestimonialBasicSectionProps {
  register: UseFormRegister<TestimonialFormValues>;
  errors: FieldErrors<TestimonialFormValues>;
}

export default function TestimonialBasicSection({
  register,
  errors,
}: TestimonialBasicSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <UserRound
              size={19}
              aria-hidden="true"
            />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Customer Details
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Add the customer information and their genuine feedback.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {/* Name / Location */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Name */}
          <div>
            <label
              htmlFor="testimonial-name"
              className="mb-2 block text-sm font-semibold text-[#0F172A]"
            >
              Customer Name
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="testimonial-name"
              type="text"
              maxLength={120}
              placeholder="e.g. Rajesh Kumar"
              {...register("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={
                errors.name
                  ? "testimonial-name-error"
                  : undefined
              }
              className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                errors.name
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
              }`}
            />

            {errors.name && (
              <p
                id="testimonial-name-error"
                role="alert"
                className="mt-1.5 text-xs font-medium text-red-600"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="testimonial-location"
              className="mb-2 block text-sm font-semibold text-[#0F172A]"
            >
              Location
            </label>

            <input
              id="testimonial-location"
              type="text"
              maxLength={120}
              placeholder="e.g. Shimla, Himachal Pradesh"
              {...register("location")}
              aria-invalid={Boolean(
                errors.location,
              )}
              aria-describedby={
                errors.location
                  ? "testimonial-location-error"
                  : undefined
              }
              className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                errors.location
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
              }`}
            />

            {errors.location && (
              <p
                id="testimonial-location-error"
                role="alert"
                className="mt-1.5 text-xs font-medium text-red-600"
              >
                {errors.location.message}
              </p>
            )}
          </div>
        </div>

        {/* Role / Company */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Role */}
          <div>
            <label
              htmlFor="testimonial-role"
              className="mb-2 block text-sm font-semibold text-[#0F172A]"
            >
              Role / Occupation
            </label>

            <input
              id="testimonial-role"
              type="text"
              maxLength={120}
              placeholder="e.g. Homeowner"
              {...register("role")}
              aria-invalid={Boolean(
                errors.role,
              )}
              aria-describedby={
                errors.role
                  ? "testimonial-role-error"
                  : undefined
              }
              className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                errors.role
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
              }`}
            />

            {errors.role && (
              <p
                id="testimonial-role-error"
                role="alert"
                className="mt-1.5 text-xs font-medium text-red-600"
              >
                {errors.role.message}
              </p>
            )}
          </div>

          {/* Company */}
          <div>
            <label
              htmlFor="testimonial-company"
              className="mb-2 block text-sm font-semibold text-[#0F172A]"
            >
              Company / Business
            </label>

            <input
              id="testimonial-company"
              type="text"
              maxLength={160}
              placeholder="e.g. ABC Restaurant"
              {...register("company")}
              aria-invalid={Boolean(
                errors.company,
              )}
              aria-describedby={
                errors.company
                  ? "testimonial-company-error"
                  : undefined
              }
              className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                errors.company
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
              }`}
            />

            {errors.company && (
              <p
                id="testimonial-company-error"
                role="alert"
                className="mt-1.5 text-xs font-medium text-red-600"
              >
                {errors.company.message}
              </p>
            )}
          </div>
        </div>

        {/* Testimonial */}
        <div>
          <label
            htmlFor="testimonial-content"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F172A]"
          >
            <MessageSquare
              size={16}
              aria-hidden="true"
            />

            Customer Testimonial
            <span className="text-red-500">
              *
            </span>
          </label>

          <textarea
            id="testimonial-content"
            rows={7}
            maxLength={2000}
            placeholder="Enter the genuine customer feedback..."
            {...register("content")}
            aria-invalid={Boolean(
              errors.content,
            )}
            aria-describedby={
              errors.content
                ? "testimonial-content-error"
                : "testimonial-content-help"
            }
            className={`w-full resize-y rounded-xl border px-4 py-3 text-sm leading-7 text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.content
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.content ? (
            <p
              id="testimonial-content-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.content.message}
            </p>
          ) : (
            <p
              id="testimonial-content-help"
              className="mt-1.5 text-xs leading-5 text-[#64748B]"
            >
              Add the customer's real feedback. Keep it natural and
              do not manufacture reviews.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}