"use client";

import { ChevronDown } from "lucide-react";
import {
  useEffect,
  useState,
} from "react";

interface FAQAccordionItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  featured: boolean;
}

interface FAQAccordionProps {
  items: FAQAccordionItem[];
}

export default function FAQAccordion({
  items,
}: FAQAccordionProps) {
  const [openId, setOpenId] =
    useState<string | null>(
      items[0]?.id ?? null,
    );

  useEffect(() => {
    if (
      openId &&
      items.some(
        (item) => item.id === openId,
      )
    ) {
      return;
    }

    setOpenId(
      items[0]?.id ?? null,
    );
  }, [items, openId]);

  if (items.length === 0) {
    return (
      <div
        className="
          rounded-[26px]
          border
          border-slate-100
          bg-white
          px-6
          py-12
          text-center
          shadow-[0_8px_30px_rgba(15,23,42,0.035)]
        "
      >
        <p
          className="
            text-sm
            font-extrabold
            text-[#062B63]
          "
        >
          No questions found.
        </p>

        <p
          className="
            mt-2
            text-xs
            leading-6
            text-slate-400
          "
        >
          Try a different search or choose
          another category.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-[28px]
        border
        border-slate-100
        bg-white
        shadow-[0_10px_35px_rgba(15,23,42,0.04)]
      "
    >
      {items.map(
        (item, index) => {
          const isOpen =
            openId === item.id;

          const panelId =
            `faq-panel-${item.id}`;

          const buttonId =
            `faq-button-${item.id}`;

          return (
          <div
  id={`faq-item-${item.id}`}
  key={item.id}
  className={`
    ${
      index !==
      items.length - 1
        ? "border-b border-slate-100"
        : ""
    }
  `}
>
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={
                    isOpen
                  }
                  aria-controls={
                    panelId
                  }
                  onClick={() =>
                    setOpenId(
                      isOpen
                        ? null
                        : item.id,
                    )
                  }
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-5
                    px-5
                    py-5
                    text-left
                    transition-colors
                    duration-200
                    hover:bg-[#F8FAFC]
                    focus:outline-none
                    focus-visible:bg-blue-50/50
                    focus-visible:ring-2
                    focus-visible:ring-inset
                    focus-visible:ring-[#0878E8]
                    sm:px-7
                    sm:py-6
                  "
                >
                  <span
                    className="
                      flex
                      min-w-0
                      items-start
                      gap-3
                      sm:gap-4
                    "
                  >
                    {/* Number */}

                    <span
                      className={`
                        mt-0.5
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        text-[9px]
                        font-extrabold
                        transition-all
                        duration-200
                        ${
                          isOpen
                            ? "bg-[#0878E8] text-white"
                            : "bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#0878E8]"
                        }
                      `}
                    >
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    {/* Question */}

                    <span
                      className={`
                        text-sm
                        font-extrabold
                        leading-6
                        tracking-[-0.015em]
                        transition-colors
                        duration-200
                        sm:text-base
                        ${
                          isOpen
                            ? "text-[#0878E8]"
                            : "text-[#062B63] group-hover:text-[#0878E8]"
                        }
                      `}
                    >
                      {
                        item.question
                      }
                    </span>
                  </span>

                  {/* Chevron */}

                  <span
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      transition-all
                      duration-300
                      ${
                        isOpen
                          ? "rotate-180 bg-blue-50 text-[#0878E8]"
                          : "bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#0878E8]"
                      }
                    `}
                  >
                    <ChevronDown
                      size={16}
                    />
                  </span>
                </button>
              </h3>

              {/* Answer */}

              <div
                id={panelId}
                role="region"
                aria-labelledby={
                  buttonId
                }
                hidden={!isOpen}
                className="
                  px-5
                  pb-6
                  pl-15
                  sm:px-7
                  sm:pb-7
                  sm:pl-[4.5rem]
                "
              >
                <div
                  className="
                    max-w-3xl
                    border-l-2
                    border-blue-100
                    pl-4
                    sm:pl-5
                  "
                >
                  <p
                    className="
                      text-sm
                      leading-7
                      text-slate-500
                      sm:text-[15px]
                      sm:leading-7
                    "
                  >
                    {
                      item.answer
                    }
                  </p>
                </div>
              </div>
            </div>
          );
        },
      )}
    </div>
  );
}