"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { NavbarProps } from "@/components/shared/navigation/types";

interface WhyChooseUsProps {
  settings: NavbarProps["settings"];
}

const REASONS = [
  {
    title: "Professional Approach",
    description:
      "Every property and pest problem is different. We focus on understanding the situation before recommending an appropriate treatment approach.",
    icon: ShieldCheck,
  },
  {
    title: "Homes & Businesses",
    description:
      "Practical pest management solutions for residential properties and a wide range of commercial environments across Sydney.",
    icon: CheckCircle2,
  },
  {
    title: "Sydney Wide",
    description:
      "Local pest management support across Sydney, making it easier to get professional help when you need it.",
    icon: MapPin,
  },
  {
    title: "Clear Recommendations",
    description:
      "We keep our advice straightforward, helping you understand the pest problem and the practical steps that can be taken.",
    icon: Sparkles,
  },
];

export default function WhyChooseUs({
  settings,
}: WhyChooseUsProps) {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-10 h-[520px] w-[520px] rounded-full bg-blue-50/70 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 bottom-0 h-[420px] w-[420px] rounded-full bg-teal-50/50 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          {/* ======================================================
              LEFT — IMAGE
          ======================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -28,
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
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div className="relative mx-auto max-w-[590px]">
              {/* Decorative shape */}
              <div
                aria-hidden="true"
                className="absolute -left-4 -top-4 h-24 w-24 rounded-3xl border border-blue-100 bg-blue-50/80 sm:-left-6 sm:-top-6"
              />

              {/* Image */}
              <div className="relative aspect-[4/4.35] overflow-hidden rounded-[34px] border border-slate-200 bg-slate-100 shadow-[0_30px_80px_rgba(6,43,99,0.13)] sm:aspect-[4/4.1]">
                <Image
                  src="/images/home/why-choose-us.jpg"
                  alt="Professional GR Pest Control technician providing pest management service in Sydney"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.025]"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#062B63]/45 via-transparent to-transparent"
                />

                {/* Floating card */}
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/90 p-4 shadow-2xl backdrop-blur-xl sm:bottom-7 sm:left-7 sm:right-auto sm:max-w-[320px]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0878E8]">
                      <ShieldCheck
                        size={21}
                        strokeWidth={2.2}
                      />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#062B63]">
                        Professional Pest Management
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Safe, practical & reliable service
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location badge */}
              <div className="absolute -bottom-5 -right-3 hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:block">
                <div className="flex items-center gap-2">
                  <MapPin
                    size={16}
                    className="text-[#0FAF9F]"
                  />

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-slate-400">
                      Serving
                    </p>

                    <p className="mt-0.5 text-sm font-bold text-[#062B63]">
                      {settings.city},{" "}
                      {settings.state}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ======================================================
              RIGHT — CONTENT
          ======================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 28,
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
              duration: 0.7,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-2xl"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50/70 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0FAF9F] sm:text-[11px]">
              <Sparkles
                size={14}
                strokeWidth={2.2}
              />

              Why Choose GR
            </div>

            {/* Heading */}
            <h2 className="mt-5 text-4xl font-extrabold leading-[1.03] tracking-[-0.045em] text-[#062B63] sm:text-5xl lg:text-[58px]">
              Pest control with a
              <span className="text-[#0878E8]">
                {" "}
                professional difference.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {settings.shortDescription ||
                "Professional pest management focused on practical solutions for Sydney homes and businesses."}
            </p>

            {/* Reasons */}
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {REASONS.map((reason, index) => {
                const Icon = reason.icon;

                return (
                  <motion.div
                    key={reason.title}
                    initial={{
                      opacity: 0,
                      y: 14,
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
                      duration: 0.45,
                      delay: 0.15 + index * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-[0_15px_35px_rgba(6,43,99,0.08)]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0878E8] transition-colors duration-300 group-hover:bg-[#0878E8] group-hover:text-white">
                        <Icon
                          size={18}
                          strokeWidth={2.2}
                        />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-[#062B63]">
                          {reason.title}
                        </h3>

                        <p className="mt-1.5 text-xs leading-5 text-slate-500">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href="/quote"
                className="group inline-flex min-h-[50px] items-center gap-3 rounded-full bg-[#062B63] px-5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(6,43,99,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0878E8] hover:shadow-[0_16px_34px_rgba(8,120,232,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
              >
                {settings.primaryCTA ||
                  "Get a Free Quote"}

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight size={15} />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}