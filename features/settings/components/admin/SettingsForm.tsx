"use client";

import { useState } from "react";
import {
  Loader2,
  Save,
} from "lucide-react";
import {
  useForm,
} from "react-hook-form";
import {
  zodResolver,
} from "@hookform/resolvers/zod";

import SettingsBusinessSection from "@/features/settings/components/admin/SettingsBusinessSection";
import SettingsLogoSection from "@/features/settings/components/admin/SettingsLogoSection";
import SettingsContactSection from "@/features/settings/components/admin/SettingsContactSection";
import SettingsSocialSection from "@/features/settings/components/admin/SettingsSocialSection";
import SettingsHoursSection from "@/features/settings/components/admin/SettingsHoursSection";
import SettingsSEOSection from "@/features/settings/components/admin/SettingsSEOSection";
import SettingsPublishingSection from "@/features/settings/components/admin/SettingsPublishingSection";

import {
  siteSettingsSchema,
  type SiteSettingsFormValues,
} from "@/features/settings/schemas/site-settings-schema";

import {
  updateSiteSettings,
} from "@/features/settings/actions/updateSiteSettings";

const DEFAULT_BUSINESS_HOURS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
].map((day) => ({
  day,
  open: "09:00",
  close: "18:00",
  closed: false,
}));

const DEFAULT_VALUES: SiteSettingsFormValues = {
  businessName: "",
  shortDescription: "",

  logo: undefined,

  email: "",
  phone: "",
  whatsapp: "",

  address: "",
  city: "",
  state: "",
  pincode: "",

  socialLinks: {
    facebook: "",
    instagram: "",
    youtube: "",
    googleBusiness: "",
  },

  primaryCTA: "Get a Free Quote",
  currency: "INR",

  businessHours: DEFAULT_BUSINESS_HOURS,

  siteTitle: "",
  siteDescription: "",

  favicon: undefined,

  active: true,
};

interface SettingsFormProps {
  initialSettings?: SiteSettingsFormValues | null;
}

export default function SettingsForm({
  initialSettings,
}: SettingsFormProps) {
  const [serverError, setServerError] =
    useState<string | null>(null);

  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const form = useForm<SiteSettingsFormValues>({
    resolver: zodResolver(
      siteSettingsSchema,
    ),

    defaultValues:
      initialSettings ?? DEFAULT_VALUES,

    mode: "onBlur",
  });

  const {
    control,
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isDirty },
  } = form;

  const onSubmit = async (
    values: SiteSettingsFormValues,
  ) => {
    setServerError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const result =
        await updateSiteSettings(values);

      if (!result.success) {
        setServerError(result.message);

        if (result.fieldErrors) {
          Object.entries(
            result.fieldErrors,
          ).forEach(
            ([field, messages]) => {
              if (!messages?.length) {
                return;
              }

              setError(
                field as keyof SiteSettingsFormValues,
                {
                  type: "server",
                  message: messages[0],
                },
              );
            },
          );
        }

        return;
      }

      setSuccessMessage(
        "Website settings saved successfully.",
      );

      form.reset(values);
    } catch (error) {
      console.error(
        "SITE_SETTINGS_FORM_ERROR",
        error,
      );

      setServerError(
        "Unable to save website settings right now. Please try again.",
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
        {/* Business */}
        <SettingsBusinessSection
          register={register}
          errors={errors}
        />

        {/* Logo */}
        <SettingsLogoSection
          control={control}
          register={register}
          setValue={setValue}
          errors={errors}
        />

        {/* Contact */}
        <SettingsContactSection
          register={register}
          errors={errors}
        />

        {/* Social */}
        <SettingsSocialSection
          register={register}
          errors={errors}
        />

        {/* Hours */}
        <SettingsHoursSection
          control={control}
          register={register}
          errors={errors}
        />

        {/* SEO */}
        <SettingsSEOSection
          register={register}
          errors={errors}
        />

        {/* Publishing */}
        <SettingsPublishingSection
          register={register}
          errors={errors}
        />

        {/* Success */}
        {successMessage && (
          <div
            role="status"
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
          >
            {successMessage}
          </div>
        )}

        {/* Error */}
        {serverError && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {serverError}
          </div>
        )}
      </div>

      {/* Bottom Save Bar */}
      <div className="sticky bottom-0 z-20 mt-8 border-t border-slate-200 bg-white/95 px-4 py-4 shadow-[0_-4px_20px_rgba(15,23,42,0.06)] backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#0F172A]">
              Website Settings
            </p>

            <p className="mt-1 text-xs text-[#64748B]">
              {isDirty
                ? "You have unsaved changes."
                : "All changes are saved."}
            </p>
          </div>

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

                Saving...
              </>
            ) : (
              <>
                <Save
                  size={17}
                  aria-hidden="true"
                />

                Save Settings
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}