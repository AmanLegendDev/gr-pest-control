"use client";

import {
  Globe2,
  Link as LinkIcon,
  Share2,
} from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { SiteSettingsFormValues } from "@/features/settings/schemas/site-settings-schema";

interface SettingsSocialSectionProps {
  register: UseFormRegister<SiteSettingsFormValues>;
  errors: FieldErrors<SiteSettingsFormValues>;
}

export default function SettingsSocialSection({
  register,
  errors,
}: SettingsSocialSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <LinkIcon
              size={19}
              aria-hidden="true"
            />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Social & Business Links
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Add your official social media and business profile links.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {/* Facebook */}
        <div>
          <label
            htmlFor="settings-facebook"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F172A]"
          >
            <Globe2
              size={16}
              aria-hidden="true"
            />

            Facebook
          </label>

          <input
            id="settings-facebook"
            type="url"
            placeholder="https://facebook.com/yourbusiness"
            {...register("socialLinks.facebook")}
            aria-invalid={Boolean(
              errors.socialLinks?.facebook,
            )}
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.socialLinks?.facebook
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.socialLinks?.facebook && (
            <p
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {
                errors.socialLinks.facebook
                  .message
              }
            </p>
          )}
        </div>

        {/* Instagram */}
        <div>
          <label
            htmlFor="settings-instagram"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F172A]"
          >
            <Globe2
              size={16}
              aria-hidden="true"
            />

            Instagram
          </label>

          <input
            id="settings-instagram"
            type="url"
            placeholder="https://instagram.com/yourbusiness"
            {...register("socialLinks.instagram")}
            aria-invalid={Boolean(
              errors.socialLinks?.instagram,
            )}
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.socialLinks?.instagram
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.socialLinks?.instagram && (
            <p
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {
                errors.socialLinks.instagram
                  .message
              }
            </p>
          )}
        </div>

        {/* YouTube */}
        <div>
          <label
            htmlFor="settings-youtube"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F172A]"
          >
            <Globe2
              size={16}
              aria-hidden="true"
            />

            YouTube
          </label>

          <input
            id="settings-youtube"
            type="url"
            placeholder="https://youtube.com/@yourbusiness"
            {...register("socialLinks.youtube")}
            aria-invalid={Boolean(
              errors.socialLinks?.youtube,
            )}
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.socialLinks?.youtube
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.socialLinks?.youtube && (
            <p
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {
                errors.socialLinks.youtube
                  .message
              }
            </p>
          )}
        </div>

        {/* Google Business */}
        <div>
          <label
            htmlFor="settings-google-business"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0F172A]"
          >
            <LinkIcon
              size={16}
              aria-hidden="true"
            />

            Google Business Profile
          </label>

          <input
            id="settings-google-business"
            type="url"
            placeholder="https://maps.google.com/..."
            {...register(
              "socialLinks.googleBusiness",
            )}
            aria-invalid={Boolean(
              errors.socialLinks
                ?.googleBusiness,
            )}
            className={`h-11 w-full rounded-lg border px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
              errors.socialLinks
                ?.googleBusiness
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
            }`}
          />

          {errors.socialLinks
            ?.googleBusiness && (
            <p
              role="alert"
              className="mt-1.5 text-xs font-medium text-red-600"
            >
              {
                errors.socialLinks
                  .googleBusiness.message
              }
            </p>
          )}
        </div>

        {/* Info */}
        <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
          <p className="text-xs leading-5 text-blue-800">
            All social links are optional. Only add official business
            profiles that you want customers to visit.
          </p>
        </div>
      </div>
    </section>
  );
}