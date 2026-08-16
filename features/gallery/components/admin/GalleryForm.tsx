"use client";

import { useState } from "react";
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

import GalleryBasicSection from "@/features/gallery/components/admin/GalleryBasicSection";
import GalleryImageSection from "@/features/gallery/components/admin/GalleryImageSection";
import GalleryCategorySection from "@/features/gallery/components/admin/GalleryCategorySection";
import GallerySEOSection from "@/features/gallery/components/admin/GallerySEOSection";
import GalleryPublishingSection from "@/features/gallery/components/admin/GalleryPublishingSection";

import {
  gallerySchema,
  type GalleryFormValues,
} from "@/features/gallery/schemas/gallery-schema";

import { createGalleryItem } from "@/features/gallery/actions/createGalleryItem";
import { updateGalleryItem } from "@/features/gallery/actions/update-gallery-item";

interface GalleryInitialData
  extends GalleryFormValues {
  id: string;
}

interface GalleryFormProps {
  mode?: "create" | "edit";
  initialData?: GalleryInitialData;
}

const DEFAULT_VALUES: GalleryFormValues = {
  title: "",
  slug: "",
  description: "",

  category: "home",

  image: {
    url: "",
    publicId: "",
    alt: "",
  },

  seoTitle: "",
  seoDescription: "",

  featured: false,
  active: true,

  sortOrder: 0,
};

export default function GalleryForm({
  mode = "create",
  initialData,
}: GalleryFormProps) {
  const router = useRouter();

  const isEdit = mode === "edit";

  const [serverError, setServerError] =
    useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),

    defaultValues:
      initialData ?? DEFAULT_VALUES,

    mode: "onBlur",
  });

  const {
    control,
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = form;

  const onSubmit = async (
    values: GalleryFormValues,
  ) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const result = isEdit
        ? await updateGalleryItem({
            id: initialData!.id,
            ...values,
          })
        : await createGalleryItem(values);

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
                field as keyof GalleryFormValues,
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

      router.push("/admin/gallery");
      router.refresh();
    } catch (error) {
      console.error(
        isEdit
          ? "UPDATE_GALLERY_FORM_ERROR"
          : "CREATE_GALLERY_FORM_ERROR",
        error,
      );

      setServerError(
        isEdit
          ? "Unable to update the gallery item right now. Please try again."
          : "Unable to create the gallery item right now. Please try again.",
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

        {/* BASIC */}

        <GalleryBasicSection
          register={register}
          errors={errors}
        />

        {/* IMAGE */}

        <GalleryImageSection
          control={control}
          register={register}
          setValue={setValue}
          errors={errors}
        />

        {/* CATEGORY */}

        <GalleryCategorySection
          register={register}
          errors={errors}
        />

        {/* SEO */}

        <GallerySEOSection
          register={register}
          errors={errors}
        />

        {/* PUBLISHING */}

        <GalleryPublishingSection
          register={register}
          errors={errors}
        />

        {/* SERVER ERROR */}

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

      {/* =====================================
          BOTTOM ACTIONS
      ====================================== */}

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
          <Link
            href="/admin/gallery"
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

          <button
            type="submit"
            disabled={isSubmitting}
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
                  ? "Saving Changes..."
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
                  : "Create Gallery Item"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}