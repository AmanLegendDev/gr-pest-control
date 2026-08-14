"use client";

import { Mail, Phone, User } from "lucide-react";

import type { QuoteFormData } from "@/features/quote-requests/types/quoteRequest";
import { QUOTE_FORM_COPY } from "./quote.constants";

interface QuoteStepOneProps {
  data: QuoteFormData["customer"];

  onChange: (
    field: keyof QuoteFormData["customer"],
    value: string,
  ) => void;

  errors?: {
    name?: string;
    phone?: string;
    email?: string;
  };
}

export default function QuoteStepOne({
  data,
  onChange,
  errors = {},
}: QuoteStepOneProps) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="max-w-2xl">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0878E8]">
          Step 1
        </p>

        <h1 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] text-[#062B63] sm:text-3xl">
          {QUOTE_FORM_COPY.stepOne.title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
          {QUOTE_FORM_COPY.stepOne.description}
        </p>
      </div>

      {/* Form fields */}
      <div className="mt-8 space-y-5">
        {/* Full name */}
        <div>
          <label
            htmlFor="quote-name"
            className="mb-2 block text-sm font-bold text-[#062B63]"
          >
            Full name
            <span className="ml-1 text-[#0878E8]">
              *
            </span>
          </label>

          <div className="relative">
            <User
              aria-hidden="true"
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="quote-name"
              name="name"
              type="text"
              autoComplete="name"
              value={data.name}
              onChange={(event) =>
                onChange(
                  "name",
                  event.target.value,
                )
              }
              placeholder="Enter your full name"
              className={`
                h-13
                w-full
                rounded-2xl
                border
                bg-white
                pl-11
                pr-4
                text-sm
                font-medium
                text-[#062B63]
                outline-none
                transition-all
                placeholder:text-slate-400
                focus:ring-4
                ${
                  errors.name
                    ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                    : "border-slate-200 focus:border-[#0878E8] focus:ring-blue-50"
                }
              `}
            />
          </div>

          {errors.name && (
            <p className="mt-2 text-xs font-medium text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="quote-phone"
            className="mb-2 block text-sm font-bold text-[#062B63]"
          >
            Phone number
            <span className="ml-1 text-[#0878E8]">
              *
            </span>
          </label>

          <div className="relative">
            <Phone
              aria-hidden="true"
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="quote-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={data.phone}
              onChange={(event) =>
                onChange(
                  "phone",
                  event.target.value,
                )
              }
              placeholder="Enter your phone number"
              className={`
                h-13
                w-full
                rounded-2xl
                border
                bg-white
                pl-11
                pr-4
                text-sm
                font-medium
                text-[#062B63]
                outline-none
                transition-all
                placeholder:text-slate-400
                focus:ring-4
                ${
                  errors.phone
                    ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                    : "border-slate-200 focus:border-[#0878E8] focus:ring-blue-50"
                }
              `}
            />
          </div>

          {errors.phone && (
            <p className="mt-2 text-xs font-medium text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="quote-email"
            className="mb-2 block text-sm font-bold text-[#062B63]"
          >
            Email address
            <span className="ml-2 text-xs font-medium text-slate-400">
              Optional
            </span>
          </label>

          <div className="relative">
            <Mail
              aria-hidden="true"
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="quote-email"
              name="email"
              type="email"
              autoComplete="email"
              value={data.email}
              onChange={(event) =>
                onChange(
                  "email",
                  event.target.value,
                )
              }
              placeholder="you@example.com"
              className={`
                h-13
                w-full
                rounded-2xl
                border
                bg-white
                pl-11
                pr-4
                text-sm
                font-medium
                text-[#062B63]
                outline-none
                transition-all
                placeholder:text-slate-400
                focus:border-[#0878E8]
                focus:ring-4
                focus:ring-blue-50
                ${
                  errors.email
                    ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                    : "border-slate-200"
                }
              `}
            />
          </div>

          {errors.email && (
            <p className="mt-2 text-xs font-medium text-red-600">
              {errors.email}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}