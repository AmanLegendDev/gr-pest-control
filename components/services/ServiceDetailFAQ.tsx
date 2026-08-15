"use client";

import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
} from "lucide-react";

interface ServiceFAQ {
  question: string;
  answer: string;
  sortOrder: number;
}

interface ServiceDetailFAQProps {
  faqs: ServiceFAQ[];
}

export default function ServiceDetailFAQ({
  faqs,
}: ServiceDetailFAQProps) {
  const sortedFaqs = [...faqs].sort(
    (a, b) =>
      a.sortOrder - b.sortOrder,
  );

  const [openIndex, setOpenIndex] =
    useState<number | null>(0);

  if (sortedFaqs.length === 0) {
    return null;
  }

  return (
    <section
      className="
        bg-white
        px-4
        py-16
        sm:px-6
        sm:py-20
        lg:px-8
        lg:py-24
      "
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <div
            className="
              mx-auto
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-blue-50
              text-[#0878E8]
            "
          >
            <HelpCircle
              size={22}
              strokeWidth={1.8}
            />
          </div>

          <p
            className="
              mt-5
              text-[10px]
              font-extrabold
              uppercase
              tracking-[0.16em]
              text-[#0878E8]
            "
          >
            Frequently asked
          </p>

          <h2
            className="
              mt-2
              text-2xl
              font-extrabold
              tracking-[-0.035em]
              text-[#062B63]
              sm:text-3xl
            "
          >
            Questions about this service?
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-slate-500
              sm:text-base
              sm:leading-7
            "
          >
            Here are some common questions
            about this service. If you still
            need help, you can always request
            a quote and speak with our team.
          </p>
        </div>

        {/* FAQ list */}
        <div className="mt-10 space-y-3">
          {sortedFaqs.map(
            (faq, index) => {
              const isOpen =
                openIndex === index;

              return (
                <div
                  key={`${faq.sortOrder}-${faq.question}`}
                  className={`
                    overflow-hidden
                    rounded-2xl
                    border
                    transition-all
                    duration-200
                    ${
                      isOpen
                        ? "border-blue-100 bg-[#F8FAFC] shadow-sm"
                        : "border-slate-200 bg-white"
                    }
                  `}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex(
                        isOpen
                          ? null
                          : index,
                      )
                    }
                    aria-expanded={isOpen}
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-5
                      px-5
                      py-5
                      text-left
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#0878E8]
                      focus-visible:ring-inset
                      sm:px-6
                    "
                  >
                    <span
                      className={`
                        text-sm
                        font-extrabold
                        leading-6
                        ${
                          isOpen
                            ? "text-[#0878E8]"
                            : "text-[#062B63]"
                        }
                      `}
                    >
                      {faq.question}
                    </span>

                    <span
                      className={`
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        transition-all
                        duration-200
                        ${
                          isOpen
                            ? "bg-[#0878E8] text-white"
                            : "bg-slate-100 text-slate-500"
                        }
                      `}
                    >
                      <ChevronDown
                        size={16}
                        className={`
                          transition-transform
                          duration-200
                          ${
                            isOpen
                              ? "rotate-180"
                              : ""
                          }
                        `}
                      />
                    </span>
                  </button>

                  <div
                    className={`
                      grid
                      transition-[grid-template-rows,opacity]
                      duration-200
                      ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }
                    `}
                  >
                    <div className="overflow-hidden">
                      <div
                        className="
                          border-t
                          border-slate-200/80
                          px-5
                          pb-5
                          pt-4
                          sm:px-6
                        "
                      >
                        <p
                          className="
                            text-sm
                            leading-7
                            text-slate-500
                          "
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            },
          )}
        </div>

        {/* Bottom help */}
        <div
          className="
            mt-8
            rounded-2xl
            border
            border-slate-200
            bg-[#F8FAFC]
            p-5
            text-center
            sm:p-6
          "
        >
          <p
            className="
              text-sm
              font-bold
              text-[#062B63]
            "
          >
            Still unsure?
          </p>

          <p
            className="
              mt-1.5
              text-xs
              leading-5
              text-slate-500
            "
          >
            Tell us about your property and
            the problem you're experiencing.
            We'll help you with the next step.
          </p>
        </div>
      </div>
    </section>
  );
}