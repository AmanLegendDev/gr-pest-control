"use client";

import { useState } from "react";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import BlogBasicSection from "@/features/blogs/components/admin/BlogBasicSection";
import BlogImageSection from "@/features/blogs/components/admin/BlogImageSection";
import BlogContentSection from "@/features/blogs/components/admin/BlogContentSection";
import BlogCategorySection from "@/features/blogs/components/admin/BlogCategorySection";
import BlogSEOSection from "@/features/blogs/components/admin/BlogSEOSection";
import BlogPublishingSection from "@/features/blogs/components/admin/BlogPublishingSection";

import {
    BlogFormInput,
  blogSchema,
  type BlogFormValues,
} from "@/features/blogs/schemas/blog-schema";

import { createBlog } from "@/features/blogs/actions/createBlog";

const DEFAULT_VALUES: BlogFormInput = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  tags: [],
  author: "",
  featuredImage: undefined,
  seoTitle: "",
  seoDescription: "",
  featured: false,
  published: false,
  publishedAt: undefined,
  sortOrder: 0,
};

export default function BlogForm() {
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

const form = useForm<
  BlogFormInput,
  unknown,
  BlogFormValues
>({
  resolver: zodResolver(blogSchema),
  defaultValues: DEFAULT_VALUES,
  mode: "onBlur",
});

  const {
    control,
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const onSubmit = async (values: BlogFormValues) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const result = await createBlog(values);

      if (!result.success) {
        setServerError(result.message);

        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(
            ([field, messages]) => {
              if (!messages?.length) {
                return;
              }

              setError(field as keyof BlogFormValues, {
                type: "server",
                message: messages[0],
              });
            },
          );
        }

        return;
      }

      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      console.error("CREATE_BLOG_FORM_ERROR", error);

      setServerError(
        "Unable to create the blog right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="pb-28"
    >
      <div className="space-y-6">
        {/* Basic */}
        <BlogBasicSection
          register={register}
          errors={errors}
        />

        {/* Featured Image */}
        <BlogImageSection
          control={control}
          register={register}
          setValue={setValue}
          errors={errors}
        />

        {/* Content */}
        <BlogContentSection
          register={register}
          errors={errors}
        />

        {/* Category / Tags / Sort */}
        <BlogCategorySection
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
        />

        {/* SEO */}
        <BlogSEOSection
          register={register}
          errors={errors}
        />

        {/* Publishing */}
        <BlogPublishingSection
          register={register}
          errors={errors}
        />

        {/* Server Error */}
        {serverError && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {serverError}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="sticky bottom-0 z-20 mt-8 border-t border-slate-200 bg-white/95 px-4 py-4 shadow-[0_-4px_20px_rgba(15,23,42,0.06)] backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Cancel */}
          <Link
            href="/admin/blogs"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-[#0F172A] transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <ArrowLeft
              size={16}
              aria-hidden="true"
            />

            Cancel
          </Link>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0878E8] px-6 text-sm font-semibold text-white transition hover:bg-[#066BCF] focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                  aria-hidden="true"
                />

                Creating...
              </>
            ) : (
              <>
                <Save
                  size={17}
                  aria-hidden="true"
                />

                Create Blog
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}