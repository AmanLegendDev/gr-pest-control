"use client";

import { useState } from "react";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FAQBasicSection from "@/features/faq/components/admin/FAQBasicSection";
import FAQCategorySection from "@/features/faq/components/admin/FAQCategorySection";
import FAQPublishingSection from "@/features/faq/components/admin/FAQPublishingSection";
import FAQSEOSection from "@/features/faq/components/admin/FAQSEOSection";

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

export default function FAQForm() {
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FAQFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const onSubmit = async (values: FAQFormValues) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const result = await createFAQ(values);

      if (!result.success) {
        setServerError(result.message);

        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(
            ([field, messages]) => {
              if (!messages?.length) {
                return;
              }

              setError(field as keyof FAQFormValues, {
                type: "server",
                message: messages[0],
              });
            },
          );
        }

        return;
      }

      router.push("/admin/faqs");
      router.refresh();
    } catch (error) {
      console.error("CREATE_FAQ_FORM_ERROR", error);

      setServerError(
        "Unable to create the FAQ right now. Please try again.",
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
        <FAQBasicSection
          register={register}
          errors={errors}
        />

        <FAQCategorySection
          register={register}
          errors={errors}
        />

        <FAQPublishingSection
          register={register}
          errors={errors}
        />

        <FAQSEOSection
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
            href="/admin/faqs"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-[#0F172A] transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100"
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
                <Save
                  size={17}
                  aria-hidden="true"
                />

                Create FAQ
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}