"use client";

import { Check } from "lucide-react";

import { QUOTE_STEPS } from "./quote.constants";

interface QuoteProgressProps {
  currentStep: number;
}

export default function QuoteProgress({
  currentStep,
}: QuoteProgressProps) {
  return (
    <div className="w-full">
      {/* Desktop progress */}
      <div className="hidden items-center sm:flex">
        {QUOTE_STEPS.map((step, index) => {
          const completed =
            currentStep > step.id;

          const active =
            currentStep === step.id;

          const isLast =
            index === QUOTE_STEPS.length - 1;

          return (
            <div
              key={step.id}
              className="flex min-w-0 flex-1 items-center"
            >
              {/* Step */}
              <div className="flex items-center gap-3">
                <div
                  className={`
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    text-xs
                    font-extrabold
                    transition-all
                    duration-300
                    ${
                      completed
                        ? "border-[#0878E8] bg-[#0878E8] text-white"
                        : active
                          ? "border-[#0878E8] bg-blue-50 text-[#0878E8] shadow-[0_0_0_5px_rgba(8,120,232,0.08)]"
                          : "border-slate-200 bg-white text-slate-400"
                    }
                  `}
                >
                  {completed ? (
                    <Check
                      size={16}
                      strokeWidth={2.5}
                    />
                  ) : (
                    step.id
                  )}
                </div>

                <div className="min-w-0">
                  <p
                    className={`
                      text-xs
                      font-bold
                      transition-colors
                      ${
                        active ||
                        completed
                          ? "text-[#062B63]"
                          : "text-slate-400"
                      }
                    `}
                  >
                    {step.label}
                  </p>

                  <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                    Step {step.id} of{" "}
                    {QUOTE_STEPS.length}
                  </p>
                </div>
              </div>

              {/* Connector */}
              {!isLast && (
                <div
                  className={`
                    mx-4
                    h-px
                    flex-1
                    min-w-8
                    transition-colors
                    duration-300
                    ${
                      completed
                        ? "bg-[#0878E8]"
                        : "bg-slate-200"
                    }
                  `}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile progress */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0878E8]">
              Step {currentStep} of{" "}
              {QUOTE_STEPS.length}
            </p>

            <p className="mt-1 text-sm font-extrabold text-[#062B63]">
              {
                QUOTE_STEPS[
                  currentStep - 1
                ]?.label
              }
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-xs font-extrabold text-[#0878E8]">
            {currentStep}
          </div>
        </div>

        {/* Mobile progress bar */}
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#0878E8] transition-all duration-500 ease-out"
            style={{
              width: `${
                (currentStep /
                  QUOTE_STEPS.length) *
                100
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}