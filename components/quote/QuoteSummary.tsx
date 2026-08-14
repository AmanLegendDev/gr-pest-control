"use client";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Home,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import type { QuoteFormData } from "@/features/quote-requests/types/quoteRequest";

interface QuoteSummaryProps {
  data: QuoteFormData;

  serviceTitle: string;

  onEditStep: (
    step: 1 | 2 | 3,
  ) => void;

  onConfirm: () => void;

  submitting?: boolean;
}

interface SummarySectionProps {
  icon: React.ReactNode;
  title: string;
  step: 1 | 2 | 3;
  onEdit: (step: 1 | 2 | 3) => void;
  children: React.ReactNode;
}

function SummarySection({
  icon,
  title,
  step,
  onEdit,
  children,
}: SummarySectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0878E8]">
            {icon}
          </div>

          <h2 className="text-sm font-extrabold text-[#062B63] sm:text-base">
            {title}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => onEdit(step)}
          className="
            shrink-0
            rounded-full
            px-3
            py-1.5
            text-xs
            font-bold
            text-[#0878E8]
            transition-colors
            hover:bg-blue-50
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-200
          "
        >
          Edit
        </button>
      </div>

      <div className="mt-5">
        {children}
      </div>
    </section>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold leading-6 text-[#062B63]">
        {value || "—"}
      </p>
    </div>
  );
}

export default function QuoteSummary({
  data,
  serviceTitle,
  onEditStep,
  onConfirm,
  submitting = false,
}: QuoteSummaryProps) {
  return (
    <div className="w-full">
      {/* Header */}
     

      {/* Summary */}
      <div className="mt-8 space-y-4">
        {/* Personal details */}
        <SummarySection
          icon={<User size={18} />}
          title="Your details"
          step={1}
          onEdit={onEditStep}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Detail
              label="Full name"
              value={data.customer.name}
            />

            <div className="flex items-start gap-2.5">
              <Phone
                size={15}
                className="mt-1 shrink-0 text-slate-400"
              />

              <Detail
                label="Phone number"
                value={data.customer.phone}
              />
            </div>

            {data.customer.email && (
              <div className="flex items-start gap-2.5 sm:col-span-2">
                <Mail
                  size={15}
                  className="mt-1 shrink-0 text-slate-400"
                />

                <Detail
                  label="Email address"
                  value={data.customer.email}
                />
              </div>
            )}
          </div>
        </SummarySection>

        {/* Service & location */}
        <SummarySection
          icon={<MapPin size={18} />}
          title="Service & location"
          step={2}
          onEdit={onEditStep}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Detail
              label="Service"
              value={serviceTitle}
            />

            <div className="flex items-start gap-2.5">
              <Home
                size={15}
                className="mt-1 shrink-0 text-slate-400"
              />

              <Detail
                label="Property type"
                value={
                  data.propertyType ===
                  "residential"
                    ? "Residential"
                    : "Commercial"
                }
              />
            </div>

            <Detail
              label="Suburb"
              value={
                data.location.suburb
              }
            />

            <Detail
              label="Address"
              value={
                data.location.address
              }
            />

            <div className="sm:col-span-2">
              <Detail
                label="Pest problem"
                value={
                  data.pestProblem
                }
              />
            </div>
          </div>
        </SummarySection>

        {/* Preferred time */}
        <SummarySection
          icon={
            <CalendarDays
              size={18}
            />
          }
          title="Preferred time"
          step={3}
          onEdit={onEditStep}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex items-start gap-2.5">
              <CalendarDays
                size={15}
                className="mt-1 shrink-0 text-slate-400"
              />

              <Detail
                label="Preferred date"
                value={
                  data.preferredDate
                }
              />
            </div>

            <div className="flex items-start gap-2.5">
              <Clock3
                size={15}
                className="mt-1 shrink-0 text-slate-400"
              />

              <Detail
                label="Preferred time"
                value={
                  data.preferredTime
                }
              />
            </div>
          </div>
        </SummarySection>
      </div>

      {/* Confirmation notice */}
      <div className="mt-6 flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
          <CheckCircle2 size={18} />
        </div>

        <div>
          <p className="text-xs font-extrabold text-[#062B63]">
            Ready to send?
          </p>

          <p className="mt-1 text-[11px] leading-5 text-slate-500">
            By confirming, your quote request
            will be sent to GR Pest Control for
            review. Your preferred date and
            time are subject to confirmation.
          </p>
        </div>
      </div>

      {/* Confirm */}
      <div className="mt-6">
        <button
          type="button"
          onClick={onConfirm}
          disabled={submitting}
          className="
            group
            flex
            min-h-14
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-[#0878E8]
            px-6
            text-sm
            font-extrabold
            text-white
            shadow-[0_14px_35px_rgba(8,120,232,0.20)]
            transition-all
            duration-200
            hover:bg-[#066BCF]
            hover:shadow-[0_16px_40px_rgba(8,120,232,0.25)]
            active:scale-[0.99]
            disabled:cursor-not-allowed
            disabled:opacity-60
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-200
            focus-visible:ring-offset-2
          "
        >
          {submitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

              Sending request...
            </>
          ) : (
            <>
             Confirm & Submit Request

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight
                  size={15}
                />
              </span>
            </>
          )}
        </button>
      </div>

      {/* Privacy reassurance */}
      <p className="mt-4 text-center text-[10px] leading-5 text-slate-400">
        Your details are used only to process
        and respond to this quote request.
      </p>
    </div>
  );
}