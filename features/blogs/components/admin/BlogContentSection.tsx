"use client";

import { AlignLeft } from "lucide-react";
import type {
  Control,
  FieldErrors,
} from "react-hook-form";
import { Controller } from "react-hook-form";

import Editor from "@/components/editor/Editor";

import type { BlogFormValues } from "@/features/blogs/schemas/blog-schema";

interface BlogContentSectionProps {
  control: Control<BlogFormValues>;
  errors: FieldErrors<BlogFormValues>;
}

export default function BlogContentSection({
  control,
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

      {/* Content */}
      <div className="p-5 sm:p-6">
        <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
          Content
          <span className="ml-1 text-red-500">*</span>
        </label>

        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <Editor
              value={field.value ?? ""}
              onChange={field.onChange}
            />
          )}
        />

        {errors.content ? (
          <p
            id="blog-content-error"
            role="alert"
            className="mt-2 text-xs font-medium text-red-600"
          >
            {errors.content.message}
          </p>
        ) : (
          <p className="mt-2 text-xs leading-5 text-[#64748B]">
            Use headings, lists, links, images and other rich formatting to
            create a useful article.
          </p>
        )}
      </div>
    </section>
  );
}