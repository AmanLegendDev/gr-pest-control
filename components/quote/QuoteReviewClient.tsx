"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import QuoteSummary from "@/components/quote/QuoteSummary";
import QuoteReviewIntro from "@/components/quote/QuoteReviewIntro";
import QuoteReviewBottom from "@/components/quote/QuoteReviewBottom";

import type { QuoteFormData } from "@/features/quote-requests/types/quoteRequest";

interface ServiceOption {
  id: string;
  title: string;
  slug: string;
}

const STORAGE_KEY = "gr-quote-request";

export default function QuoteReviewClient() {
  const router = useRouter();

  const [data, setData] =
    useState<QuoteFormData | null>(null);

  const [services, setServices] =
    useState<ServiceOption[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    try {
      const stored =
        sessionStorage.getItem(
          STORAGE_KEY,
        );

      if (!stored) {
        router.replace("/quote");
        return;
      }

      const parsed =
        JSON.parse(stored) as QuoteFormData;

      setData(parsed);
    } catch {
      sessionStorage.removeItem(
        STORAGE_KEY,
      );

      router.replace("/quote");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    async function loadServices() {
      try {
        const response = await fetch(
          "/api/services/active",
        );

        if (!response.ok) {
          return;
        }

        const result =
          await response.json();

        setServices(
          result.services ?? [],
        );
      } catch {
        // Keep review page usable.
      }
    }

    loadServices();
  }, []);

  const serviceTitle = useMemo(() => {
    if (!data) {
      return "";
    }

    return (
      services.find(
        (service) =>
          service.id === data.serviceId,
      )?.title ?? "Selected service"
    );
  }, [data, services]);

  const handleEdit = (
    step: 1 | 2 | 3,
  ) => {
    router.push(
      `/quote?step=${step}`,
    );
  };

  const handleConfirm = async () => {
    if (!data || submitting) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        "/api/quote-requests",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to submit quote request.",
        );
      }

      const referenceNumber =
        result.data?.referenceNumber;

      if (!referenceNumber) {
        throw new Error(
          "Quote was submitted, but no reference number was returned.",
        );
      }

      sessionStorage.removeItem(
        STORAGE_KEY,
      );

      router.replace(
        `/quote/success?reference=${encodeURIComponent(
          referenceNumber,
        )}`,
      );
    } catch (error) {
      console.error(
        "Quote submission failed:",
        error,
      );

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-[#0878E8]" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading your request...
          </p>
        </div>
      </main>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <section className="px-4 pb-20 pt-32 sm:px-6 sm:pb-24 lg:px-8 lg:pt-36">
      <div className="mx-auto max-w-4xl">
        <QuoteReviewIntro />

        <QuoteSummary
          data={data}
          serviceTitle={serviceTitle}
          onEditStep={handleEdit}
          onConfirm={handleConfirm}
          submitting={submitting}
        />

        <QuoteReviewBottom
          businessName="GR Pest Control"
        />
      </div>
    </section>
  );
}