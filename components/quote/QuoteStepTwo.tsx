"use client";

import {
  Bug,
  Building2,
  ChevronDown,
  Home,
  MapPin,
} from "lucide-react";

import type { QuoteFormData } from "@/features/quote-requests/types/quoteRequest";
import {
  PROPERTY_TYPES,
  QUOTE_FORM_COPY,
} from "./quote.constants";

interface ServiceOption {
  id: string;
  title: string;
  slug: string;
}

interface QuoteStepTwoProps {
  data: Pick<
    QuoteFormData,
    | "serviceId"
    | "propertyType"
    | "location"
    | "pestProblem"
  >;

  services: ServiceOption[];

  onChange: (
    field:
      | "serviceId"
      | "propertyType"
      | "pestProblem",
    value: string,
  ) => void;

  onLocationChange: (
    field: keyof QuoteFormData["location"],
    value: string,
  ) => void;

  errors?: {
    serviceId?: string;
    propertyType?: string;
    suburb?: string;
    address?: string;
    pestProblem?: string;
  };
}

export default function QuoteStepTwo({
  data,
  services,
  onChange,
  onLocationChange,
  errors = {},
}: QuoteStepTwoProps) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="max-w-2xl">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0878E8]">
          Step 2
        </p>

        <h1 className="mt-2 text-2xl font-extrabold tracking-[-0.035em] text-[#062B63] sm:text-3xl">
          {QUOTE_FORM_COPY.stepTwo.title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
          {QUOTE_FORM_COPY.stepTwo.description}
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {/* Service */}
        <div>
          <label
            htmlFor="quote-service"
            className="mb-2 block text-sm font-bold text-[#062B63]"
          >
            Service
            <span className="ml-1 text-[#0878E8]">
              *
            </span>
          </label>

          <div className="relative">
            <Bug
              aria-hidden="true"
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
            />

            <select
              id="quote-service"
              name="serviceId"
              value={data.serviceId}
              onChange={(event) =>
                onChange(
                  "serviceId",
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
                  data.serviceId
                    ? "text-[#062B63]"
                    : "text-slate-400"
                }
                ${
                  errors.serviceId
                    ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                    : "border-slate-200 focus:border-[#0878E8] focus:ring-blue-50"
                }
              `}
            >
              <option value="">
                Select a service
              </option>

              {services.map((service) => (
                <option
                  key={service.id}
                  value={service.id}
                >
                  {service.title}
                </option>
              ))}
            </select>

            <ChevronDown
              aria-hidden="true"
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          {errors.serviceId && (
            <p className="mt-2 text-xs font-medium text-red-600">
              {errors.serviceId}
            </p>
          )}
        </div>

        {/* Property type */}
        <div>
          <div className="mb-2">
            <p className="text-sm font-bold text-[#062B63]">
              Property type
              <span className="ml-1 text-[#0878E8]">
                *
              </span>
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {PROPERTY_TYPES.map((property) => {
              const selected =
                data.propertyType ===
                property.value;

              const Icon =
                property.value ===
                "residential"
                  ? Home
                  : Building2;

              return (
                <button
                  key={property.value}
                  type="button"
                  onClick={() =>
                    onChange(
                      "propertyType",
                      property.value,
                    )
                  }
                  className={`
                    group
                    flex
                    min-h-[88px]
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    px-4
                    text-left
                    transition-all
                    duration-200
                    ${
                      selected
                        ? "border-[#0878E8] bg-blue-50/70 shadow-[0_0_0_4px_rgba(8,120,232,0.06)]"
                        : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                    }
                  `}
                  aria-pressed={
                    selected
                  }
                >
                  <span
                    className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      transition-colors
                      ${
                        selected
                          ? "bg-[#0878E8] text-white"
                          : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-[#0878E8]"
                      }
                    `}
                  >
                    <Icon size={19} />
                  </span>

                  <span className="min-w-0">
                    <span
                      className={`
                        block
                        text-sm
                        font-bold
                        ${
                          selected
                            ? "text-[#062B63]"
                            : "text-slate-700"
                        }
                      `}
                    >
                      {property.label}
                    </span>

                    <span className="mt-0.5 block text-[11px] leading-4 text-slate-400">
                      {property.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {errors.propertyType && (
            <p className="mt-2 text-xs font-medium text-red-600">
              {errors.propertyType}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Suburb */}
          <div>
            <label
              htmlFor="quote-suburb"
              className="mb-2 block text-sm font-bold text-[#062B63]"
            >
              Suburb
              <span className="ml-1 text-[#0878E8]">
                *
              </span>
            </label>

            <div className="relative">
              <MapPin
                aria-hidden="true"
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="quote-suburb"
                name="suburb"
                type="text"
                autoComplete="address-level2"
                value={data.location.suburb}
                onChange={(event) =>
                  onLocationChange(
                    "suburb",
                    event.target.value,
                  )
                }
                placeholder="e.g. Parramatta"
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
                    errors.suburb
                      ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                      : "border-slate-200 focus:border-[#0878E8] focus:ring-blue-50"
                  }
                `}
              />
            </div>

            {errors.suburb && (
              <p className="mt-2 text-xs font-medium text-red-600">
                {errors.suburb}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="quote-address"
              className="mb-2 block text-sm font-bold text-[#062B63]"
            >
              Address
              <span className="ml-1 text-[#0878E8]">
                *
              </span>
            </label>

            <div className="relative">
              <MapPin
                aria-hidden="true"
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="quote-address"
                name="address"
                type="text"
                autoComplete="street-address"
                value={data.location.address}
                onChange={(event) =>
                  onLocationChange(
                    "address",
                    event.target.value,
                  )
                }
                placeholder="Street address"
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
                    errors.address
                      ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                      : "border-slate-200 focus:border-[#0878E8] focus:ring-blue-50"
                  }
                `}
              />
            </div>

            {errors.address && (
              <p className="mt-2 text-xs font-medium text-red-600">
                {errors.address}
              </p>
            )}
          </div>
        </div>

        {/* Pest problem */}
        <div>
          <label
            htmlFor="quote-pest-problem"
            className="mb-2 block text-sm font-bold text-[#062B63]"
          >
            Pest problem / short description
            <span className="ml-1 text-[#0878E8]">
              *
            </span>
          </label>

          <div className="relative">
            <Bug
              aria-hidden="true"
              size={18}
              className="pointer-events-none absolute left-4 top-4 text-slate-400"
            />

            <textarea
              id="quote-pest-problem"
              name="pestProblem"
              rows={4}
              value={data.pestProblem}
              onChange={(event) =>
                onChange(
                  "pestProblem",
                  event.target.value,
                )
              }
              placeholder="Briefly tell us what pest problem you're experiencing..."
              className={`
                min-h-[120px]
                w-full
                resize-none
                rounded-2xl
                border
                bg-white
                py-3.5
                pl-11
                pr-4
                text-sm
                font-medium
                leading-6
                text-[#062B63]
                outline-none
                transition-all
                placeholder:text-slate-400
                focus:ring-4
                ${
                  errors.pestProblem
                    ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                    : "border-slate-200 focus:border-[#0878E8] focus:ring-blue-50"
                }
              `}
            />
          </div>

          <div className="mt-2 flex items-start justify-between gap-3">
            {errors.pestProblem ? (
              <p className="text-xs font-medium text-red-600">
                {errors.pestProblem}
              </p>
            ) : (
              <p className="text-[11px] leading-5 text-slate-400">
                A short description helps our team
                understand what you need.
              </p>
            )}

            <span className="shrink-0 text-[10px] font-medium text-slate-400">
              {data.pestProblem.length}/1000
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}