"use client";
import { updateFAQ } from "@/features/faq/actions/update-faq";
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

import {
  faqSchema,
  type FAQFormValues,
} from "@/features/faq/schemas/faq-schema";

import { createFAQ } from "@/features/faq/actions/createFAQ";

const DEFAULT_VALUES: FAQFormValues = {
  question: "",
  answer: "",
  category: "",
  sortOrder: 0,
  featured: false,
  active: true,
  seoTitle: "",
  seoDescription: "",
};

interface FAQFormProps {
  mode?: "create" | "edit";
  initialData?: FAQFormValues & {
    id: string;
  };
}

export default function FAQForm({
  mode = "create",
  initialData,
}: FAQFormProps) {
  const router = useRouter();

  const [serverError, setServerError] =
    useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

 const form = useForm<FAQFormValues>({
  resolver: zodResolver(faqSchema),
  defaultValues: initialData
    ? {
        question: initialData.question,
        answer: initialData.answer,
        category: initialData.category,
        sortOrder: initialData.sortOrder,
        featured: initialData.featured,
        active: initialData.active,
        seoTitle: initialData.seoTitle,
        seoDescription:
          initialData.seoDescription,
      }
    : DEFAULT_VALUES,
  mode: "onBlur",
});

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

async function onSubmit(values: FAQFormValues) {
  setServerError(null);
  setIsSubmitting(true);

  try {
    const result =
      mode === "edit" && initialData
        ? await updateFAQ({
            id: initialData.id,
            ...values,
          })
        : await createFAQ(values);

    if (!result.success) {
      setServerError(result.message);

      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(
          ([field, messages]) => {
            if (!messages?.length) return;

            setError(
              field as keyof FAQFormValues,
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

    router.push("/admin/faqs");
    router.refresh();
  } catch (error) {
    console.error(
      mode === "edit"
        ? "UPDATE_FAQ_FORM_ERROR"
        : "CREATE_FAQ_FORM_ERROR",
      error,
    );

    setServerError(
      mode === "edit"
        ? "Unable to update the FAQ right now. Please try again."
        : "Unable to create the FAQ right now. Please try again.",
    );
  } finally {
    setIsSubmitting(false);
  }
}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="pb-28"
    >
      <div className="space-y-6">

        {/* BASIC */}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-bold text-[#062B63]">
              FAQ Details
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Add the customer question and
              its answer.
            </p>
          </div>

          <div className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Question
              </label>

              <input
                {...register("question")}
                placeholder="e.g. How often should pest control be done?"
                className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition placeholder:text-slate-300 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
              />

              {errors.question && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.question.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Answer
              </label>

              <textarea
                {...register("answer")}
                rows={7}
                placeholder="Write a clear and useful answer..."
                className="w-full resize-y rounded-lg border border-slate-200 px-3 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-300 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
              />

              {errors.answer && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.answer.message}
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Category
                </label>

                <input
                  {...register("category")}
                  placeholder="General"
                  className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
                />

                {errors.category && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Sort Order
                </label>

                <input
                  type="number"
                  min={0}
                  {...register(
                    "sortOrder",
                    {
                      valueAsNumber: true,
                    },
                  )}
                  className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
                />

                {errors.sortOrder && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {errors.sortOrder.message}
                  </p>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* SEO */}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-bold text-[#062B63]">
              SEO
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Optional search engine metadata.
            </p>
          </div>

          <div className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                SEO Title
              </label>

              <input
                {...register("seoTitle")}
                placeholder="Frequently Asked Questions | GR Pest Control"
                className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
              />

              {errors.seoTitle && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.seoTitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                SEO Description
              </label>

              <textarea
                {...register(
                  "seoDescription",
                )}
                rows={4}
                placeholder="Short description for search engines..."
                className="w-full resize-y rounded-lg border border-slate-200 px-3 py-3 text-sm leading-6 outline-none focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
              />

              {errors.seoDescription && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {
                    errors.seoDescription
                      .message
                  }
                </p>
              )}
            </div>
          </div>
        </section>

        {/* PUBLISHING */}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-bold text-[#062B63]">
              Publishing
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Control how this FAQ appears on
              the public website.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4">
              <div>
                <p className="text-sm font-bold text-slate-700">
                  Active
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Show this FAQ publicly.
                </p>
              </div>

              <input
                type="checkbox"
                {...register("active")}
                className="h-4 w-4 accent-[#0878E8]"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4">
              <div>
                <p className="text-sm font-bold text-slate-700">
                  Featured
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Highlight this FAQ.
                </p>
              </div>

              <input
                type="checkbox"
                {...register("featured")}
                className="h-4 w-4 accent-[#0878E8]"
              />
            </label>

          </div>
        </section>

        {serverError && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {serverError}
          </div>
        )}
      </div>

      {/* ACTION BAR */}

      <div className="sticky bottom-0 z-20 mt-8 border-t border-slate-200 bg-white/95 px-4 py-4 shadow-[0_-4px_20px_rgba(15,23,42,0.06)] backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">

          <Link
            href="/admin/faq"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-[#0F172A] hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0878E8] px-6 text-sm font-semibold text-white hover:bg-[#066BCF] disabled:cursor-not-allowed disabled:opacity-60"
          >
           {isSubmitting ? (
  <>
    <Loader2
      size={17}
      className="animate-spin"
    />
    {mode === "edit"
      ? "Updating..."
      : "Creating..."}
  </>
) : (
  <>
    <Save size={17} />
    {mode === "edit"
      ? "Update FAQ"
      : "Create FAQ"}
  </>
)}
          </button>

        </div>
      </div>
    </form>
  );
}