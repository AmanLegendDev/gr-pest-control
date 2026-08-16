"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  Loader2,
  Save,
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

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

import { updateServiceArea } from "@/features/service-areas/actions/update-service-area";

interface ServiceAreaInitialData
  extends ServiceAreaFormValues {
  id: string;
}

interface ServiceAreaFormProps {
  mode?: "create" | "edit";

  initialData?: ServiceAreaInitialData;
}

const DEFAULT_VALUES: ServiceAreaFormValues = {
  name: "",
  slug: "",
  shortDescription: "",
  description: "",

  image: {
    url: "",
    publicId: "",
    alt: "",
  },

  highlights: [],
  nearbyAreas: [],
  faqs: [],

  seoTitle: "",
  seoDescription: "",

  featured: false,
  active: true,
  sortOrder: 0,
};

export default function ServiceAreaForm({
  mode = "create",
  initialData,
}: ServiceAreaFormProps) {
  const router = useRouter();

  const isEdit =
    mode === "edit";

  const [serverError, setServerError] =
    useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

 const form =
  useForm<ServiceAreaFormValues>({
    resolver:
      zodResolver(serviceAreaSchema),

    defaultValues:
      isEdit && initialData
        ? {
            name: initialData.name ?? "",
            slug: initialData.slug ?? "",
            shortDescription:
              initialData.shortDescription ?? "",
            description:
              initialData.description ?? "",

            image:
              initialData.image ?? {
                url: "",
                publicId: "",
                alt: "",
              },

            highlights:
              initialData.highlights ?? [],

            nearbyAreas:
              initialData.nearbyAreas ?? [],

            faqs:
              initialData.faqs ?? [],

            seoTitle:
              initialData.seoTitle ?? "",

            seoDescription:
              initialData.seoDescription ?? "",

            featured:
              initialData.featured ?? false,

            active:
              initialData.active ?? true,

            sortOrder:
              initialData.sortOrder ?? 0,
          }
        : DEFAULT_VALUES,

    mode: "onBlur",
  });

  const {
    control,
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    reset,

    formState: {
      errors,
    },
  } = form;

  /*
   * ========================================
   * PREFILL EDIT FORM
   * ========================================
   */

useEffect(() => {
  if (!isEdit || !initialData) {
    return;
  }

  reset({
    name: initialData.name ?? "",
    slug: initialData.slug ?? "",
    shortDescription:
      initialData.shortDescription ?? "",
    description:
      initialData.description ?? "",

    image:
      initialData.image ?? {
        url: "",
        publicId: "",
        alt: "",
      },

    highlights:
      initialData.highlights ?? [],

    nearbyAreas:
      initialData.nearbyAreas ?? [],

    faqs:
      initialData.faqs ?? [],

    seoTitle:
      initialData.seoTitle ?? "",

    seoDescription:
      initialData.seoDescription ?? "",

    featured:
      initialData.featured ?? false,

    active:
      initialData.active ?? true,

    sortOrder:
      initialData.sortOrder ?? 0,
  });
}, [
  isEdit,
  initialData,
  reset,
]);

  const serviceAreaImage =
    watch("image");

  /*
   * ========================================
   * SUBMIT
   * ========================================
   */

  const onSubmit = async (
    values: ServiceAreaFormValues,
  ) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      /*
       * ======================================
       * CREATE
       * ======================================
       */

      if (!isEdit) {
        const result =
          await createServiceArea(
            values,
          );

        if (!result.success) {
          setServerError(
            result.message,
          );

          if (
            result.fieldErrors
          ) {
            Object.entries(
              result.fieldErrors,
            ).forEach(
              ([
                field,
                messages,
              ]) => {
                if (
                  !messages?.length
                ) {
                  return;
                }

                setError(
                  field as keyof ServiceAreaFormValues,
                  {
                    type: "server",
                    message:
                      messages[0],
                  },
                );
              },
            );
          }

          return;
        }

        router.push(
          "/admin/service-areas",
        );

        router.refresh();

        return;
      }

      /*
       * ======================================
       * EDIT
       * ======================================
       */

      if (!initialData?.id) {
        setServerError(
          "Service area ID is missing.",
        );

        return;
      }

      const result =
        await updateServiceArea({
          id: initialData.id,
          ...values,
        });

      if (!result.success) {
        setServerError(
          result.message,
        );

        return;
      }

      router.push(
        "/admin/service-areas",
      );

      router.refresh();
    } catch (error) {
      console.error(
        isEdit
          ? "UPDATE_SERVICE_AREA_ERROR"
          : "CREATE_SERVICE_AREA_ERROR",
        error,
      );

      setServerError(
        isEdit
          ? "Unable to update the service area right now. Please try again."
          : "Unable to create the service area right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit,
      )}
      className="pb-28"
      noValidate
    >
      <div className="space-y-6">
        {/* ==================================
            BASIC
        =================================== */}

        <ServiceAreaBasicSection
          register={register}
          errors={errors}
        />

        {/* ==================================
            IMAGE
        =================================== */}

        <ServiceAreaImageSection
          register={register}
          setValue={setValue}
          image={
            serviceAreaImage
          }
          altError={
            errors.image?.alt
              ?.message
          }
        />

        {/* ==================================
            HIGHLIGHTS
        =================================== */}

        <ServiceAreaHighlightsSection
          control={control}
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />

        {/* ==================================
            NEARBY AREAS
        =================================== */}

        <ServiceAreaNearbyAreasSection
          control={control}
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />

        {/* ==================================
            FAQ
        =================================== */}

        <ServiceAreaFAQSection
          control={control}
          register={register}
          errors={errors}
        />

        {/* ==================================
            SEO
        =================================== */}

        <ServiceAreaSEOSection
          register={register}
          errors={errors}
        />

        {/* ==================================
            PUBLISHING
        =================================== */}

        <ServiceAreaPublishingSection
          register={register}
          errors={errors}
        />

        {/* ==================================
            SERVER ERROR
        =================================== */}

        {serverError && (
          <div
            role="alert"
            className="
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              font-medium
              text-red-700
            "
          >
            {serverError}
          </div>
        )}
      </div>

      {/* ====================================
          BOTTOM ACTION BAR
      ==================================== */}

      <div
        className="
          sticky
          bottom-0
          z-20
          mt-8
          border-t
          border-slate-200
          bg-white/95
          px-4
          py-4
          shadow-[0_-4px_20px_rgba(15,23,42,0.06)]
          backdrop-blur
          sm:px-6
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-5xl
            flex-col-reverse
            gap-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* CANCEL */}

          <Link
            href="/admin/service-areas"
            className="
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-slate-300
              bg-white
              px-5
              text-sm
              font-semibold
              text-[#0F172A]
              transition
              hover:border-slate-400
              hover:bg-slate-50
              focus:outline-none
              focus:ring-2
              focus:ring-blue-100
            "
          >
            <ArrowLeft
              size={16}
              aria-hidden="true"
            />

            Cancel
          </Link>

          {/* SAVE */}

          <button
            type="submit"
            disabled={
              isSubmitting
            }
            className="
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-[#0878E8]
              px-6
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#066BCF]
              focus:outline-none
              focus:ring-2
              focus:ring-blue-200
              focus:ring-offset-1
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isSubmitting ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                  aria-hidden="true"
                />

                {isEdit
                  ? "Saving..."
                  : "Creating..."}
              </>
            ) : (
              <>
                <Save
                  size={17}
                  aria-hidden="true"
                />

                {isEdit
                  ? "Save Changes"
                  : "Create Service Area"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}