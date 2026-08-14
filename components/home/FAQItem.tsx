"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
  category?: string;
  defaultOpen?: boolean;
}

export default function FAQItem({
  question,
  answer,
  category,
  defaultOpen = false,
}: FAQItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      layout
      className={`
        overflow-hidden
        rounded-[22px]
        border
        transition-all
        duration-300
        ${
          open
            ? "border-blue-100 bg-blue-50/40 shadow-[0_12px_35px_rgba(8,120,232,0.07)]"
            : "border-slate-200/80 bg-white hover:border-blue-100"
        }
      `}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6 sm:py-6"
      >
        <div className="min-w-0">
          {category && (
            <span className="mb-2 block text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#0FAF9F]">
              {category}
            </span>
          )}

          <span
            className={`
              block
              text-sm
              font-bold
              leading-6
              transition-colors
              duration-300
              sm:text-base
              ${
                open
                  ? "text-[#0878E8]"
                  : "text-[#062B63]"
              }
            `}
          >
            {question}
          </span>
        </div>

        <span
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            transition-all
            duration-300
            ${
              open
                ? "border-blue-200 bg-[#0878E8] text-white"
                : "border-slate-200 bg-slate-50 text-[#062B63]"
            }
          `}
        >
          <ChevronDown
            size={17}
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          <div className="h-px bg-blue-100" />

          <p className="pt-4 text-sm leading-6 text-slate-600 sm:text-[15px] sm:leading-7">
            {answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}