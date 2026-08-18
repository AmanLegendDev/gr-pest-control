"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Home,
  Loader2,
  MapPin,
  Pencil,
  ShieldCheck,
  X,
} from "lucide-react";

import QuoteSummary from "@/components/quote/QuoteSummary";
import QuoteReviewIntro from "@/components/quote/QuoteReviewIntro";
import QuoteReviewBottom from "@/components/quote/QuoteReviewBottom";

import type { QuoteFormData } from "@/features/quote-requests/types/quoteRequest";

interface ServiceOption {
  id: string;
  title: string;
  slug: string;
}

type ConfirmAction =
  | {
      type: "edit";
      step: 1 | 2 | 3;
    }
  | {
      type: "submit";
    };

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

  const [confirmAction, setConfirmAction] =
    useState<ConfirmAction | null>(null);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

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

  /*
   * User clicked Edit.
   * We don't navigate immediately.
   * First show confirmation.
   */
  const handleEdit = (
    step: 1 | 2 | 3,
  ) => {
    if (submitting) {
      return;
    }

    setConfirmAction({
      type: "edit",
      step,
    });
  };

  /*
   * User clicked Confirm & Submit.
   * First show confirmation.
   */
  const handleConfirm = () => {
    if (!data || submitting) {
      return;
    }

    setErrorMessage(null);

    setConfirmAction({
      type: "submit",
    });
  };

  /*
   * Actually continue to selected edit step.
   */
  const handleContinueEdit = (
    step: 1 | 2 | 3,
  ) => {
    setConfirmAction(null);

    router.push(
      `/quote?step=${step}`,
    );
  };

  /*
   * Actually submit the quote.
   */
  const handleSubmit = async () => {
    if (!data || submitting) {
      return;
    }

    setConfirmAction(null);
    setErrorMessage(null);
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

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  /*
   * Escape closes confirmation/error modal.
   */
  useEffect(() => {
    if (
      !confirmAction &&
      !errorMessage
    ) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        if (!submitting) {
          setConfirmAction(null);
          setErrorMessage(null);
        }
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    confirmAction,
    errorMessage,
    submitting,
  ]);

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
    <>
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

      {/* =========================
          CONFIRMATION MODAL
      ========================== */}

      {confirmAction && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-slate-950/50
            px-4
            py-6
            backdrop-blur-sm
          "
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              if (!submitting) {
                setConfirmAction(null);
              }
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-confirm-title"
            aria-describedby="quote-confirm-description"
            className="
              w-full
              max-w-md
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              bg-white
              shadow-[0_25px_80px_rgba(15,23,42,0.22)]
            "
          >
            {/* Header */}

            <div className="relative border-b border-slate-100 px-5 py-5 sm:px-6">
              <button
                type="button"
                disabled={submitting}
                aria-label="Close confirmation"
                onClick={() =>
                  setConfirmAction(null)
                }
                className="
                  absolute
                  right-4
                  top-4
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-600
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <X size={17} />
              </button>

              <div className="flex items-start gap-3 pr-8">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-50
                    text-[#0878E8]
                  "
                >
                  {confirmAction.type ===
                  "edit" ? (
                    <Pencil size={19} />
                  ) : (
                    <CheckCircle2
                      size={19}
                    />
                  )}
                </div>

                <div>
                  <h2
                    id="quote-confirm-title"
                    className="text-base font-extrabold text-[#062B63] sm:text-lg"
                  >
                    {confirmAction.type ===
                    "edit"
                      ? "Edit your request?"
                      : "Ready to submit?"}
                  </h2>

                  <p
                    id="quote-confirm-description"
                    className="mt-1.5 text-xs leading-5 text-slate-500 sm:text-sm"
                  >
                    {confirmAction.type ===
                    "edit"
                      ? "You can review and update this part of your quote request before submitting it."
                      : "Please make sure your details are correct before sending your request to GR Pest Control."}
                  </p>
                </div>
              </div>
            </div>

            {/* Summary */}

            <div className="px-5 py-5 sm:px-6">
              {confirmAction.type ===
              "edit" ? (
                <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#0878E8]">
                    Going back to
                  </p>

                  <p className="mt-1 text-sm font-extrabold text-[#062B63]">
                    {getStepName(
                      confirmAction.step,
                    )}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Your current information
                    will remain available while
                    you make changes.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <ConfirmDetail
                    icon={<MapPin size={14} />}
                    label="Service"
                    value={serviceTitle}
                  />

                  <ConfirmDetail
                    icon={<Home size={14} />}
                    label="Property"
                    value={
                      data.propertyType ===
                      "residential"
                        ? "Residential"
                        : "Commercial"
                    }
                  />

                  <ConfirmDetail
                    icon={
                      <CalendarDays
                        size={14}
                      />
                    }
                    label="Preferred date"
                    value={
                      data.preferredDate
                    }
                  />

                  <ConfirmDetail
                    icon={
                      <Clock3 size={14} />
                    }
                    label="Preferred time"
                    value={
                      data.preferredTime
                    }
                  />

                  <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">
                    <ShieldCheck
                      size={15}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />

                    <p className="text-[11px] leading-5 text-slate-500">
                      Your preferred date and
                      time are subject to
                      confirmation by our team.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}

            <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
              <button
                type="button"
                disabled={submitting}
                onClick={() =>
                  setConfirmAction(null)
                }
                className="
                  h-11
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  text-sm
                  font-bold
                  text-slate-600
                  transition
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={submitting}
                onClick={() => {
                  if (
                    confirmAction.type ===
                    "edit"
                  ) {
                    handleContinueEdit(
                      confirmAction.step,
                    );
                  } else {
                    handleSubmit();
                  }
                }}
                className="
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#0878E8]
                  px-5
                  text-sm
                  font-extrabold
                  text-white
                  shadow-[0_8px_24px_rgba(8,120,232,0.18)]
                  transition
                  hover:bg-[#066BCF]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {submitting ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                    Sending...
                  </>
                ) : confirmAction.type ===
                  "edit" ? (
                  <>
                    Continue Editing
                    <ArrowRight
                      size={15}
                    />
                  </>
                ) : (
                  <>
                    Yes, Submit Request
                    <ArrowRight
                      size={15}
                    />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================
          ERROR MODAL
      ========================== */}

      {errorMessage && (
        <div
          className="
            fixed
            inset-0
            z-[10000]
            flex
            items-center
            justify-center
            bg-slate-950/50
            px-4
            backdrop-blur-sm
          "
        >
          <div
            role="alertdialog"
            aria-modal="true"
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-red-100
              bg-white
              p-6
              shadow-[0_25px_80px_rgba(15,23,42,0.22)]
            "
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <AlertCircle size={20} />
            </div>

            <h2 className="mt-4 text-lg font-extrabold text-[#062B63]">
              We couldn't submit your request
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {errorMessage}
            </p>

            <button
              type="button"
              onClick={() =>
                setErrorMessage(null)
              }
              className="
                mt-6
                inline-flex
                h-11
                w-full
                items-center
                justify-center
                rounded-xl
                bg-[#0878E8]
                px-5
                text-sm
                font-extrabold
                text-white
                transition
                hover:bg-[#066BCF]
              "
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================
   CONFIRM DETAIL
========================== */

function ConfirmDetail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#0878E8] shadow-sm">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 truncate text-xs font-bold text-[#062B63]">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

/* =========================
   STEP NAME
========================== */

function getStepName(
  step: 1 | 2 | 3,
) {
  switch (step) {
    case 1:
      return "Your details";

    case 2:
      return "Service & location";

    case 3:
      return "Preferred time";

    default:
      return "Request details";
  }
}