"use client";

import { Search } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { BlogFormValues } from "@/features/blogs/schemas/blog-schema";

interface BlogSEOSectionProps {
  register: UseFormRegister<BlogFormValues>;
  errors: FieldErrors<BlogFormValues>;
}

export default function BlogSEOSection({
  register,
  errors,
}: BlogSEOSectionProps) {
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
              Configure search-engine metadata for this article.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {/* SEO Title */}
        <div>
          <label
            htmlFor="blog-seo-title"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            SEO Title
          </label>

          <input
            id="blog-seo-title"
            type="text"
            maxLength={70}
            placeholder="Leave blank to use the blog title"
            {...register("seoTitle")}
            aria-invalid={Boolean(errors.seoTitle)}
            aria-describedby={
              errors.seoTitle
                ? "blog-seo-title-error"
                : "blog-seo-title-help"
            }
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.seoTitle
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.seoTitle ? (
            <p
              id="blog-seo-title-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.seoTitle.message}
            </p>
          ) : (
            <p
              id="blog-seo-title-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Keep the title concise and relevant. Maximum 70 characters.
            </p>
          )}
        </div>

        {/* SEO Description */}
        <div>
          <label
            htmlFor="blog-seo-description"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            SEO Description
          </label>

          <textarea
            id="blog-seo-description"
            rows={4}
            maxLength={160}
            placeholder="Write a concise description for search engines..."
            {...register("seoDescription")}
            aria-invalid={Boolean(errors.seoDescription)}
            aria-describedby={
              errors.seoDescription
                ? "blog-seo-description-error"
                : "blog-seo-description-help"
            }
            className={`w-full resize-y rounded-lg border px-3 py-3 text-sm leading-6 text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.seoDescription
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.seoDescription ? (
            <p
              id="blog-seo-description-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.seoDescription.message}
            </p>
          ) : (
            <p
              id="blog-seo-description-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Describe the article naturally and accurately. Maximum 160
              characters.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}