"use client";

import { MapPinned, Plus, Trash2 } from "lucide-react";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { useFieldArray } from "react-hook-form";

import type { ServiceAreaFormValues } from "@/features/service-areas/schemas/service-area-schema";

interface ServiceAreaNearbyAreasSectionProps {
  control: Control<ServiceAreaFormValues>;
  register: UseFormRegister<ServiceAreaFormValues>;
  errors: FieldErrors<ServiceAreaFormValues>;
}

export default function ServiceAreaNearbyAreasSection({
  control,
  register,
  errors,
}: ServiceAreaNearbyAreasSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "nearbyAreas",
  });

  const addNearbyArea = () => {
    append("");
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
              <MapPinned size={19} aria-hidden="true" />
            </div>

            <div>
              <h2 className="font-semibold text-[#0F172A]">
                Nearby Service Areas
              </h2>

              <p className="mt-1 text-sm text-[#64748B]">
                Add nearby locations that are genuinely relevant to this
                service area.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={addNearbyArea}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0878E8] px-4 text-sm font-semibold text-white transition hover:bg-[#066BCF] focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
          >
            <Plus size={16} aria-hidden="true" />
            Add Nearby Area
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {fields.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
            <MapPinned
              size={30}
              className="mx-auto text-slate-400"
              aria-hidden="true"
            />

            <p className="mt-3 text-sm font-semibold text-[#0F172A]">
              No nearby areas added
            </p>

            <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-[#64748B]">
              Add nearby locations only when they are actually relevant to
              the business service coverage.
            </p>

            <button
              type="button"
              onClick={addNearbyArea}
              className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-[#0F172A] transition hover:border-[#0878E8] hover:text-[#0878E8] focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <Plus size={14} aria-hidden="true" />
              Add First Area
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {fields.map((field, index) => {
              const fieldError = errors.nearbyAreas?.[index];

              return (
                <div
                  key={field.id}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#0878E8] shadow-sm">
                    <MapPinned
                      size={17}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <label
                      htmlFor={`nearby-area-${index}`}
                      className="mb-1.5 block text-xs font-semibold text-[#64748B]"
                    >
                      Nearby Area {index + 1}
                    </label>

                    <input
                      id={`nearby-area-${index}`}
                      type="text"
                      placeholder="e.g. Sanjauli"
                      {...register(`nearbyAreas.${index}`)}
                      aria-invalid={Boolean(fieldError)}
                      aria-describedby={
                        fieldError
                          ? `nearby-area-${index}-error`
                          : undefined
                      }
                      className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
                        fieldError
                          ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-300 focus:border-[#0878E8] focus:ring-blue-100"
                      }`}
                    />

                    {fieldError?.message && (
                      <p
                        id={`nearby-area-${index}-error`}
                        role="alert"
                        className="mt-1.5 text-xs font-medium text-red-600"
                      >
                        {fieldError.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => remove(index)}
                    aria-label={`Remove nearby area ${index + 1}`}
                    className="mt-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-200 bg-white text-red-500 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {fields.length > 0 && (
          <p className="mt-4 text-xs leading-5 text-[#64748B]">
            Only add locations that are genuinely relevant to this service
            area. Avoid creating artificial location lists for SEO.
          </p>
        )}
      </div>
    </section>
  );
}