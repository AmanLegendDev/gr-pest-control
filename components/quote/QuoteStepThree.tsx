"use client";

import {
  CalendarDays,
  ChevronDown,
  Clock3,
} from "lucide-react";

import type { QuoteFormData } from "@/features/quote-requests/types/quoteRequest";
import {
  PREFERRED_TIME_SLOTS,
  QUOTE_FORM_COPY,
} from "./quote.constants";

interface QuoteStepThreeProps {
  data: Pick<
    QuoteFormData,
    "preferredDate" | "preferredTime"
  >;

  onChange: (
    field:
      | "preferredDate"
      | "preferredTime",
    value: string,
  ) => void;

  errors?: {
    preferredDate?: string;
    preferredTime?: string;
  };
}

export default function QuoteStepThree({
  data,
  onChange,
  errors = {},
}: QuoteStepThreeProps) {
  /*
   * Today's date prevents customers from
   * selecting a date in the past.
   */
  const today = new Date()
    .toISOString()
    .split("T")[0];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="max-w-2xl">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0878E8]">
          Step 3
        </p>

        <h1 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] text-[#062B63] sm:text-3xl">
          {QUOTE_FORM_COPY.stepThree.title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
          {QUOTE_FORM_COPY.stepThree.description}
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {/* Preferred date */}
        <div>
          <label
            htmlFor="quote-date"
            className="mb-2 block text-sm font-bold text-[#062B63]"
          >
            Preferred date
            <span className="ml-1 text-[#0878E8]">
              *
            </span>
          </label>

          <div className="relative">
            <CalendarDays
              aria-hidden="true"
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="quote-date"
              name="preferredDate"
              type="date"
              min={today}
              value={data.preferredDate}
              onChange={(event) =>
                onChange(
                  "preferredDate",
                  event.target.value,
                )
              }
              className={`
                h-13
                w-full
                rounded-2xl
                border
                bg-white
                px-4
                pl-11
                text-sm
                font-medium
                text-[#062B63]
                outline-none
                transition-all
                focus:ring-4
                ${
                  errors.preferredDate
                    ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                    : "border-slate-200 focus:border-[#0878E8] focus:ring-blue-50"
                }
              `}
            />
          </div>

          {errors.preferredDate && (
            <p className="mt-2 text-xs font-medium text-red-600">
              {errors.preferredDate}
            </p>
          )}

          {!errors.preferredDate && (
            <p className="mt-2 text-[11px] leading-5 text-slate-400">
              Choose the date that would suit you
              best. Our team will confirm availability.
            </p>
          )}
        </div>

        {/* Preferred time */}
        <div>
          <label
            htmlFor="quote-time"
            className="mb-2 block text-sm font-bold text-[#062B63]"
          >
            Preferred time
            <span className="ml-1 text-[#0878E8]">
              *
            </span>
          </label>

          <div className="relative">
            <Clock3
              aria-hidden="true"
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              id="quote-time"
              name="preferredTime"
              value={data.preferredTime}
              onChange={(event) =>
                onChange(
                  "preferredTime",
                  event.target.value,
                )
              }
              className={`
                h-13
                w-full
                appearance-none
                rounded-2xl
                border
                bg-white
                pl-11
                pr-11
                text-sm
                font-medium
                outline-none
                transition-all
                focus:ring-4
                ${
                  data.preferredTime
                    ? "text-[#062B63]"
                    : "text-slate-400"
                }
                ${
                  errors.preferredTime
                    ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                    : "border-slate-200 focus:border-[#0878E8] focus:ring-blue-50"
                }
              `}
            >
              <option value="">
                Select a preferred time
              </option>

              {PREFERRED_TIME_SLOTS.map(
                (slot) => (
                  <option
                    key={slot.value}
                    value={slot.value}
                  >
                    {slot.label}
                  </option>
                ),
              )}
            </select>

            <ChevronDown
              aria-hidden="true"
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          {errors.preferredTime && (
            <p className="mt-2 text-xs font-medium text-red-600">
              {errors.preferredTime}
            </p>
          )}
        </div>

        {/* Confirmation note */}
        <div className="flex gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#0878E8] shadow-sm">
            <Clock3 size={16} />
          </div>

          <div>
            <p className="text-xs font-bold text-[#062B63]">
              Preferred time, not a confirmed
              appointment
            </p>

            <p className="mt-1 text-[11px] leading-5 text-slate-500">
              We’ll review your request and
              contact you to confirm the
              appointment time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}