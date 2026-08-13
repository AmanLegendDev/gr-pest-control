"use client";

import { useState } from "react";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ServiceAreaBasicSection from "@/features/service-areas/components/admin/ServiceAreaBasicSection";
import ServiceAreaImageSection from "@/features/service-areas/components/admin/ServiceAreaImageSection";
import ServiceAreaHighlightsSection from "@/features/service-areas/components/admin/ServiceAreaHighlightsSection";
import ServiceAreaNearbyAreasSection from "@/features/service-areas/components/admin/ServiceAreaNearbyAreasSection";
import ServiceAreaFAQSection from "@/features/service-areas/components/admin/ServiceAreaFAQSection";
import ServiceAreaSEOSection from "@/features/service-areas/components/admin/ServiceAreaSEOSection";
import ServiceAreaPublishingSection from "@/features/service-areas/components/admin/ServiceAreaPublishingSection";

import {
  serviceAreaSchema,
  type ServiceAreaFormValues,
} from "@/features/service-areas/schemas/service-area-schema";

import { createServiceArea } from "@/features/service-areas/actions/createServiceArea";

const DEFAULT_VALUES: ServiceAreaFormValues = {
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  image: undefined,
  highlights: [],
  nearbyAreas: [],
  faqs: [],
  seoTitle: "",
  seoDescription: "",
  featured: false,
  active: true,
  sortOrder: 0,
};

export default function ServiceAreaForm() {
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ServiceAreaFormValues>({
    resolver: zodResolver(serviceAreaSchema),
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

const serviceAreaImage = watch("image");

  const onSubmit = async (values: ServiceAreaFormValues) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const result = await createServiceArea(values);

      if (!result.success) {
        setServerError(result.message);

        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(
            ([field, messages]) => {
              if (!messages?.length) return;

              setError(field as keyof ServiceAreaFormValues, {
                type: "server",
                message: messages[0],
              });
            },
          );
        }

        return;
      }

      router.push("/admin/service-areas");
      router.refresh();
    } catch (error) {
      console.error("CREATE_SERVICE_AREA_ERROR", error);

      setServerError(
        "Unable to create the service area right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="pb-28"
      noValidate
    >
      <div className="space-y-6">
        <ServiceAreaBasicSection
          register={register}
          errors={errors}
        />

  <ServiceAreaImageSection
  register={register}
  setValue={setValue}
  image={serviceAreaImage}
  altError={errors.image?.alt?.message}
/>
        <ServiceAreaHighlightsSection
          control={control}
          register={register}
          errors={errors}
        />

        <ServiceAreaNearbyAreasSection
          control={control}
          register={register}
          errors={errors}
        />

        <ServiceAreaFAQSection
          control={control}
          register={register}
          errors={errors}
        />

        <ServiceAreaSEOSection
          register={register}
          errors={errors}
        />

        <ServiceAreaPublishingSection
          register={register}
          errors={errors}
        />

        {serverError && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {serverError}
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div className="sticky bottom-0 z-20 mt-8 border-t border-slate-200 bg-white/95 px-4 py-4 shadow-[0_-4px_20px_rgba(15,23,42,0.06)] backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/admin/service-areas"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-[#0F172A] transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Cancel
          </Link>

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
                <Save size={17} aria-hidden="true" />
                Create Service Area
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}