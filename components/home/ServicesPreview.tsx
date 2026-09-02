"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { FeaturedService } from "@/features/services/queries/getFeaturedServices";

interface ServicesPreviewProps {
  services: FeaturedService[];
}

export default function ServicesPreview({
  services,
}: ServicesPreviewProps) {
  if (!services.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-slate-50/70 py-20 sm:py-24 lg:py-28">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-teal-100/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            SECTION HEADER
        ========================================================== */}

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
          className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0878E8] shadow-sm sm:text-[11px]">
              <Sparkles
                size={14}
                strokeWidth={2.2}
              />

              Our Services
            </div>

            {/* Heading */}
            <h2 className="mt-5 text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] text-[#062B63] sm:text-5xl lg:text-[58px]">
              Pest control solutions
              <span className="text-[#0878E8]">
                {" "}
                built for Sydney.
              </span>
            </h2>

            {/* Supporting text */}
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Professional pest management for homes
              and businesses, delivered with a focus on
              safety, reliability and long-term results.
            </p>
          </div>

          {/* View all */}
          <Link
            href="/services"
            className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-[#062B63] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0878E8] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2"
          >
            View All Services

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 group-hover:bg-[#0878E8] group-hover:text-white">
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </motion.div>

        {/* =========================================================
            SERVICE CARDS
        ========================================================== */}

        <div className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
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
                amount: 0.15,
              }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group"
            >
              <Link
                href={`/services/${service.slug}`}
                className="block overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-blue-100 hover:shadow-[0_24px_55px_rgba(6,43,99,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  {service.heroImage?.url ? (
                    <Image
                      src={service.heroImage.url}
                      alt={
                        service.heroImage.alt ||
                        service.title
                      }
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#0878E8] shadow-sm">
                        <Sparkles size={24} />
                      </div>
                    </div>
                  )}

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#062B63]/45 via-transparent to-transparent opacity-70" />

                  {/* Category */}
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#062B63] shadow-sm backdrop-blur-md">
                      {service.category}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0878E8] shadow-lg transition-all duration-300 group-hover:bg-[#0878E8] group-hover:text-white">
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-extrabold tracking-[-0.025em] text-[#062B63] transition-colors duration-300 group-hover:text-[#0878E8]">
                    {service.title}
                  </h3>

            <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
  {service.shortDescription}
</p>

{/* Starting price */}
<div
  className="
    mt-5
    flex
    items-center
    justify-between
    rounded-2xl
    border
    border-blue-100
    bg-gradient-to-r
    from-blue-50/80
    to-white
    px-4
    py-3.5
    shadow-[0_6px_20px_rgba(8,120,232,0.06)]
  "
>
  <div>
    <p
      className="
        text-[9px]
        font-extrabold
        uppercase
        tracking-[0.14em]
        text-slate-400
      "
    >
      Starting from
    </p>

    <p
      className="
        mt-0.5
        text-xl
        font-extrabold
        tracking-[-0.03em]
        text-[#062B63]
      "
    >
      ${(service.price ?? 0).toLocaleString("en-AU")}
      <span className="ml-1.5 text-[10px] font-bold text-slate-400">
        AUD
      </span>
    </p>
  </div>

  <span
    className="
      rounded-full
      bg-white
      px-2.5
      py-1
      text-[9px]
      font-extrabold
      uppercase
      tracking-[0.1em]
      text-[#0878E8]
      shadow-sm
    "
  >
    From
  </span>
</div>

<div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <CheckCircle2
                        size={15}
                        className="text-[#0FAF9F]"
                        strokeWidth={2.3}
                      />

                      Professional Service
                    </span>

                    <span className="text-xs font-bold text-[#0878E8]">
                      Learn More
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Mobile / bottom CTA */}
        <div className="mt-8 flex justify-center lg:hidden">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-bold text-[#0878E8]"
          >
            Explore all services

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}