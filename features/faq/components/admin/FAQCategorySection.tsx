"use client";

import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { FolderOpen, ListOrdered } from "lucide-react";

import type { FAQFormValues } from "@/features/faq/schemas/faq-schema";

interface FAQCategorySectionProps {
  register: UseFormRegister<FAQFormValues>;
  errors: FieldErrors<FAQFormValues>;
}

export default function FAQCategorySection({
  register,
  errors,
}: FAQCategorySectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <FolderOpen size={19} aria-hidden="true" />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Organization
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Organize this FAQ and control its display order.
            </p>
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
        {/* Category */}
        <div>
          <label
            htmlFor="faq-category"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Category
          </label>

          <input
            id="faq-category"
            type="text"
            placeholder="e.g. General Pest Control"
            {...register("category")}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={
              errors.category
                ? "faq-category-error"
                : "faq-category-help"
            }
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.category
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.category ? (
            <p
              id="faq-category-error"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.category.message}
            </p>
          ) : (
            <p
              id="faq-category-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Optional. Use a clear category if this FAQ belongs to a group.
            </p>
          )}
        </div>

        {/* Sort Order */}
        <div>
          <label
            htmlFor="faq-sort-order"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F172A]"
          >
            <ListOrdered size={16} aria-hidden="true" />
            Sort Order
          </label>

          <input
            id="faq-sort-order"
            type="number"
            min={0}
            step={1}
            {...register("sortOrder", {
              valueAsNumber: true,
            })}
            aria-invalid={Boolean(errors.sortOrder)}
            aria-describedby={
              errors.sortOrder
                ? "faq-sort-order-error"
                : "faq-sort-order-help"
            }
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition focus:ring-2 ${
              errors.sortOrder
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.sortOrder ? (
            <p
              id="faq-sort-order-error"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.sortOrder.message}
            </p>
          ) : (
            <p
              id="faq-sort-order-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Lower numbers appear earlier in the FAQ list.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}