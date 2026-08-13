"use client";

import { ImageIcon, Loader2, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import type { UseFormRegister, UseFormSetValue } from "react-hook-form";

import type { ServiceAreaFormValues } from "@/features/service-areas/schemas/service-area-schema";

interface ServiceAreaImageSectionProps {
  register: UseFormRegister<ServiceAreaFormValues>;
  setValue: UseFormSetValue<ServiceAreaFormValues>;
  image?: ServiceAreaFormValues["image"];
  altError?: string;
}

interface UploadResponse {
  success: boolean;
  message?: string;
  image?: {
    url: string;
    publicId: string;
  };
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export default function ServiceAreaImageSection({
  register,
  setValue,
  image,
  altError,
}: ServiceAreaImageSectionProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleChooseImage = () => {
    if (isUploading) return;

    inputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");

    if (!ALLOWED_TYPES.has(file.type)) {
      setError("Only JPG, PNG and WebP images are allowed.");

      event.target.value = "";
      return;
    }

    if (file.size <= 0) {
      setError("The selected image is empty.");

      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Image size must be 5MB or less.");

      event.target.value = "";
      return;
    }

    try {
      setIsUploading(true);

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
        "image",
        {
          url: data.image.url,
          publicId: data.image.publicId,
          alt: image?.alt ?? "",
        },
        {
          shouldDirty: true,
          shouldValidate: true,
        },
      );
    } catch (uploadError) {
      console.error("SERVICE_AREA_IMAGE_UPLOAD_ERROR", uploadError);

      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Unable to upload image right now. Please try again.",
      );
    } finally {
      setIsUploading(false);

      event.target.value = "";
    }
  };

  const handleRemoveImage = () => {
    if (isUploading) return;

    setValue("image", undefined, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <ImageIcon size={19} aria-hidden="true" />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Area Image
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Add a primary image representing this service area.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={handleFileChange}
          disabled={isUploading}
          aria-label="Choose service area image"
        />

        {image?.url ? (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={image.alt || "Service area preview"}
                className="h-full w-full object-cover"
              />

              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/50">
                  <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#0F172A] shadow-lg">
                    <Loader2
                      size={17}
                      className="animate-spin text-[#0878E8]"
                      aria-hidden="true"
                    />
                    Uploading...
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#0F172A]">
                  Image uploaded
                </p>

                <p className="mt-1 truncate text-xs text-[#64748B]">
                  {image.publicId}
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={handleChooseImage}
                  disabled={isUploading}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-[#0F172A] transition hover:border-[#0878E8] hover:text-[#0878E8] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Upload size={16} aria-hidden="true" />
                  Replace
                </button>

                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={isUploading}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 size={16} aria-hidden="true" />
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
            className="flex min-h-52 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 text-center transition hover:border-[#0878E8] hover:bg-blue-50/40 disabled:cursor-not-allowed disabled:opacity-60"
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
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-[#0878E8]">
                  <Upload size={22} aria-hidden="true" />
                </div>

                <span className="mt-4 text-sm font-semibold text-[#0F172A]">
                  Upload service area image
                </span>

                <span className="mt-1 text-xs text-[#64748B]">
                  JPG, PNG or WebP · Maximum 5MB
                </span>
              </>
            )}
          </button>
        )}

        {error && (
          <p
            role="alert"
            className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
          >
            {error}
          </p>
        )}

        {/* Alt text */}
        <div className="mt-5">
          <label
            htmlFor="image-alt"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Image Alt Text
            {image?.url && <span className="text-red-500"> *</span>}
          </label>

          <input
            id="image-alt"
            type="text"
            placeholder="Describe the image for accessibility"
            {...register("image.alt")}
            aria-invalid={Boolean(altError)}
            aria-describedby={altError ? "image-alt-error" : "image-alt-help"}
            disabled={!image?.url}
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 ${
              altError
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {altError ? (
            <p
              id="image-alt-error"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {altError}
            </p>
          ) : (
            <p
              id="image-alt-help"
              className="mt-1.5 text-xs text-[#64748B]"
            >
              Describe what the image actually shows. Avoid keyword stuffing.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}