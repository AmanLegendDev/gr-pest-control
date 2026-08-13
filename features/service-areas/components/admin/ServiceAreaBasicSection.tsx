"use client";

import { MapPin } from "lucide-react";
import type { UseFormRegister } from "react-hook-form";

import type { ServiceAreaFormValues } from "@/features/service-areas/schemas/service-area-schema";

interface ServiceAreaBasicSectionProps {
  register: UseFormRegister<ServiceAreaFormValues>;
  errors: {
    name?: {
      message?: string;
    };
    slug?: {
      message?: string;
    };
    shortDescription?: {
      message?: string;
    };
    description?: {
      message?: string;
    };
  };
}

export default function ServiceAreaBasicSection({
  register,
  errors,
}: ServiceAreaBasicSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <MapPin size={19} aria-hidden="true" />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Add the main information for this service area.
            </p>
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-6 p-5 sm:p-6">
        {/* Name + Slug */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* Area Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-[#0F172A]"
            >
              Area Name <span className="text-red-500">*</span>
            </label>

            <input
              id="name"
              type="text"
              placeholder="e.g. Shimla"
              autoComplete="off"
              {...register("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                errors.name
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
              }`}
            />

            {errors.name?.message && (
              <p
                id="name-error"
                className="mt-1.5 text-xs font-medium text-red-600"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label
              htmlFor="slug"
              className="mb-2 block text-sm font-semibold text-[#0F172A]"
            >
              URL Slug <span className="text-red-500">*</span>
            </label>

            <div className="flex h-11 overflow-hidden rounded-lg border border-slate-300 focus-within:border-[#0878E8] focus-within:ring-2 focus-within:ring-blue-100">
              <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3 text-xs text-slate-500">
                /service-areas/
              </span>

              <input
                id="slug"
                type="text"
                placeholder="shimla"
                autoComplete="off"
                spellCheck={false}
                {...register("slug")}
                aria-invalid={Boolean(errors.slug)}
                aria-describedby={errors.slug ? "slug-error" : undefined}
                className="min-w-0 flex-1 border-0 px-3 text-sm text-[#0F172A] outline-none placeholder:text-slate-400"
              />
            </div>

            {errors.slug?.message && (
              <p
                id="slug-error"
                className="mt-1.5 text-xs font-medium text-red-600"
              >
                {errors.slug.message}
              </p>
            )}

            {!errors.slug && (
              <p className="mt-1.5 text-xs text-[#64748B]">
                Use lowercase letters, numbers and hyphens only.
              </p>
            )}
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label
            htmlFor="shortDescription"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Short Description <span className="text-red-500">*</span>
          </label>

          <textarea
            id="shortDescription"
            rows={3}
            placeholder="Briefly describe pest-control service availability in this area."
            {...register("shortDescription")}
            aria-invalid={Boolean(errors.shortDescription)}
            aria-describedby={
              errors.shortDescription
                ? "shortDescription-error"
                : undefined
            }
            className={`w-full resize-y rounded-lg border px-3 py-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.shortDescription
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.shortDescription?.message && (
            <p
              id="shortDescription-error"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.shortDescription.message}
            </p>
          )}
        </div>

        {/* Full Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Full Description <span className="text-red-500">*</span>
          </label>

          <textarea
            id="description"
            rows={8}
            placeholder="Write useful, location-specific information about GR Pest Control's service in this area."
            {...register("description")}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={
              errors.description ? "description-error" : undefined
            }
            className={`w-full resize-y rounded-lg border px-3 py-3 text-sm leading-6 text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.description
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.description?.message && (
            <p
              id="description-error"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.description.message}
            </p>
          )}

          {!errors.description && (
            <p className="mt-1.5 text-xs text-[#64748B]">
              Keep this content genuinely useful and specific to the service
              area. Avoid repetitive or keyword-stuffed copy.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}1