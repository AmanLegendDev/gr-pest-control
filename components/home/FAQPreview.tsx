"use client";

import { ArrowUpRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import FAQItem from "./FAQItem";

export interface FAQPreviewItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  featured: boolean;
}

interface FAQPreviewProps {
  faqs: FAQPreviewItem[];
}

export default function FAQPreview({
  faqs,
}: FAQPreviewProps) {
  const items = faqs
    .filter((faq) => faq.question && faq.answer)
    .slice(0, 5);

  if (!items.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Background atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-64 top-20 h-[500px] w-[500px] rounded-full bg-blue-50/60 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-64 bottom-0 h-[500px] w-[500px] rounded-full bg-teal-50/50 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0878E8] sm:text-[11px]">
              <HelpCircle size={14} />

              Frequently Asked
            </div>

            <h2 className="mt-5 max-w-xl text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] text-[#062B63] sm:text-5xl lg:text-[56px]">
              Questions,
              <br />

              <span className="text-[#0878E8]">
                answered clearly.
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-5 lg:items-end">
            <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 lg:text-right">
              Everything you need to know before
              booking a professional pest control
              service with GR Pest Control.
            </p>

            <Link
              href="/faq"
              className="group hidden items-center gap-3 text-sm font-bold text-[#062B63] transition-colors duration-300 hover:text-[#0878E8] sm:inline-flex"
            >
              View all FAQs

              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover:border-blue-200 group-hover:bg-blue-50">
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* FAQ list */}

        <div className="mx-auto mt-12 max-w-4xl space-y-3 sm:mt-14">
          {items.map((faq, index) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              category={faq.category}
              defaultOpen={index === 0}
            />
          ))}
        </div>

        {/* Mobile CTA */}

        <Link
          href="/faq"
          className="group mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#062B63] px-5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#0878E8] sm:hidden"
        >
          View all FAQs

          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}