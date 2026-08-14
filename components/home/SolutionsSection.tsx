"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Home,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { FeaturedService } from "@/features/services/queries/getFeaturedServices";

interface SolutionsSectionProps {
  services: FeaturedService[];
}

const SOLUTION_ICONS = [
  Home,
  Building2,
  ShieldCheck,
];

export default function SolutionsSection({
  services,
}: SolutionsSectionProps) {
  if (!services.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#062B63] py-20 sm:py-24 lg:py-28">
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -top-48 h-[560px] w-[560px] rounded-full bg-blue-400/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-56 -left-48 h-[520px] w-[520px] rounded-full bg-teal-400/10 blur-3xl"
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
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8DE4DA] backdrop-blur-md sm:text-[11px]">
            <Sparkles
              size={14}
              strokeWidth={2.2}
            />

            Solutions for Your Property
          </div>

          <h2 className="mt-5 text-4xl font-extrabold leading-[1.03] tracking-[-0.045em] text-white sm:text-5xl lg:text-[58px]">
            The right solution for
            <span className="text-[#42C7BA]">
              {" "}
              your pest problem.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-blue-100/75 sm:text-lg sm:leading-8">
            From everyday household pests to more
            specialised problems, we help Sydney
            property owners understand the issue and
            find a practical way forward.
          </p>
        </motion.div>

        {/* ======================================================
            SOLUTION CARDS
        ======================================================= */}

        <div className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((service, index) => {
            const Icon =
              SOLUTION_ICONS[index] ?? ShieldCheck;

            return (
              <motion.article
                key={service.id}
                initial={{
                  opacity: 0,
                  y: 25,
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
                  className="relative block h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.07] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.11] hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#42C7BA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#062B63]"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {service.heroImage?.url ? (
                      <Image
                        src={service.heroImage.url}
                        alt={
                          service.heroImage.alt ||
                          service.title
                        }
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-white/10">
                        <Icon
                          size={34}
                          className="text-[#42C7BA]"
                        />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#062B63]/80 via-[#062B63]/10 to-transparent" />

                    {/* Number */}
                    <span className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#062B63]/50 text-xs font-bold text-white backdrop-blur-md">
                      0{index + 1}
                    </span>

                    {/* Category */}
                    <span className="absolute bottom-4 left-5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.13em] text-white backdrop-blur-md">
                      {service.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-extrabold tracking-[-0.025em] text-white">
                          {service.title}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-blue-100/65">
                          {service.shortDescription}
                        </p>
                      </div>

                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-[#42C7BA] transition-all duration-300 group-hover:bg-[#42C7BA] group-hover:text-[#062B63]">
                        <ArrowRight
                          size={17}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>

                    <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 text-xs font-semibold text-blue-100/60">
                      <Icon
                        size={15}
                        className="text-[#42C7BA]"
                        strokeWidth={2.2}
                      />

                      Explore this solution
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
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
          className="mt-10 flex flex-col items-center justify-between gap-5 rounded-[24px] border border-white/10 bg-white/[0.06] px-5 py-5 sm:flex-row sm:px-6"
        >
          <div>
            <p className="text-sm font-bold text-white">
              Not sure which service you need?
            </p>

            <p className="mt-1 text-xs text-blue-100/60">
              Tell us what you are dealing with and
              we can help you understand the next step.
            </p>
          </div>

          <Link
            href="/#quote"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#062B63] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#42C7BA] hover:text-[#062B63] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#42C7BA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#062B63]"
          >
            Get a Free Quote

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}