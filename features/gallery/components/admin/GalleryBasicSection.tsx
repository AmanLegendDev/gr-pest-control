"use client";

import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { ImageIcon } from "lucide-react";

import type { GalleryFormValues } from "@/features/gallery/schemas/gallery-schema";

interface GalleryBasicSectionProps {
  register: UseFormRegister<GalleryFormValues>;
  errors: FieldErrors<GalleryFormValues>;
}

export default function GalleryBasicSection({
  register,
  errors,
}: GalleryBasicSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <ImageIcon size={19} aria-hidden="true" />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Gallery Details
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Add the basic information for this gallery item.
            </p>
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-5 p-5 sm:p-6">
        {/* Title */}
        <div>
          <label
            htmlFor="gallery-title"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Title
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="gallery-title"
            type="text"
            maxLength={160}
            placeholder="e.g. Professional Cockroach Treatment"
            {...register("title")}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={
              errors.title
                ? "gallery-title-error"
                : "gallery-title-help"
            }
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.title
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.title ? (
            <p
              id="gallery-title-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.title.message}
            </p>
          ) : (
            <p
              id="gallery-title-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Use a clear title describing what the image shows.
            </p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label
            htmlFor="gallery-slug"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            URL Slug
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="gallery-slug"
            type="text"
            maxLength={180}
            placeholder="e.g. professional-cockroach-treatment"
            {...register("slug")}
            aria-invalid={Boolean(errors.slug)}
            aria-describedby={
              errors.slug
                ? "gallery-slug-error"
                : "gallery-slug-help"
            }
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.slug
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.slug ? (
            <p
              id="gallery-slug-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.slug.message}
            </p>
          ) : (
            <p
              id="gallery-slug-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Use lowercase letters, numbers and hyphens only.
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="gallery-description"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Description
            <span className="ml-1 text-red-500">*</span>
          </label>

          <textarea
            id="gallery-description"
            rows={5}
            maxLength={500}
            placeholder="Describe the project, treatment or location shown in the image..."
            {...register("description")}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={
              errors.description
                ? "gallery-description-error"
                : "gallery-description-help"
            }
            className={`w-full resize-y rounded-lg border px-3 py-3 text-sm leading-6 text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.description
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.description ? (
            <p
              id="gallery-description-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.description.message}
            </p>
          ) : (
            <p
              id="gallery-description-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Keep it useful and descriptive. Maximum 500 characters.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}