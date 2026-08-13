"use client";

import { Search } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { GalleryFormValues } from "@/features/gallery/schemas/gallery-schema";

interface GallerySEOSectionProps {
  register: UseFormRegister<GalleryFormValues>;
  errors: FieldErrors<GalleryFormValues>;
}

export default function GallerySEOSection({
  register,
  errors,
}: GallerySEOSectionProps) {
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
              SEO Settings
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Add optional search-engine metadata for this gallery item.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {/* SEO Title */}
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label
              htmlFor="gallery-seo-title"
              className="text-sm font-semibold text-[#0F172A]"
            >
              SEO Title
            </label>

            <span className="text-xs text-[#94A3B8]">
              Max 70 characters
            </span>
          </div>

          <input
            id="gallery-seo-title"
            type="text"
            maxLength={70}
            placeholder="Leave blank to use the gallery title"
            {...register("seoTitle")}
            aria-invalid={Boolean(errors.seoTitle)}
            aria-describedby={
              errors.seoTitle
                ? "gallery-seo-title-error"
                : "gallery-seo-title-help"
            }
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.seoTitle
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.seoTitle ? (
            <p
              id="gallery-seo-title-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.seoTitle.message}
            </p>
          ) : (
            <p
              id="gallery-seo-title-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              A concise title describing the gallery item.
            </p>
          )}
        </div>

        {/* SEO Description */}
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label
              htmlFor="gallery-seo-description"
              className="text-sm font-semibold text-[#0F172A]"
            >
              SEO Description
            </label>

            <span className="text-xs text-[#94A3B8]">
              Max 160 characters
            </span>
          </div>

          <textarea
            id="gallery-seo-description"
            rows={4}
            maxLength={160}
            placeholder="Describe this gallery image naturally for search engines..."
            {...register("seoDescription")}
            aria-invalid={Boolean(
              errors.seoDescription,
            )}
            aria-describedby={
              errors.seoDescription
                ? "gallery-seo-description-error"
                : "gallery-seo-description-help"
            }
            className={`w-full resize-y rounded-lg border px-3 py-3 text-sm leading-6 text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.seoDescription
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.seoDescription ? (
            <p
              id="gallery-seo-description-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.seoDescription.message}
            </p>
          ) : (
            <p
              id="gallery-seo-description-help"
              className="mt-1.5 text-xs leading-5 text-[#64748B]"
            >
              Keep it natural, descriptive and relevant to the actual image.
            </p>
          )}
        </div>

        {/* SEO Note */}
        <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
          <p className="text-xs leading-5 text-blue-800">
            SEO fields are optional. If you leave them empty, the public
            gallery can fall back to the title and image description.
          </p>
        </div>
      </div>
    </section>
  );
}