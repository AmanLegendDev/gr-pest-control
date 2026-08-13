"use client";

import {
  Clock3,
  Moon,
  Sun,
} from "lucide-react";
import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";

import type { SiteSettingsFormValues } from "@/features/settings/schemas/site-settings-schema";

interface SettingsHoursSectionProps {
  control: Control<SiteSettingsFormValues>;
  register: UseFormRegister<SiteSettingsFormValues>;
  errors: FieldErrors<SiteSettingsFormValues>;
}

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export default function SettingsHoursSection({
  control,
  register,
  errors,
}: SettingsHoursSectionProps) {
  const { fields } = useFieldArray({
    control,
    name: "businessHours",
  });

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <Clock3
              size={19}
              aria-hidden="true"
            />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Business Hours
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Set the opening and closing hours customers see on the website.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="space-y-3">
          {fields.map((field, index) => {
            const day =
              DAYS[index] ?? field.day;

            const dayErrors =
              errors.businessHours?.[index];

            return (
              <div
                key={field.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <input
                  type="hidden"
                  value={day}
                  {...register(
                    `businessHours.${index}.day`,
                  )}
                />

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Day */}
                  <div className="flex min-w-0 items-center gap-3 lg:w-40">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#0878E8] shadow-sm ring-1 ring-slate-200">
                      <Clock3
                        size={17}
                        aria-hidden="true"
                      />
                    </div>

                    <span className="text-sm font-semibold text-[#0F172A]">
                      {day}
                    </span>
                  </div>

                  {/* Time */}
                  <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:max-w-md">
                    {/* Opening */}
                    <div>
                      <label
                        htmlFor={`business-hours-${index}-open`}
                        className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#64748B]"
                      >
                        <Sun
                          size={14}
                          aria-hidden="true"
                        />

                        Opens
                      </label>

                      <input
                        id={`business-hours-${index}-open`}
                        type="time"
                        {...register(
                          `businessHours.${index}.open`,
                        )}
                        className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#0F172A] outline-none transition focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    {/* Closing */}
                    <div>
                      <label
                        htmlFor={`business-hours-${index}-close`}
                        className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#64748B]"
                      >
                        <Moon
                          size={14}
                          aria-hidden="true"
                        />

                        Closes
                      </label>

                      <input
                        id={`business-hours-${index}-close`}
                        type="time"
                        {...register(
                          `businessHours.${index}.close`,
                        )}
                        className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#0F172A] outline-none transition focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  {/* Closed */}
                  <label className="flex shrink-0 cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 lg:min-w-32">
                    <input
                      type="checkbox"
                      {...register(
                        `businessHours.${index}.closed`,
                      )}
                      className="h-4 w-4 rounded border-slate-300 accent-[#0878E8] focus:ring-2 focus:ring-blue-200"
                    />

                    <span className="text-sm font-semibold text-[#0F172A]">
                      Closed
                    </span>
                  </label>
                </div>

                {/* Field errors */}
                {dayErrors?.day && (
                  <p
                    role="alert"
                    className="mt-2 text-xs font-medium text-red-600"
                  >
                    {dayErrors.day.message}
                  </p>
                )}

                {dayErrors?.open && (
                  <p
                    role="alert"
                    className="mt-2 text-xs font-medium text-red-600"
                  >
                    {dayErrors.open.message}
                  </p>
                )}

                {dayErrors?.close && (
                  <p
                    role="alert"
                    className="mt-2 text-xs font-medium text-red-600"
                  >
                    {dayErrors.close.message}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {fields.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
            <Clock3
              size={28}
              className="mx-auto text-slate-400"
              aria-hidden="true"
            />

            <p className="mt-3 text-sm font-semibold text-[#0F172A]">
              No business hours configured
            </p>

            <p className="mt-1 text-xs text-[#64748B]">
              Default hours will be added when the settings form is initialized.
            </p>
          </div>
        )}

        <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
          <p className="text-xs leading-5 text-blue-800">
            For a closed day, enable <strong>Closed</strong>. Opening and
            closing times can remain empty for that day.
          </p>
        </div>
      </div>
    </section>
  );
}