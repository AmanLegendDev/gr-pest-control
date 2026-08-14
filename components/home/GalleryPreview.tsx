"use client";

import { ArrowUpRight, Camera } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import GalleryCard from "./GalleryCard";

import type { GalleryPublicViewModel } from "@/features/gallery/types/gallery";

interface GalleryPreviewProps {
  gallery: GalleryPublicViewModel[];
}

export default function GalleryPreview({
  gallery,
}: GalleryPreviewProps) {
  const items = gallery
    .filter((item) => item.image?.url)
    .slice(0, 3);

  if (!items.length) {
    return null;
  }

  const featured = items[0];
  const secondary = items.slice(1, 3);

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-60 top-24 h-[500px] w-[500px] rounded-full bg-blue-50/70 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-60 bottom-0 h-[500px] w-[500px] rounded-full bg-teal-50/50 blur-3xl"
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
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0878E8]">
              <Camera size={14} />

              Our Work
            </div>

            <h2 className="mt-5 text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] text-[#062B63] sm:text-5xl lg:text-[58px]">
              See the work
              <span className="text-[#0878E8]">
                {" "}
                behind the service.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              A glimpse into the properties,
              treatments and professional work
              delivered by GR Pest Control across
              Sydney.
            </p>
          </div>

          <Link
            href="/gallery"
            className="group hidden items-center gap-3 text-sm font-bold text-[#062B63] transition-colors hover:text-[#0878E8] sm:inline-flex"
          >
            View full gallery

            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white transition-all duration-300 group-hover:border-blue-200 group-hover:bg-blue-50">
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </motion.div>

        {/* Gallery layout */}

        <div className="mt-12 sm:mt-14 lg:mt-16">
          {/* Featured gallery */}

          <GalleryCard
            item={featured}
            featured
            delay={0}
          />

          {/* Two gallery cards */}

          {secondary.length > 0 && (
            <div className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-5">
              {secondary.map(
                (item, index) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    delay={(index + 1) * 0.08}
                  />
                ),
              )}
            </div>
          )}
        </div>

        {/* Mobile CTA */}

        <Link
          href="/gallery"
          className="group mt-6 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#062B63] px-5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#0878E8] sm:hidden"
        >
          Explore Full Gallery

          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}