"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ClipboardCheck,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Assess",
    description:
      "We start by understanding the property, the pest activity and the areas where you are experiencing problems.",
    icon: Search,
  },
  {
    number: "02",
    title: "Understand",
    description:
      "We identify the likely pest problem and consider the property and conditions involved before recommending an approach.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "Treat",
    description:
      "An appropriate treatment approach is carried out based on the pest problem and the needs of the property.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Protect",
    description:
      "We provide practical recommendations that can help reduce conditions that may encourage future pest activity.",
    icon: Sparkles,
  },
];

export default function ProcessSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-52 top-20 h-[500px] w-[500px] rounded-full bg-blue-50/70 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-52 bottom-0 h-[460px] w-[460px] rounded-full bg-teal-50/50 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* ======================================================
            HEADER
        ======================================================= */}

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
            amount: 0.25,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0878E8] sm:text-[11px]">
            <Sparkles
              size={14}
              strokeWidth={2.2}
            />

            How It Works
          </div>

          <h2 className="mt-5 text-4xl font-extrabold leading-[1.03] tracking-[-0.045em] text-[#062B63] sm:text-5xl lg:text-[58px]">
            A simple process.
            <span className="text-[#0878E8]">
              {" "}
              Professional from start to finish.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            From understanding the problem to taking
            practical action, we keep the process clear,
            straightforward and focused on your property.
          </p>
        </motion.div>

        {/* ======================================================
            DESKTOP PROCESS
        ======================================================= */}

        <div className="relative mt-14 hidden lg:block">
          {/* Connecting line */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-[31px] h-px bg-gradient-to-r from-blue-100 via-[#0878E8]/30 to-teal-100"
          />

          <div className="grid grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{
                    opacity: 0,
                    y: 24,
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
                    duration: 0.55,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative text-center"
                >
                  {/* Step circle */}
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-blue-100 bg-white text-[#0878E8] shadow-[0_8px_25px_rgba(8,120,232,0.10)] transition-all duration-300 group-hover:border-[#0878E8] group-hover:bg-[#0878E8] group-hover:text-white group-hover:shadow-[0_12px_30px_rgba(8,120,232,0.20)]">
                    <Icon
                      size={23}
                      strokeWidth={2}
                    />

                    {/* Number */}
                    <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full border border-white bg-[#062B63] px-1 text-[9px] font-bold text-white shadow-sm">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-extrabold tracking-[-0.02em] text-[#062B63]">
                    {step.title}
                  </h3>

                  <p className="mx-auto mt-3 max-w-[250px] text-sm leading-6 text-slate-500">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ======================================================
            MOBILE / TABLET PROCESS
        ======================================================= */}

        <div className="relative mt-12 lg:hidden">
          {/* Vertical line */}
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[27px] top-8 w-px bg-gradient-to-b from-blue-100 via-[#0878E8]/30 to-teal-100"
          />

          <div className="space-y-7">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{
                    opacity: 0,
                    x: -15,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex gap-5"
                >
                  {/* Icon */}
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-white text-[#0878E8] shadow-[0_6px_20px_rgba(8,120,232,0.10)]">
                    <Icon
                      size={20}
                      strokeWidth={2}
                    />

                    <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#062B63] px-1 text-[8px] font-bold text-white">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_6px_25px_rgba(15,23,42,0.04)]">
                    <h3 className="text-lg font-extrabold tracking-[-0.02em] text-[#062B63]">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ======================================================
            BOTTOM CTA
        ======================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
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
            duration: 0.55,
            delay: 0.15,
          }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/quote"
            className="group inline-flex min-h-[50px] items-center gap-3 rounded-full bg-[#0878E8] px-6 text-sm font-bold text-white shadow-[0_12px_28px_rgba(8,120,232,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#066BCF] hover:shadow-[0_16px_34px_rgba(8,120,232,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
          >
            Get Started

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={15} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}