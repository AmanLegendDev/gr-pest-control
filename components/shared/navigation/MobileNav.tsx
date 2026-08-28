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
import { useEffect } from "react";

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
    label: "Blog",
    href: "/blog",
  },
  {
    label: "FAQs",
    href: "/faq",
  },

       {
    label: "Contact",
    href: "/contact",
  },

  { 
  label: "About",
  href: "/About",
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

  const quoteHref = "/quote";

  /*
   * Lock the homepage while mobile menu is open.
   */
  useEffect(() => {
    if (!open) {
      return;
    }

    const body = document.body;
    const html = document.documentElement;

    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverscroll =
      body.style.overscrollBehavior;
    const previousHtmlOverscroll =
      html.style.overscrollBehavior;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    body.style.overscrollBehavior = "none";
    html.style.overscrollBehavior = "none";

    return () => {
      body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;

      body.style.overscrollBehavior =
        previousBodyOverscroll;

      html.style.overscrollBehavior =
        previousHtmlOverscroll;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* =====================================================
              BACKDROP
          ====================================================== */}

          <motion.button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              fixed
              inset-0
              z-40
              cursor-default
              bg-[#062B63]/25
              backdrop-blur-[2px]
              touch-none
            "
          />

          {/* =====================================================
              OUTER HAMBURGER CARD
          ====================================================== */}

          <motion.aside
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
        initial={{
  opacity: 0,
  y: -8,
}}
animate={{
  opacity: 1,
  y: 0,
}}
exit={{
  opacity: 0,
  y: -8,
}}
transition={{
  duration: 0.16,
  ease: "easeOut",
}}  
            className="
              fixed
              inset-x-3
              top-3
              z-50

              max-h-[calc(100dvh-1.5rem)]

              overflow-hidden

              rounded-[30px]
              border
              border-slate-200/90

              bg-white

              p-3

              shadow-[0_30px_100px_rgba(6,43,99,0.22)]

              sm:inset-x-5
              sm:top-5
              sm:max-h-[calc(100dvh-2.5rem)]
              sm:p-4
            "
          >
            {/* =================================================
                HEADER — DOES NOT SCROLL
            ================================================== */}

            <div
              className="
                flex
                shrink-0
                items-center
                justify-between
                gap-3
                rounded-[22px]
                border
                border-slate-100
                bg-white
                px-3
                py-3
                sm:px-4
              "
            >
              {/* Brand */}

              <Link
                href="/"
                onClick={onClose}
                aria-label={`${settings.businessName} home`}
                className="
                  flex
                  min-w-0
                  items-center
                  gap-2.5
                  rounded-xl
                  outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#0878E8]
                  focus-visible:ring-offset-2
                "
              >
                {settings.logo?.url ? (
                  <img
                    src={settings.logo.url}
                    alt={
                      settings.logo.alt ||
                      settings.businessName
                    }
                    className="
                      h-11
                      w-11
                      shrink-0
                      object-contain
                      sm:h-12
                      sm:w-12
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-sm
                      font-bold
                      text-[#0878E8]
                    "
                  >
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
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate-200
                  bg-slate-50
                  text-[#062B63]

                  transition-all
                  duration-200

                  hover:border-slate-300
                  hover:bg-slate-100

                  active:scale-95

                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-100
                "
              >
                <X
                  size={19}
                  strokeWidth={2.2}
                />
              </button>
            </div>

            {/* =================================================
                NAVIGATION CARD
                ONLY THIS AREA SCROLLS
            ================================================== */}

            <div
              className="
                mt-3

                max-h-[min(52dvh,430px)]

                overflow-y-auto
                overscroll-contain

                rounded-[24px]
                border
                border-slate-200/80

                bg-slate-50/70

                p-2

                shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]

                [scrollbar-width:thin]
                [-webkit-overflow-scrolling:touch]
              "
            >
              {/* Small navigation heading */}

              <div className="px-3 pb-2 pt-2">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Navigation
                </p>
              </div>

              <nav
                aria-label="Mobile navigation links"
                className="space-y-1"
              >
                {NAVIGATION_ITEMS.map((item) => {
  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href ||
        pathname.startsWith(`${item.href}/`);

  return (
    <Link
      key={item.href}
      href={item.href}
      onClick={onClose}
      aria-current={
        isActive ? "page" : undefined
      }
      className={`
        group
        flex
        min-h-[56px]
        items-center
        justify-between
        rounded-[18px]
        px-4
        text-[15px]
        font-semibold
        transition-colors
        duration-150
        ${
          isActive
            ? "bg-white text-[#0878E8] shadow-sm ring-1 ring-slate-200/70"
            : "text-[#0F172A] hover:bg-white hover:text-[#0878E8]"
        }
      `}
    >
      <span className="flex items-center gap-3">
        <span
          className={`
            h-2
            w-2
            rounded-full
            ${
              isActive
                ? "bg-[#0878E8] shadow-[0_0_0_4px_rgba(8,120,232,0.08)]"
                : "bg-transparent group-hover:bg-[#0878E8]/40"
            }
          `}
        />

        {item.label}
      </span>

      <span
        className={`
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          transition-colors
          duration-150
          ${
            isActive
              ? "bg-blue-50 text-[#0878E8]"
              : "text-slate-300 group-hover:bg-blue-50 group-hover:text-[#0878E8]"
          }
        `}
      >
        <ChevronRight size={17} />
      </span>
    </Link>
  );
})}
              </nav>
            </div>

            {/* =================================================
                BOTTOM CONTENT
                OUTER CARD DOES NOT SCROLL
            ================================================== */}

            <div className="shrink-0">
              {/* Primary CTA */}
<div className="mt-3">
                <Link
                  href={quoteHref}
                  onClick={onClose}
                  className="
                    group
                    flex
                    min-h-[56px]
                    items-center
                    justify-between

                    rounded-[20px]

                    bg-[#0878E8]

                    px-5
                    py-3

                    text-sm
                    font-bold
                    text-white

                    shadow-[0_12px_28px_rgba(8,120,232,0.24)]

                    transition-all
                    duration-200

                    hover:bg-[#066BCF]
                    active:scale-[0.99]
                  "
                >
                  <span>
                    {settings.primaryCTA ||
                      "Get Free Quote"}
                  </span>

                  <span
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-white/15
                      transition
                      group-hover:bg-white/20
                    "
                  >
                    <ArrowUpRight size={17} />
                  </span>
                </Link>
              </div>

              {/* Quick Contact */}

     <div className="mt-3 grid grid-cols-2 gap-3">
                <a
                  href={phoneHref}
                  className="
                    flex
                    min-h-[50px]
                    items-center
                    justify-center
                    gap-2

                    rounded-[18px]

                    border
                    border-slate-200

                    bg-slate-50

                    px-3

                    text-sm
                    font-semibold
                    text-[#0F172A]

                    transition-all
                    duration-200

                    hover:border-[#0878E8]/30
                    hover:bg-blue-50
                    hover:text-[#0878E8]

                    active:scale-[0.99]
                  "
                >
                  <Phone size={16} />

                  Call Us
                </a>

                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      min-h-[50px]
                      items-center
                      justify-center
                      gap-2

                      rounded-[18px]

                      border
                      border-emerald-200

                      bg-emerald-50

                      px-3

                      text-sm
                      font-semibold
                      text-emerald-700

                      transition-all
                      duration-200

                      hover:bg-emerald-100

                      active:scale-[0.99]
                    "
                  >
                    <MessageCircle size={16} />

                    WhatsApp
                  </a>
                ) : (
                  <a
                    href={`mailto:${settings.email}`}
                    className="
                      flex
                      min-h-[50px]
                      items-center
                      justify-center
                      gap-2

                      rounded-[18px]

                      border
                      border-slate-200

                      bg-slate-50

                      px-3

                      text-sm
                      font-semibold
                      text-[#0F172A]

                      transition-all
                      duration-200

                      hover:border-[#0878E8]/30
                      hover:bg-blue-50
                      hover:text-[#0878E8]

                      active:scale-[0.99]
                    "
                  >
                    Email Us
                  </a>
                )}
              </div>

              {/* Business identity */}

            <div
  className="
    mt-3
    border-t
    border-slate-100
    px-1
    pt-3
  "
>
                <p className="text-xs font-medium leading-5 text-slate-500">
                  {settings.shortDescription ||
                    "Professional pest control solutions for homes and businesses."}
                </p>

                {settings.city && (
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0FAF9F]" />

                    <p className="text-xs font-semibold text-[#062B63]">
                      Serving {settings.city}
                      {settings.state
                        ? `, ${settings.state}`
                        : ""}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}