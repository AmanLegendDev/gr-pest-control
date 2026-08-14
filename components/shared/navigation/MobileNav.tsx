"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type {
  MobileNavProps,
  NavigationItem,
} from "./types";

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Service Areas",
    href: "/service-areas",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Testimonials",
    href: "/testimonials",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "FAQs",
    href: "/faq",
  },
];

function normalizePhone(value: string) {
  return value.replace(/[^\d+]/g, "");
}

function normalizeWhatsApp(value: string) {
  return value.replace(/\D/g, "");
}

export default function MobileNav({
  settings,
  open,
  onClose,
}: MobileNavProps) {
  const pathname = usePathname();

  const phoneHref = `tel:${normalizePhone(
    settings.phone,
  )}`;

  const whatsappHref = settings.whatsapp
    ? `https://wa.me/${normalizeWhatsApp(
        settings.whatsapp,
      )}`
    : null;

  const quoteHref = "/#quote";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#062B63]/20 backdrop-blur-[3px]"
          />

          {/* Menu */}
          <motion.aside
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{
              opacity: 0,
              y: -18,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -12,
              scale: 0.98,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
className="fixed inset-x-3 top-3 z-50 max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_24px_80px_rgba(6,43,99,0.16)] backdrop-blur-xl sm:inset-x-5 sm:top-5 sm:p-5"
>
        <div className="flex items-center justify-between gap-3">
  {/* Brand */}
  <Link
    href="/"
    onClick={onClose}
    aria-label={`${settings.businessName} home`}
    className="flex min-w-0 items-center gap-2.5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#0878E8] focus-visible:ring-offset-2"
  >
    {settings.logo?.url ? (
      <img
        src={settings.logo.url}
        alt={
          settings.logo.alt ||
          settings.businessName
        }
        className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
      />
    ) : (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-[#0878E8]">
        GR
      </div>
    )}

    <div className="min-w-0">
      <div className="flex items-center whitespace-nowrap">
        <span className="text-[15px] font-bold tracking-[-0.02em] text-[#062B63]">
          GR
        </span>

        <span className="text-[15px] font-bold tracking-[-0.02em] text-[#0FAF9F]">
          {" "}
          Pest Control
        </span>
      </div>

      <p className="mt-0.5 whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.14em] text-slate-500">
        Sydney Pest Management
      </p>
    </div>
  </Link>

  {/* Close */}
  <button
    type="button"
    onClick={onClose}
    aria-label="Close menu"
    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[#062B63] transition hover:border-slate-300 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-100"
  >
    <X
      size={19}
      strokeWidth={2.2}
    />
  </button>
</div>

            {/* Navigation */}
            <nav
              aria-label="Mobile navigation links"
              className="mt-6"
            >
              <div className="divide-y divide-slate-100">
                {NAVIGATION_ITEMS.map(
                  (item, index) => {
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname === item.href ||
                          pathname.startsWith(
                            `${item.href}/`,
                          );

                    return (
                      <motion.div
                        key={item.href}
                        initial={{
                          opacity: 0,
                          x: -12,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay:
                            0.04 + index * 0.035,
                          duration: 0.25,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          aria-current={
                            isActive
                              ? "page"
                              : undefined
                          }
                          className={`group flex min-h-14 items-center justify-between gap-4 py-2.5 text-base font-semibold transition ${
                            isActive
                              ? "text-[#0878E8]"
                              : "text-[#0F172A] hover:text-[#0878E8]"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={`h-2 w-2 rounded-full transition ${
                                isActive
                                  ? "bg-[#0878E8]"
                                  : "bg-transparent group-hover:bg-[#0878E8]/40"
                              }`}
                            />

                            {item.label}
                          </span>

                          <ChevronRight
                            size={18}
                            className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#0878E8]"
                          />
                        </Link>
                      </motion.div>
                    );
                  },
                )}
              </div>
            </nav>

            {/* Primary CTA */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.25,
              }}
              className="mt-5"
            >
              <Link
                href={quoteHref}
                onClick={onClose}
                className="group flex min-h-12 items-center justify-between rounded-2xl bg-[#0878E8] px-4 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(8,120,232,0.22)] transition hover:bg-[#066BCF] focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
              >
                <span>
                  {settings.primaryCTA ||
                    "Get Free Quote"}
                </span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition group-hover:bg-white/20">
                  <ArrowUpRight size={17} />
                </span>
              </Link>
            </motion.div>

            {/* Quick Contact */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.36,
                duration: 0.25,
              }}
              className="mt-4 grid grid-cols-2 gap-3"
            >
              <a
                href={phoneHref}
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-[#0F172A] transition hover:border-[#0878E8]/30 hover:bg-blue-50 hover:text-[#0878E8]"
              >
                <Phone size={16} />
                Call Us
              </a>

              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              ) : (
                <a
                  href={`mailto:${settings.email}`}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-[#0F172A] transition hover:border-[#0878E8]/30 hover:bg-blue-50 hover:text-[#0878E8]"
                >
                  Email Us
                </a>
              )}
            </motion.div>

            {/* Business identity */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.4,
                duration: 0.25,
              }}
              className="mt-5 border-t border-slate-100 pt-4"
            >
              <p className="text-xs font-medium leading-5 text-slate-500">
                {settings.shortDescription ||
                  "Professional pest control solutions for homes and businesses."}
              </p>

              {settings.city && (
                <p className="mt-1 text-xs font-semibold text-[#062B63]">
                  Serving {settings.city}
                  {settings.state
                    ? `, ${settings.state}`
                    : ""}
                </p>
              )}
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}