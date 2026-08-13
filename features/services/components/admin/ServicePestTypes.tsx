"use client";

import { useState } from "react";
import { Plus, Bug, X } from "lucide-react";
import type {
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import type { CreateServiceInput } from "../../schemas/service-schema";

type ServicePestTypesProps = {
  watch: UseFormWatch<CreateServiceInput>;
  setValue: UseFormSetValue<CreateServiceInput>;
  errors: FieldErrors<CreateServiceInput>;
};

export default function ServicePestTypes({
  watch,
  setValue,
  errors,
}: ServicePestTypesProps) {
  const pestTypes = watch("pestTypes") ?? [];

  const [input, setInput] = useState("");

  const addPestType = () => {
    const value = input.trim();

    if (!value) {
      return;
    }

    const alreadyExists = pestTypes.some(
      (pest) => pest.toLowerCase() === value.toLowerCase()
    );

    if (alreadyExists) {
      setInput("");
      return;
    }

    setValue("pestTypes", [...pestTypes, value], {
      shouldDirty: true,
      shouldValidate: true,
    });

    setInput("");
  };

  const removePestType = (index: number) => {
    setValue(
      "pestTypes",
      pestTypes.filter((_, itemIndex) => itemIndex !== index),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addPestType();
    }
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* HEADER */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <Bug size={19} />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Pest Types
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Add the pest problems this service is designed to handle.
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 sm:p-6">
        <label
          htmlFor="pest-type-input"
          className="mb-2 block text-sm font-semibold text-[#0F172A]"
        >
          Add Pest Type
        </label>

        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="pest-type-input"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={100}
            placeholder="e.g. Cockroaches"
            className="h-11 min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
          />

          <button
            type="button"
            onClick={addPestType}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0878E8] px-4 text-sm font-semibold text-white transition hover:bg-[#066acb] focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
          >
            <Plus size={17} />
            Add
          </button>
        </div>

        <p className="mt-2 text-xs text-[#64748B]">
          Press Enter or click Add to add another pest type.
        </p>

        {/* SELECTED PEST TYPES */}
        {pestTypes.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-[#0F172A]">
              Selected Pest Types
            </p>

            <div className="flex flex-wrap gap-2">
              {pestTypes.map((pest, index) => (
                <div
                  key={`${pest}-${index}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-medium text-[#062B63]"
                >
                  <span>{pest}</span>

                  <button
                    type="button"
                    onClick={() => removePestType(index)}
                    aria-label={`Remove ${pest}`}
                    className="inline-flex h-5 w-5 items-center justify-center rounded-md text-[#64748B] transition hover:bg-white hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {pestTypes.length === 0 && (
          <div className="mt-5 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center">
            <p className="text-sm text-[#64748B]">
              No pest types added yet.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Add the pest problems customers may need help with.
            </p>
          </div>
        )}

        {/* VALIDATION ERROR */}
        {errors.pestTypes?.message && (
          <p className="mt-2 text-sm text-red-600">
            {String(errors.pestTypes.message)}
          </p>
        )}
      </div>
    </section>
  );
}