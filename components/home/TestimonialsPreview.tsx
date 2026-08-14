"use client";

import { ArrowUpRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import TestimonialCard from "./TestimonialCard";

import type { TestimonialPublicViewModel } from "@/features/testimonials/types/testimonial";

interface TestimonialsPreviewProps {
  testimonials: TestimonialPublicViewModel[];
}

export default function TestimonialsPreview({
  testimonials,
}: TestimonialsPreviewProps) {
 const items = testimonials.slice(0, 3);

  if (!items.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-20 sm:py-24 lg:py-28">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-64
          top-20
          h-[500px]
          w-[500px]
          rounded-full
          bg-blue-50/70
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-64
          bottom-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-teal-50/60
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            HEADER
        ====================================================== */}

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
            {/* Eyebrow */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-100
                bg-white
                px-3.5
                py-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#0878E8]
                shadow-sm
                sm:text-[11px]
              "
            >
              <MessageCircle size={14} />

              Customer Experiences
            </div>

            {/* Heading */}

            <h2
              className="
                mt-5
                text-4xl
                font-extrabold
                leading-[1.02]
                tracking-[-0.045em]
                text-[#062B63]
                sm:text-5xl
                lg:text-[58px]
              "
            >
              Trusted by Sydney
              <span className="text-[#0878E8]">
                {" "}
                customers.
              </span>
            </h2>

            {/* Description */}

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              See what customers have to say
              about their experience with GR
              Pest Control.
            </p>
          </div>

          {/* Desktop CTA */}

          <Link
            href="/testimonials"
            className="
              group
              hidden
              shrink-0
              items-center
              gap-3
              text-sm
              font-bold
              text-[#062B63]
              transition-colors
              duration-300
              hover:text-[#0878E8]
              sm:inline-flex
            "
          >
            View all testimonials

            <span
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-slate-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                group-hover:border-blue-200
                group-hover:bg-blue-50
              "
            >
              <ArrowUpRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </span>
          </Link>
        </motion.div>

        {/* =====================================================
            TESTIMONIAL GRID
        ====================================================== */}

        <div className="mt-12 grid gap-5 sm:mt-14 lg:grid-cols-3 lg:gap-6">
          {items.map(
            (testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                delay={index * 0.08}
              />
            ),
          )}
        </div>

        {/* =====================================================
            TRUST FOOTER
        ====================================================== */}

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
          }}
          className="
            mt-8
            flex
            flex-col
            gap-5
            border-t
            border-slate-200/70
            pt-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-teal-50
                text-[#0FAF9F]
              "
            >
              <MessageCircle
                size={16}
              />
            </div>

            <p className="text-xs font-medium leading-5 text-slate-500">
              Real customer experiences
              help us keep raising the
              standard of service.
            </p>
          </div>

          {/* Mobile CTA */}

          <Link
            href="/testimonials"
            className="
              group
              inline-flex
              min-h-[46px]
              w-full
              items-center
              justify-center
              gap-2
              rounded-full
              bg-[#062B63]
              px-5
              text-sm
              font-bold
              text-white
              transition-all
              duration-300
              hover:bg-[#0878E8]
              sm:hidden
            "
          >
            Read all reviews

            <ArrowUpRight
              size={16}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}