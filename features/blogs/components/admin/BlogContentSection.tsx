"use client";

import { AlignLeft } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { BlogFormValues } from "@/features/blogs/schemas/blog-schema";

interface BlogContentSectionProps {
  register: UseFormRegister<BlogFormValues>;
  errors: FieldErrors<BlogFormValues>;
}

export default function BlogContentSection({
  register,
  errors,
}: BlogContentSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <AlignLeft
              size={19}
              aria-hidden="true"
            />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Article Content
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Write the complete article content that customers will read.
            </p>
          </div>
        </div>
      </div>

      {/* Content field */}
      <div className="p-5 sm:p-6">
        <label
          htmlFor="blog-content"
          className="mb-2 block text-sm font-semibold text-[#0F172A]"
        >
          Content
          <span className="ml-1 text-red-500">*</span>
        </label>

        <textarea
          id="blog-content"
          rows={18}
          placeholder="Write the full article here..."
          {...register("content")}
          aria-invalid={Boolean(errors.content)}
          aria-describedby={
            errors.content
              ? "blog-content-error"
              : "blog-content-help"
          }
          className={`min-h-[420px] w-full resize-y rounded-xl border px-4 py-3 text-sm leading-7 text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
            errors.content
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
          }`}
        />

        {errors.content ? (
          <p
            id="blog-content-error"
            role="alert"
            className="mt-1.5 text-xs font-medium text-red-600"
          >
            {errors.content.message}
          </p>
        ) : (
          <p
            id="blog-content-help"
            className="mt-1.5 text-xs leading-5 text-[#64748B]"
          >
            Keep the article useful, accurate and genuinely helpful.
            Rich-text editing can be connected here later.
          </p>
        )}
      </div>
    </section>
  );
}