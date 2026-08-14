"use client";

import { MapPin, Quote, Star } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

import type { TestimonialPublicViewModel } from "@/features/testimonials/types/testimonial";

interface TestimonialCardProps {
  testimonial: TestimonialPublicViewModel;
  delay?: number;
}

export default function TestimonialCard({
  testimonial,
  delay = 0,
}: TestimonialCardProps) {
  const rating = Math.min(
    Math.max(testimonial.rating, 1),
    5,
  );

  return (
    <motion.article
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
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-slate-200/80
        bg-white
        p-6
        shadow-[0_18px_50px_rgba(15,23,42,0.07)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)]
        sm:p-7
        lg:p-8
      "
    >
      {/* Decorative quote */}

      <div
        aria-hidden="true"
        className="
          absolute
          -right-5
          -top-6
          text-blue-50
          transition-transform
          duration-500
          group-hover:scale-110
        "
      >
        <Quote
          size={110}
          strokeWidth={1.4}
        />
      </div>

      <div className="relative z-10">
        {/* Rating */}

        <div className="flex items-center gap-1">
          {Array.from({
            length: 5,
          }).map((_, index) => (
            <Star
              key={index}
              size={15}
              strokeWidth={1.8}
              fill={
                index < rating
                  ? "currentColor"
                  : "none"
              }
              className={
                index < rating
                  ? "text-[#F5B942]"
                  : "text-slate-200"
              }
            />
          ))}

          <span className="ml-2 text-xs font-semibold text-slate-400">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Review */}

        <blockquote className="mt-6 text-[17px] font-medium leading-7 tracking-[-0.015em] text-[#1E293B] sm:text-lg sm:leading-8">
          “{testimonial.content}”
        </blockquote>

        {/* Customer */}

        <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
          {testimonial.image?.url ? (
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
              <Image
                src={testimonial.image.url}
                alt={
                  testimonial.image.alt ||
                  testimonial.name
                }
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
          ) : (
            <div
              aria-hidden="true"
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-blue-50
                to-teal-50
                text-sm
                font-extrabold
                text-[#0878E8]
              "
            >
              {getInitials(
                testimonial.name,
              )}
            </div>
          )}

          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold text-[#062B63]">
              {testimonial.name}
            </p>

            {(testimonial.role ||
              testimonial.company) && (
              <p className="mt-0.5 truncate text-xs text-slate-500">
                {[
                  testimonial.role,
                  testimonial.company,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}

            {testimonial.location && (
              <div className="mt-1 flex items-center gap-1 text-[10px] font-medium text-slate-400">
                <MapPin size={11} />

                <span>
                  {testimonial.location}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}