"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { NavbarProps } from "@/components/shared/navigation/types";

interface HeroProps {
  settings: NavbarProps["settings"];
}

function normalizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

const TRUST_POINTS = [
  "Residential",
  "Commercial",
  "Sydney Wide",
];

export default function Hero({
  settings,
}: HeroProps) {
  const phoneHref = `tel:${normalizePhone(
    settings.phone,
  )}`;

  return (
    <section className="relative overflow-hidden bg-white pt-30 sm:pt-36 lg:pt-10">
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-48 h-[420px] w-[420px] rounded-full bg-blue-50/70 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -right-48 h-[460px] w-[460px] rounded-full bg-teal-50/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-120px)] items-center gap-12 py-10 sm:py-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 lg:py-16">
          {/* =========================================================
              LEFT — HERO CONTENT
          ========================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 max-w-2xl"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0878E8] sm:text-[11px]">
              <ShieldCheck
                size={15}
                strokeWidth={2.4}
              />

              Professional Pest Control
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-[48px] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#062B63] sm:text-[62px] lg:text-[74px]">
              Professional Pest Control{" "}
              <span className="text-[#0878E8]">
                Across Sydney
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {settings.shortDescription}
            </p>

            {/* CTA row */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#quote"
                className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-[#0878E8] px-6 text-sm font-bold text-white shadow-[0_14px_30px_rgba(8,120,232,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#066BCF] hover:shadow-[0_18px_36px_rgba(8,120,232,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
              >
                {settings.primaryCTA ||
                  "Get a Free Quote"}

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight size={15} />
                </span>
              </Link>

              <a
                href={phoneHref}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-sm font-bold text-[#062B63] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0878E8] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2"
              >
                <Phone size={17} />

                Call Us
              </a>
            </div>

            {/* Trust points */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {TRUST_POINTS.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-600"
                >
                  <CheckCircle2
                    size={16}
                    strokeWidth={2.4}
                    className="shrink-0 text-[#0FAF9F]"
                  />

                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* =========================================================
              RIGHT — HERO IMAGE
          ========================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.97,
              x: 24,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* Main image container */}
            <div 
className="relative aspect-[4/4.15] overflow-hidden rounded-[34px] border border-slate-200 bg-slate-100 shadow-[0_30px_80px_rgba(6,43,99,0.14)] sm:aspect-[4/3.75] lg:aspect-[4/3.85]"
            >
              <Image
                src="/images/home/hero-pest-control.jpg"
                alt="Professional pest control service in Sydney"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />

              {/* Image gradient */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#062B63]/55 via-[#062B63]/5 to-transparent"
              />

              {/* Floating information card */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/90 p-4 shadow-2xl backdrop-blur-xl sm:bottom-7 sm:left-7 sm:right-auto sm:max-w-[340px]">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0878E8]">
                    <ShieldCheck size={21} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#062B63]">
                      Professional Pest Management
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Safe, reliable and effective
                      solutions for Sydney homes
                      and businesses.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location badge */}
            <div className="absolute -right-3 top-8 hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:block">
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Proudly serving
              </p>

              <p className="mt-1 text-sm font-bold text-[#062B63]">
                {settings.city},{" "}
                {settings.state}
              </p>
            </div>

            {/* Small accent */}
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 h-20 w-20 rounded-2xl border border-blue-100 bg-blue-50/80 -z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}