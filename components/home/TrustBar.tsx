"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import type { NavbarProps } from "@/components/shared/navigation/types";

interface TrustBarProps {
  settings: NavbarProps["settings"];
}

function normalizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

function formatLocation(
  city?: string,
  state?: string,
) {
  if (city && state) {
    return `${city}, ${state}`;
  }

  return city || state || "Sydney";
}

export default function TrustBar({
  settings,
}: TrustBarProps) {
  const phoneHref = `tel:${normalizePhone(
    settings.phone,
  )}`;

  const location = formatLocation(
    settings.city,
    settings.state,
  );

  const saturdayHours =
    settings.businessHours?.find(
      (item) =>
        item.day.toLowerCase() === "saturday",
    );

  const mondayHours =
    settings.businessHours?.find(
      (item) =>
        item.day.toLowerCase() === "monday",
    );

  const serviceHours = saturdayHours?.closed
    ? mondayHours
    : saturdayHours;

  const hoursText =
    serviceHours && !serviceHours.closed
      ? `${serviceHours.open} – ${serviceHours.close}`
      : "Flexible service hours";

  const trustItems = [
    {
      icon: MapPin,
      label: "Sydney Wide",
      value: location,
    },
    {
      icon: ShieldCheck,
      label: "Homes & Businesses",
      value: "Residential & Commercial",
    },
    {
      icon: Clock3,
      label: "Service Hours",
      value: hoursText,
    },
  ];

  return (
    <section className="relative z-10 border-y border-slate-100 bg-white">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid divide-y divide-slate-100 lg:grid-cols-[1fr_1fr_1fr_auto] lg:divide-x lg:divide-y-0"
        >
          {/* Trust items */}
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center gap-3 px-2 py-5 sm:px-4 lg:px-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0878E8]">
                  <Icon
                    size={18}
                    strokeWidth={2.2}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">
                    {item.label}
                  </p>

                  <p className="mt-0.5 truncate text-sm font-bold text-[#062B63]">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Call CTA */}
          <a
            href={phoneHref}
            className="group flex items-center justify-between gap-4 px-2 py-5 transition-colors hover:bg-blue-50/50 sm:px-4 lg:min-w-[230px] lg:px-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0878E8] text-white shadow-[0_8px_20px_rgba(8,120,232,0.2)] transition-transform duration-300 group-hover:scale-105">
                <Phone
                  size={17}
                  strokeWidth={2.2}
                />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">
                  Speak With Us
                </p>

                <p className="mt-0.5 text-sm font-extrabold text-[#062B63]">
                  {settings.phone}
                </p>
              </div>
            </div>

            <CheckCircle2
              size={18}
              className="shrink-0 text-[#0FAF9F] transition-transform duration-300 group-hover:scale-110"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}