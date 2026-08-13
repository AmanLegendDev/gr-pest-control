"use client";
import { useState } from "react";
import {
   ImageIcon,
  Loader2,
  Trash2,
  Upload,
} from "lucide-react";

import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import type { CreateServiceInput } from "../../schemas/service-schema";

type Props = {
  register: UseFormRegister<CreateServiceInput>;
  setValue: UseFormSetValue<CreateServiceInput>;
  watch: UseFormWatch<CreateServiceInput>;
  errors: FieldErrors<CreateServiceInput>;
};

export default function ServiceImageSection({
  register,
  setValue,
  watch,
  errors,
}: Props) {


    const [isUploading, setIsUploading] = useState(false);
  const heroImage = watch("heroImage");


const handleImageUpload = async (
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  const file = event.target.files?.[0];

  if (!file) {
    return;
  }

  setIsUploading(true);

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/api/admin/cloudinary/upload", {
      method: "POST",
      body: formData,
    });

    const result: {
      success: boolean;
      message?: string;
      image?: {
        url: string;
        publicId: string;
      };
    } = await response.json();

    if (!response.ok || !result.success || !result.image) {
      throw new Error(
        result.message ?? "Unable to upload image.",
      );
    }

    setValue(
      "heroImage",
      {
        url: result.image.url,
        publicId: result.image.publicId,
        alt: "",
      },
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  } catch (error) {
    console.error("SERVICE_IMAGE_UPLOAD_ERROR", error);

    window.alert(
      error instanceof Error
        ? error.message
        : "Unable to upload image. Please try again.",
    );
  } finally {
    setIsUploading(false);
    event.target.value = "";
  }
};
  const removeImage = () => {
    setValue("heroImage", undefined, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };


  

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <ImageIcon size={19} />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Service Image
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Upload the primary image that will represent this service.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {heroImage?.url ? (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={heroImage.url}
                alt={heroImage.alt || "Service preview"}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#0F172A]">
                  Image uploaded
                </p>

                <p className="mt-1 truncate text-xs text-[#64748B]">
                  Cloudinary image ready to save with this service.
                </p>
              </div>

              <button
                type="button"
                onClick={removeImage}
                className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor="serviceImage"
            className="flex min-h-56 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-[#0878E8] hover:bg-blue-50/40"
          >
            <div className="px-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-[#0878E8]">
                <Upload size={22} />
              </div>

              <p className="mt-4 text-sm font-semibold text-[#0F172A]">
                Upload service image
              </p>

              <p className="mt-1 text-xs leading-5 text-[#64748B]">
                JPG, PNG or WebP · Maximum 5MB
              </p>

              <span className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0878E8] px-4 text-sm font-semibold text-white">
                <Upload size={16} />
                Choose Image
              </span>
            </div>

            <input
              id="serviceImage"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={handleImageUpload}
              disabled={isUploading}
            />

            {isUploading ? (
  <>
    <Loader2 size={16} className="animate-spin" />
    Uploading...
  </>
) : (
  <>
    <Upload size={16} />
    Choose Image
  </>
)}
          </label>
        )}

        {/* ALT TEXT */}
        <div className="mt-5">
          <label
            htmlFor="heroImageAlt"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Image Alt Text
          </label>

          <input
            id="heroImageAlt"
            type="text"
            placeholder="Describe what the image shows"
            {...register("heroImage.alt")}
            disabled={!heroImage?.url}
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          />

          <p className="mt-1.5 text-xs text-[#64748B]">
            Use a natural description for accessibility and image SEO.
          </p>

          {errors.heroImage?.alt?.message && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.heroImage.alt.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}