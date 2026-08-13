"use client";

import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { FileText } from "lucide-react";

import type { BlogFormValues } from "@/features/blogs/schemas/blog-schema";

interface BlogBasicSectionProps {
  register: UseFormRegister<BlogFormValues>;
  errors: FieldErrors<BlogFormValues>;
}

export default function BlogBasicSection({
  register,
  errors,
}: BlogBasicSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <FileText size={19} aria-hidden="true" />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Blog Details
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Add the main information for this article.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {/* Title */}
        <div>
          <label
            htmlFor="blog-title"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Blog Title
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="blog-title"
            type="text"
            placeholder="e.g. 7 Signs You May Have a Pest Problem"
            {...register("title")}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={
              errors.title
                ? "blog-title-error"
                : "blog-title-help"
            }
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.title
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.title ? (
            <p
              id="blog-title-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.title.message}
            </p>
          ) : (
            <p
              id="blog-title-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Use a clear, useful title that accurately describes the article.
            </p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label
            htmlFor="blog-slug"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            URL Slug
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="blog-slug"
            type="text"
            placeholder="e.g. signs-of-pest-problem"
            {...register("slug")}
            aria-invalid={Boolean(errors.slug)}
            aria-describedby={
              errors.slug
                ? "blog-slug-error"
                : "blog-slug-help"
            }
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.slug
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.slug ? (
            <p
              id="blog-slug-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.slug.message}
            </p>
          ) : (
            <p
              id="blog-slug-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Lowercase letters, numbers and hyphens only. Keep published slugs stable.
            </p>
          )}
        </div>

        {/* Excerpt */}
        <div>
          <label
            htmlFor="blog-excerpt"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Excerpt
            <span className="ml-1 text-red-500">*</span>
          </label>

          <textarea
            id="blog-excerpt"
            rows={4}
            maxLength={500}
            placeholder="Write a short summary of what readers will learn..."
            {...register("excerpt")}
            aria-invalid={Boolean(errors.excerpt)}
            aria-describedby={
              errors.excerpt
                ? "blog-excerpt-error"
                : "blog-excerpt-help"
            }
            className={`w-full resize-y rounded-lg border px-3 py-3 text-sm leading-6 text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.excerpt
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.excerpt ? (
            <p
              id="blog-excerpt-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.excerpt.message}
            </p>
          ) : (
            <p
              id="blog-excerpt-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              A concise summary for blog cards and previews. Maximum 500 characters.
            </p>
          )}
        </div>

        {/* Author */}
        <div>
          <label
            htmlFor="blog-author"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Author
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="blog-author"
            type="text"
            placeholder="e.g. GR Pest Control"
            {...register("author")}
            aria-invalid={Boolean(errors.author)}
            aria-describedby={
              errors.author
                ? "blog-author-error"
                : "blog-author-help"
            }
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.author
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.author ? (
            <p
              id="blog-author-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.author.message}
            </p>
          ) : (
            <p
              id="blog-author-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Use the actual author or business identity. Do not add fake credentials.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}