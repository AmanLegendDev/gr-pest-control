"use client";

import { useState } from "react";
import { CheckCircle2, Plus, X } from "lucide-react";
import type {
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import type { CreateServiceInput } from "../../schemas/service-schema";

type ServiceBenefitsProps = {
  watch: UseFormWatch<CreateServiceInput>;
  setValue: UseFormSetValue<CreateServiceInput>;
  errors: FieldErrors<CreateServiceInput>;
};

export default function ServiceBenefits({
  watch,
  setValue,
  errors,
}: ServiceBenefitsProps) {
  const benefits = watch("benefits") ?? [];

  const [input, setInput] = useState("");

  const addBenefit = () => {
    const value = input.trim();

    if (!value) {
      return;
    }

    const alreadyExists = benefits.some(
      (benefit) => benefit.toLowerCase() === value.toLowerCase()
    );

    if (alreadyExists) {
      setInput("");
      return;
    }

    setValue("benefits", [...benefits, value], {
      shouldDirty: true,
      shouldValidate: true,
    });

    setInput("");
  };

  const removeBenefit = (index: number) => {
    setValue(
      "benefits",
      benefits.filter((_, itemIndex) => itemIndex !== index),
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
      addBenefit();
    }
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* HEADER */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-[#39A935]">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              Service Benefits
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Highlight the practical benefits of choosing this service.
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 sm:p-6">
        <label
          htmlFor="service-benefit-input"
          className="mb-2 block text-sm font-semibold text-[#0F172A]"
        >
          Add Benefit
        </label>

        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="service-benefit-input"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={300}
            placeholder="e.g. Targeted treatment for common household pests"
            className="h-11 min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#39A935] focus:ring-2 focus:ring-green-100"
          />

          <button
            type="button"
            onClick={addBenefit}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#39A935] px-4 text-sm font-semibold text-white transition hover:bg-[#318f2e] focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-1"
          >
            <Plus size={17} />
            Add
          </button>
        </div>

        <p className="mt-2 text-xs text-[#64748B]">
          Press Enter or click Add to add another benefit.
        </p>

        {/* BENEFITS */}
        {benefits.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-[#0F172A]">
              Added Benefits
            </p>

            <div className="space-y-2">
              {benefits.map((benefit, index) => (
                <div
                  key={`${benefit}-${index}`}
                  className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-[#39A935]"
                  />

                  <p className="min-w-0 flex-1 text-sm leading-6 text-[#0F172A]">
                    {benefit}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeBenefit(index)}
                    aria-label={`Remove benefit: ${benefit}`}
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#64748B] transition hover:bg-white hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {benefits.length === 0 && (
          <div className="mt-5 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center">
            <p className="text-sm text-[#64748B]">
              No benefits added yet.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Add clear, genuine benefits supported by the business.
            </p>
          </div>
        )}

        {/* VALIDATION ERROR */}
        {errors.benefits?.message && (
          <p className="mt-2 text-sm text-red-600">
            {String(errors.benefits.message)}
          </p>
        )}
      </div>
    </section>
  );
}