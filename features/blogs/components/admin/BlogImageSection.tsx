"use client";

import { useRef, useState } from "react";
import {
  ImageIcon,
  Loader2,
  Upload,
  Trash2,
} from "lucide-react";

import {
  useWatch,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";

import type { BlogFormValues } from "@/features/blogs/schemas/blog-schema";

interface BlogImageSectionProps {
  control: Control<BlogFormValues>;
  register: UseFormRegister<BlogFormValues>;
  setValue: UseFormSetValue<BlogFormValues>;
  errors: FieldErrors<BlogFormValues>;
}

interface UploadResponse {
  success: boolean;
  message?: string;
  image?: {
    url: string;
    publicId: string;
  };
}

export default function BlogImageSection({
  control,
  register,
  setValue,
  errors,
}: BlogImageSectionProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const featuredImage = useWatch({
    control,
    name: "featuredImage",
  });

  const handleChooseImage = () => {
    if (isUploading) {
      return;
    }

    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/admin/cloudinary/upload", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type") ?? "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          "The image upload service returned an unexpected response.",
        );
      }

      const data = (await response.json()) as UploadResponse;

      if (!response.ok || !data.success || !data.image) {
        throw new Error(
          data.message ?? "Unable to upload the image.",
        );
      }

      setValue(
        "featuredImage",
        {
          url: data.image.url,
          publicId: data.image.publicId,
          alt: featuredImage?.alt ?? "",
        },
        {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        },
      );
    } catch (error) {
      console.error("BLOG_IMAGE_UPLOAD_ERROR", error);

      setUploadError(
        error instanceof Error
          ? error.message
          : "Unable to upload the image right now. Please try again.",
      );
    } finally {
      setIsUploading(false);

      // Allows selecting the same file again after an error/replacement.
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = () => {
    setValue("featuredImage", undefined, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setUploadError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <ImageIcon
              size={19}
              aria-hidden="true"
            />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Featured Image
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Add the primary image that will represent this blog article.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 p-5 sm:p-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Choose blog featured image"
        />

        {/* Preview / Upload */}
        {featuredImage?.url ? (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
              <img
                src={featuredImage.url}
                alt={
                  featuredImage.alt ||
                  "Blog featured image preview"
                }
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#0F172A]">
                  Image uploaded
                </p>

                <p className="mt-1 truncate text-xs text-[#64748B]">
                  Cloudinary image ready for this blog.
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={handleChooseImage}
                  disabled={isUploading}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-[#0F172A] transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Upload
                    size={16}
                    aria-hidden="true"
                  />

                  Replace
                </button>

                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={isUploading}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700 transition hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Trash2
                    size={16}
                    aria-hidden="true"
                  />

                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleChooseImage}
            disabled={isUploading}
            className="flex min-h-56 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 text-center transition hover:border-[#0878E8] hover:bg-blue-50/30 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isUploading ? (
              <>
                <Loader2
                  size={32}
                  className="animate-spin text-[#0878E8]"
                  aria-hidden="true"
                />

                <span className="mt-3 text-sm font-semibold text-[#0F172A]">
                  Uploading image...
                </span>

                <span className="mt-1 text-xs text-[#64748B]">
                  Please wait while the image is uploaded.
                </span>
              </>
            ) : (
              <>
                <Upload
                  size={32}
                  className="text-slate-400"
                  aria-hidden="true"
                />

                <span className="mt-3 text-sm font-semibold text-[#0F172A]">
                  Upload featured image
                </span>

                <span className="mt-1 text-xs text-[#64748B]">
                  JPG, PNG or WebP · Maximum 5MB
                </span>

                <span className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-[#0878E8] px-4 text-sm font-semibold text-white">
                  Choose Image
                </span>
              </>
            )}
          </button>
        )}

        {uploadError && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {uploadError}
          </div>
        )}

        {/* Alt Text */}
        <div>
          <label
            htmlFor="blog-featured-image-alt"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Image Alt Text
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="blog-featured-image-alt"
            type="text"
            maxLength={160}
            placeholder="Describe the image accurately"
            {...register("featuredImage.alt")}
            aria-invalid={Boolean(errors.featuredImage?.alt)}
            aria-describedby={
              errors.featuredImage?.alt
                ? "blog-featured-image-alt-error"
                : "blog-featured-image-alt-help"
            }
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.featuredImage?.alt
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.featuredImage?.alt ? (
            <p
              id="blog-featured-image-alt-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.featuredImage.alt.message}
            </p>
          ) : (
            <p
              id="blog-featured-image-alt-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Describe what is actually shown in the image. Avoid keyword stuffing.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}