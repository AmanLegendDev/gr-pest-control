"use client";

import { Eye, Send, Star } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { BlogFormValues } from "@/features/blogs/schemas/blog-schema";

interface BlogPublishingSectionProps {
  register: UseFormRegister<BlogFormValues>;
  errors: FieldErrors<BlogFormValues>;
}

export default function BlogPublishingSection({
  register,
  errors,
}: BlogPublishingSectionProps) {
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
              Choose whether this article should be published or kept as a
              draft.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4 p-5 sm:p-6">
        {/* Published */}
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-[#0878E8] hover:bg-blue-50/30">
          <input
            type="checkbox"
            {...register("published")}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-[#0878E8] focus:ring-2 focus:ring-blue-200"
          />

          <span className="min-w-0">
            <span className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
              <Eye
                size={16}
                aria-hidden="true"
              />

              Published
            </span>

            <span className="mt-1 block text-xs leading-5 text-[#64748B]">
              Published articles can appear on the public blog. Leave this
              unchecked to save the article as a draft.
            </span>
          </span>
        </label>

        {/* Featured */}
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-amber-400 hover:bg-amber-50/30">
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

              Featured Article
            </span>

            <span className="mt-1 block text-xs leading-5 text-[#64748B]">
              Mark this article as featured for prominent placements on the
              website.
            </span>
          </span>
        </label>

        {errors.published && (
          <p
            role="alert"
            className="text-xs font-medium text-red-600"
          >
            {errors.published.message}
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