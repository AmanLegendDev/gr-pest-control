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

import TestimonialBasicSection from "@/features/testimonials/components/admin/TestimonialBasicSection";
import TestimonialRatingSection from "@/features/testimonials/components/admin/TestimonialRatingSection";
import TestimonialImageSection from "@/features/testimonials/components/admin/TestimonialImageSection";
import TestimonialSEOSection from "@/features/testimonials/components/admin/TestimonialSEOSection";
import TestimonialPublishingSection from "@/features/testimonials/components/admin/TestimonialPublishingSection";

import {
  testimonialSchema,
  type TestimonialFormValues,
} from "@/features/testimonials/schemas/testimonial-schema";

import {
  createTestimonial,
} from "@/features/testimonials/actions/createTestimonial";

import {
  updateTestimonial,
} from "@/features/testimonials/actions/updateTestimonial";

interface TestimonialFormProps {
  mode?: "create" | "edit";
  initialData?: TestimonialFormValues & {
    id: string;
  };
}

const DEFAULT_VALUES: TestimonialFormValues = {
  name: "",
  role: "",
  company: "",
  content: "",
  rating: 5,
  location: "",
  image: undefined,
  seoTitle: "",
  seoDescription: "",
  featured: false,
  active: true,
  sortOrder: 0,
};

export default function TestimonialForm({
  mode = "create",
  initialData,
}: TestimonialFormProps) {
  const router = useRouter();

  const isEdit =
    mode === "edit" && !!initialData;

  const [serverError, setServerError] =
    useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const form = useForm<TestimonialFormValues>({
    resolver:
      zodResolver(testimonialSchema),

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
    values: TestimonialFormValues,
  ) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      if (isEdit && initialData) {
        const result =
          await updateTestimonial({
            id: initialData.id,
            ...values,
          });

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
                  field as keyof TestimonialFormValues,
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

        router.push(
          "/admin/testimonials",
        );

        router.refresh();

        return;
      }

      const result =
        await createTestimonial(values);

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
                field as keyof TestimonialFormValues,
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

      router.push(
        "/admin/testimonials",
      );

      router.refresh();
    } catch (error) {
      console.error(
        "TESTIMONIAL_FORM_ERROR",
        error,
      );

      setServerError(
        isEdit
          ? "Unable to update the testimonial right now. Please try again."
          : "Unable to create the testimonial right now. Please try again.",
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
        <TestimonialBasicSection
          register={register}
          errors={errors}
        />

        <TestimonialRatingSection
          control={control}
          errors={errors}
        />

        <TestimonialImageSection
          control={control}
          register={register}
          setValue={setValue}
          errors={errors}
        />

        <TestimonialSEOSection
          register={register}
          errors={errors}
        />

        <TestimonialPublishingSection
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

      <div className="sticky bottom-0 z-20 mt-8 border-t border-slate-200 bg-white/95 px-4 py-4 shadow-[0_-4px_20px_rgba(15,23,42,0.06)] backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/admin/testimonials"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-[#0F172A] transition hover:border-slate-400 hover:bg-slate-50"
          >
            <ArrowLeft size={16} />

            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0878E8] px-6 text-sm font-semibold text-white transition hover:bg-[#066BCF] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />

                {isEdit
                  ? "Saving..."
                  : "Creating..."}
              </>
            ) : (
              <>
                <Save size={17} />

                {isEdit
                  ? "Save Changes"
                  : "Create Testimonial"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}