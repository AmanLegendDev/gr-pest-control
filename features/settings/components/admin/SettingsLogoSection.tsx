"use client";

import { useRef, useState } from "react";
import {
  ImageIcon,
  Loader2,
  Trash2,
  Upload,
} from "lucide-react";
import {
  useWatch,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";

import type { SiteSettingsFormValues } from "@/features/settings/schemas/site-settings-schema";

interface SettingsLogoSectionProps {
  control: Control<SiteSettingsFormValues>;
  register: UseFormRegister<SiteSettingsFormValues>;
  setValue: UseFormSetValue<SiteSettingsFormValues>;
  errors: FieldErrors<SiteSettingsFormValues>;
}

interface UploadResponse {
  success: boolean;
  message?: string;
  image?: {
    url: string;
    publicId: string;
  };
}

export default function SettingsLogoSection({
  control,
  register,
  setValue,
  errors,
}: SettingsLogoSectionProps) {
  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const [isUploading, setIsUploading] =
    useState(false);

  const [uploadError, setUploadError] =
    useState<string | null>(null);

  const logo = useWatch({
    control,
    name: "logo",
  });

  const handleChooseLogo = () => {
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

      const response = await fetch(
        "/api/admin/cloudinary/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const contentType =
        response.headers.get("content-type") ?? "";

      if (
        !contentType.includes("application/json")
      ) {
        throw new Error(
          "The image upload service returned an unexpected response.",
        );
      }

      const data =
        (await response.json()) as UploadResponse;

      if (
        !response.ok ||
        !data.success ||
        !data.image
      ) {
        throw new Error(
          data.message ??
            "Unable to upload the logo.",
        );
      }

      setValue(
        "logo",
        {
          url: data.image.url,
          publicId: data.image.publicId,
          alt: logo?.alt ?? "",
        },
        {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        },
      );
    } catch (error) {
      console.error(
        "SITE_LOGO_UPLOAD_ERROR",
        error,
      );

      setUploadError(
        error instanceof Error
          ? error.message
          : "Unable to upload the logo right now. Please try again.",
      );
    } finally {
      setIsUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveLogo = () => {
    setValue("logo", undefined, {
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
              Business Logo
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Upload the main logo used across the website.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Choose business logo"
        />

        {/* Preview */}
        {logo?.url ? (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <div className="flex min-h-52 items-center justify-center bg-slate-100 p-6">
              <img
                src={logo.url}
                alt={
                  logo.alt ||
                  "Business logo"
                }
                className="max-h-40 max-w-full object-contain"
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#0F172A]">
                  Logo uploaded
                </p>

                <p className="mt-1 truncate text-xs text-[#64748B]">
                  The logo is ready to be saved with your settings.
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={handleChooseLogo}
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
                  onClick={handleRemoveLogo}
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
            onClick={handleChooseLogo}
            disabled={isUploading}
            className="flex min-h-52 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 text-center transition hover:border-[#0878E8] hover:bg-blue-50/30 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isUploading ? (
              <>
                <Loader2
                  size={30}
                  className="animate-spin text-[#0878E8]"
                  aria-hidden="true"
                />

                <span className="mt-3 text-sm font-semibold text-[#0F172A]">
                  Uploading logo...
                </span>

                <span className="mt-1 text-xs text-[#64748B]">
                  Please wait.
                </span>
              </>
            ) : (
              <>
                <Upload
                  size={30}
                  className="text-slate-400"
                  aria-hidden="true"
                />

                <span className="mt-3 text-sm font-semibold text-[#0F172A]">
                  Upload business logo
                </span>

                <span className="mt-1 text-xs text-[#64748B]">
                  JPG, PNG or WebP · Maximum 5MB
                </span>

                <span className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-[#0878E8] px-4 text-sm font-semibold text-white">
                  Choose Logo
                </span>
              </>
            )}
          </button>
        )}

        {/* Upload Error */}
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
            htmlFor="settings-logo-alt"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Logo Alt Text
            {logo?.url && (
              <span className="ml-1 text-red-500">
                *
              </span>
            )}
          </label>

          <input
            id="settings-logo-alt"
            type="text"
            maxLength={160}
            placeholder="e.g. GR Pest Control logo"
            {...register("logo.alt")}
            aria-invalid={Boolean(
              errors.logo?.alt,
            )}
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.logo?.alt
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.logo?.alt ? (
            <p
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {errors.logo.alt.message}
            </p>
          ) : (
            <p className="mt-1.5 text-xs text-[#64748B]">
              Describe the logo briefly for accessibility.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}