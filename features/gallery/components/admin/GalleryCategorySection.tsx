"use client";

import {
  FolderOpen,
  ListOrdered,
} from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { GalleryFormValues } from "@/features/gallery/schemas/gallery-schema";

interface GalleryCategorySectionProps {
  register: UseFormRegister<GalleryFormValues>;
  errors: FieldErrors<GalleryFormValues>;
}

const CATEGORY_OPTIONS = [
  {
    value: "home",
    label: "Home",
    description: "Pest-control work completed in homes.",
  },
  {
    value: "workplace",
    label: "Workplace",
    description: "Offices and workplace environments.",
  },
  {
    value: "commercial",
    label: "Commercial",
    description: "Shops, businesses and commercial properties.",
  },
  {
    value: "residential",
    label: "Residential",
    description: "Residential properties and housing.",
  },
  {
    value: "treatment",
    label: "Pest Treatment",
    description: "Treatment and pest-control work.",
  },
  {
    value: "team",
    label: "Our Team",
    description: "Team members and field work.",
  },
  {
    value: "other",
    label: "Other",
    description: "Other relevant gallery content.",
  },
] as const;

export default function GalleryCategorySection({
  register,
  errors,
}: GalleryCategorySectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <FolderOpen
              size={19}
              aria-hidden="true"
            />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Gallery Organization
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Choose where this image belongs and control its display order.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-[1fr_220px] sm:p-6">
        {/* Category */}
        <div>
          <label
            htmlFor="gallery-category"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F172A]"
          >
            <FolderOpen
              size={16}
              aria-hidden="true"
            />

            Category

            <span className="text-red-500">*</span>
          </label>

          <select
            id="gallery-category"
            {...register("category")}
            aria-invalid={Boolean(
              errors.category,
            )}
            aria-describedby={
              errors.category
                ? "gallery-category-error"
                : "gallery-category-help"
            }
            className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-[#0F172A] outline-none transition focus:ring-2 ${
              errors.category
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          >
            <option value="">
              Select gallery category
            </option>

            {CATEGORY_OPTIONS.map(
              (category) => (
                <option
                  key={category.value}
                  value={category.value}
                >
                  {category.label}
                </option>
              ),
            )}
          </select>

          {errors.category ? (
            <p
              id="gallery-category-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.category.message}
            </p>
          ) : (
            <p
              id="gallery-category-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Select the category that best describes this image.
            </p>
          )}

          {/* Category descriptions */}
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORY_OPTIONS.map(
              (category) => (
                <div
                  key={category.value}
                  className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2"
                >
                  <p className="text-xs font-semibold text-[#334155]">
                    {category.label}
                  </p>

                  <p className="mt-0.5 text-[11px] leading-4 text-[#64748B]">
                    {category.description}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Sort Order */}
        <div>
          <label
            htmlFor="gallery-sort-order"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F172A]"
          >
            <ListOrdered
              size={16}
              aria-hidden="true"
            />

            Sort Order
          </label>

          <input
            id="gallery-sort-order"
            type="number"
            min={0}
            step={1}
            {...register("sortOrder", {
              valueAsNumber: true,
            })}
            aria-invalid={Boolean(
              errors.sortOrder,
            )}
            aria-describedby={
              errors.sortOrder
                ? "gallery-sort-order-error"
                : "gallery-sort-order-help"
            }
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition focus:ring-2 ${
              errors.sortOrder
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.sortOrder ? (
            <p
              id="gallery-sort-order-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.sortOrder.message}
            </p>
          ) : (
            <p
              id="gallery-sort-order-help"
              className="mt-1.5 text-xs leading-5 text-[#64748B]"
            >
              Lower numbers appear earlier when the gallery is manually sorted.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}