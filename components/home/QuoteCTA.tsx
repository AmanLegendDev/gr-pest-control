"use client";

import { ArrowRight, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import type { NavbarProps } from "@/components/shared/navigation/types";

interface QuoteCTAProps {
  settings: NavbarProps["settings"];
}

function normalizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

export default function QuoteCTA({
  settings,
}: QuoteCTAProps) {
  const phoneHref = `tel:${normalizePhone(settings.phone)}`;

  const whatsappHref = settings.whatsapp
    ? `https://wa.me/${normalizePhone(settings.whatsapp).replace(
        /^\+/,
        "",
      )}`
    : null;

  return (
    <section
      id="quote"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* Background atmosphere */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          top-1/2
          h-[420px]
          w-[420px]
          -translate-y-1/2
          rounded-full
          bg-blue-50
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-0
          h-[420px]
          w-[420px]
          rounded-full
          bg-teal-50
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <motion.div
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
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            overflow-hidden
            rounded-[32px]
            bg-[#062B63]
            px-6
            py-12
            shadow-[0_30px_80px_rgba(6,43,99,0.20)]
            sm:rounded-[40px]
            sm:px-10
            sm:py-14
            lg:px-16
            lg:py-16
          "
        >
          {/* Decorative circles */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-20
              -top-28
              h-72
              w-72
              rounded-full
              border
              border-white/10
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-5
              -top-14
              h-44
              w-44
              rounded-full
              border
              border-white/10
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-32
              -left-20
              h-64
              w-64
              rounded-full
              bg-[#0878E8]/20
              blur-2xl
            "
          />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
            {/* Content */}

            <div className="max-w-3xl">
              {/* Eyebrow */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/15
                  bg-white/10
                  px-3.5
                  py-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-white/90
                  backdrop-blur-md
                  sm:text-[11px]
                "
              >
                <ShieldCheck size={14} />

                Professional Pest Management
              </div>

              {/* Heading */}

              <h2
                className="
                  mt-5
                  max-w-3xl
                  text-4xl
                  font-extrabold
                  leading-[1.02]
                  tracking-[-0.045em]
                  text-white
                  sm:text-5xl
                  lg:text-[60px]
                "
              >
                Ready to take back
                <span className="text-[#4FD1C5]">
                  {" "}
                  control?
                </span>
              </h2>

              {/* Description */}

              <p
                className="
                  mt-5
                  max-w-2xl
                  text-base
                  leading-7
                  text-white/70
                  sm:text-lg
                  sm:leading-8
                "
              >
                Tell us what is happening at your
                property and our team can help you
                understand the right pest control
                solution for your situation.
              </p>

              {/* Trust line */}

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                {[
                  "Residential & Commercial",
                  "Sydney Wide",
                  "Professional Service",
                ].map((item) => (
                  <div
                    key={item}
                    className="
                      flex
                      items-center
                      gap-2
                      text-xs
                      font-semibold
                      text-white/70
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4FD1C5]" />

                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}

            <div
              className="
                flex
                w-full
                flex-col
                gap-3
                lg:w-[250px]
              "
            >
              <Link
                href="/#quote"
                className="
                  group
                  inline-flex
                  min-h-[54px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-white
                  px-6
                  text-sm
                  font-extrabold
                  text-[#062B63]
                  shadow-[0_12px_30px_rgba(0,0,0,0.14)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-slate-50
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#062B63]
                "
              >
                {settings.primaryCTA ||
                  "Get a Free Quote"}

                <span
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-[#0878E8]
                    text-white
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                  "
                >
                  <ArrowRight size={14} />
                </span>
              </Link>

              <a
                href={phoneHref}
                className="
                  inline-flex
                  min-h-[52px]
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  border-white/15
                  bg-white/10
                  px-6
                  text-sm
                  font-bold
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:border-white/30
                  hover:bg-white/15
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white
                "
              >
                <Phone size={16} />

                Call {settings.phone}
              </a>

              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    min-h-[48px]
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    px-5
                    text-xs
                    font-bold
                    text-white/65
                    transition-colors
                    duration-300
                    hover:text-white
                  "
                >
                  <MessageCircle size={15} />

                  Message us on WhatsApp
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}