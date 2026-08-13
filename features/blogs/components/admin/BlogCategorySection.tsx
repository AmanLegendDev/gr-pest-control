"use client";

import { useEffect, useState } from "react";
import { FolderOpen, ListOrdered, Tags } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import type { BlogFormValues } from "@/features/blogs/schemas/blog-schema";

interface BlogCategorySectionProps {
  register: UseFormRegister<BlogFormValues>;
  setValue: UseFormSetValue<BlogFormValues>;
  watch: UseFormWatch<BlogFormValues>;
  errors: FieldErrors<BlogFormValues>;
}

export default function BlogCategorySection({
  register,
  setValue,
  watch,
  errors,
}: BlogCategorySectionProps) {
  const tags = watch("tags");

  const [tagsInput, setTagsInput] = useState(
    tags?.join(", ") ?? "",
  );

  useEffect(() => {
    setTagsInput(tags?.join(", ") ?? "");
  }, [tags]);

  const handleTagsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    setTagsInput(value);

    const parsedTags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .filter(
        (tag, index, array) =>
          array.findIndex(
            (item) => item.toLowerCase() === tag.toLowerCase(),
          ) === index,
      );

    setValue("tags", parsedTags, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

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
              Organization
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Organize the article and control its display order.
            </p>
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="grid gap-5 p-5 sm:p-2 sm:grid-cols-2 sm:p-6">
        {/* Category */}
        <div>
          <label
            htmlFor="blog-category"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F172A]"
          >
            <FolderOpen
              size={16}
              aria-hidden="true"
            />

            Category
          </label>

          <input
            id="blog-category"
            type="text"
            maxLength={100}
            placeholder="e.g. Pest Prevention"
            {...register("category")}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={
              errors.category
                ? "blog-category-error"
                : "blog-category-help"
            }
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.category
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.category ? (
            <p
              id="blog-category-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.category.message}
            </p>
          ) : (
            <p
              id="blog-category-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Use a clear category that describes the article.
            </p>
          )}
        </div>

        {/* Sort Order */}
        <div>
          <label
            htmlFor="blog-sort-order"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F172A]"
          >
            <ListOrdered
              size={16}
              aria-hidden="true"
            />

            Sort Order
          </label>

          <input
            id="blog-sort-order"
            type="number"
            min={0}
            step={1}
            {...register("sortOrder", {
              valueAsNumber: true,
            })}
            aria-invalid={Boolean(errors.sortOrder)}
            aria-describedby={
              errors.sortOrder
                ? "blog-sort-order-error"
                : "blog-sort-order-help"
            }
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition focus:ring-2 ${
              errors.sortOrder
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.sortOrder ? (
            <p
              id="blog-sort-order-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.sortOrder.message}
            </p>
          ) : (
            <p
              id="blog-sort-order-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Lower numbers can appear earlier in ordered listings.
            </p>
          )}
        </div>

        {/* Tags */}
        <div className="sm:col-span-2">
          <label
            htmlFor="blog-tags"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F172A]"
          >
            <Tags
              size={16}
              aria-hidden="true"
            />

            Tags
          </label>

          <input
            id="blog-tags"
            type="text"
            maxLength={1300}
            value={tagsInput}
            onChange={handleTagsChange}
            placeholder="e.g. pest control, prevention, home care"
            aria-invalid={Boolean(errors.tags)}
            aria-describedby={
              errors.tags
                ? "blog-tags-error"
                : "blog-tags-help"
            }
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.tags
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.tags ? (
            <p
              id="blog-tags-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {Array.isArray(errors.tags)
                ? errors.tags
                    .map((error) => error?.message)
                    .filter(Boolean)
                    .join(", ")
                : errors.tags.message}
            </p>
          ) : (
            <p
              id="blog-tags-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Separate tags with commas. Up to 20 tags can be added.
            </p>
          )}

          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.toLowerCase()}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-[#475569]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}