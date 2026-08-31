"use client";

import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { NavbarProps } from "@/components/shared/navigation/types";

interface FooterProps {
  settings: NavbarProps["settings"];
}

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/faq" },
];

const SERVICE_LINKS = [
  { label: "All Services", href: "/services" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Our Gallery", href: "/gallery" },
  { label: "Customer Reviews", href: "/testimonials" },
];

function normalizePhone(value: string) {
  return value.replace(/[^\d+]/g, "");
}

function formatTime(value: string) {
  if (!value) return "";

  const [hour, minute] = value.split(":").map(Number);

  if (
    Number.isNaN(hour) ||
    Number.isNaN(minute)
  ) {
    return value;
  }

  const date = new Date();

  date.setHours(hour, minute, 0, 0);

  return new Intl.DateTimeFormat("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function getTodayName() {
  return new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
  }).format(new Date());
}

export default function Footer({
  settings,
}: FooterProps) {
  const phoneHref = `tel:${normalizePhone(
    settings.phone,
  )}`;

  const emailHref = `mailto:${settings.email}`;

  const whatsappHref = settings.whatsapp
    ? `https://wa.me/${normalizePhone(
        settings.whatsapp,
      ).replace(/^\+/, "")}`
    : null;

  const todayName = getTodayName();

  const todayHours = settings.businessHours?.find(
    (item) =>
      item.day.toLowerCase() ===
      todayName.toLowerCase(),
  );

  const locationParts = [
    settings.address,
    settings.city,
    settings.state,
    settings.pincode,
  ].filter(Boolean);

  return (
    <footer className="relative overflow-hidden bg-[#031A3A] text-white">
      {/* =====================================================
          ATMOSPHERE
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-48
          -top-48
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#0878E8]/15
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-48
          -left-48
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#0FAF9F]/10
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            TOP CTA / BRAND STRIP
        ====================================================== */}

        <div
          className="
            flex
            flex-col
            gap-6
            border-b
            border-white/10
            py-10
            sm:flex-row
            sm:items-center
            sm:justify-between
            lg:py-12
          "
        >
          <div className="flex items-center gap-4">
            {settings.logo?.url ? (
              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white
                  p-2
                  shadow-lg
                "
              >
                <Image
                  src={settings.logo.url}
                  alt={
                    settings.logo.alt ||
                    settings.businessName
                  }
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#0878E8]
                  text-sm
                  font-extrabold
                "
              >
                GR
              </div>
            )}

            <div>
              <p className="text-base font-extrabold tracking-tight">
                {settings.businessName}
              </p>

              <p className="mt-1 text-xs text-white/45">
                Professional pest management
              </p>
            </div>
          </div>

          <Link
            href="/quote"
            className="
              group
              inline-flex
              min-h-[48px]
              items-center
              justify-center
              gap-2
              rounded-full
              bg-[#0878E8]
              px-5
              text-sm
              font-bold
              text-white
              shadow-[0_10px_30px_rgba(8,120,232,0.25)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#066BCF]
            "
          >
            {settings.primaryCTA ||
              "Get a Free Quote"}

            <span
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                bg-white/15
                transition-transform
                duration-300
                group-hover:translate-x-0.5
              "
            >
              <ArrowUpRight size={14} />
            </span>
          </Link>
        </div>

        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}

        <div
          className="
            grid
            gap-12
            py-14
            sm:py-16
            lg:grid-cols-[1.35fr_0.75fr_0.85fr_1.25fr]
            lg:gap-12
          "
        >
          {/* Brand */}

          <div className="max-w-sm">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/5
                px-3
                py-1.5
                text-[9px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-white/60
              "
            >
              <ShieldCheck size={13} />

              Trusted Pest Management
            </div>

            <h2
              className="
                mt-5
                text-2xl
                font-extrabold
                tracking-[-0.035em]
                text-white
              "
            >
              {settings.businessName}
            </h2>

            <p className="mt-4 text-sm leading-6 text-white/55">
              {settings.shortDescription}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/5 px-3 py-1.5 text-[10px] font-semibold text-white/60">
                Residential
              </span>

              <span className="rounded-full bg-white/5 px-3 py-1.5 text-[10px] font-semibold text-white/60">
                Commercial
              </span>

              <span className="rounded-full bg-white/5 px-3 py-1.5 text-[10px] font-semibold text-white/60">
                Sydney Wide
              </span>
            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/80">
              Explore
            </h3>

            <nav
              aria-label="Footer navigation"
              className="mt-5 flex flex-col gap-3"
            >
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="
                    w-fit
                    text-sm
                    text-white/50
                    transition-colors
                    duration-200
                    hover:text-white
                  "
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/80">
              Discover
            </h3>

            <nav className="mt-5 flex flex-col gap-3">
              {SERVICE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="
                    w-fit
                    text-sm
                    text-white/50
                    transition-colors
                    duration-200
                    hover:text-white
                  "
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/80">
              Contact
            </h3>

            <div className="mt-5 flex flex-col gap-4">
              <a
                href={phoneHref}
                className="
                  group
                  flex
                  items-start
                  gap-3
                  text-sm
                  text-white/55
                  transition-colors
                  hover:text-white
                "
              >
                <Phone
                  size={17}
                  className="mt-0.5 shrink-0 text-[#4FD1C5]"
                />

                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-white/30">
                    Phone
                  </span>

                  <span className="mt-1 block">
                    {settings.phone}
                  </span>
                </span>
              </a>

              <a
                href={emailHref}
                className="
                  flex
                  items-start
                  gap-3
                  text-sm
                  text-white/55
                  transition-colors
                  hover:text-white
                "
              >
                <Mail
                  size={17}
                  className="mt-0.5 shrink-0 text-[#4FD1C5]"
                />

                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-white/30">
                    Email
                  </span>

                  <span className="mt-1 block break-all">
                    {settings.email}
                  </span>
                </span>
              </a>

              {locationParts.length > 0 && (
                <div className="flex items-start gap-3 text-sm text-white/55">
                  <MapPin
                    size={17}
                    className="mt-0.5 shrink-0 text-[#4FD1C5]"
                  />

                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-white/30">
                      Service Location
                    </span>

                    <span className="mt-1 block leading-6">
                      {locationParts.join(", ")}
                    </span>
                  </span>
                  
                </div>
              )}
            </div>
          </div>
        </div>

{/* =====================================================
    GOOGLE BUSINESS MAP
===================================================== */}

<div
  className="
    mt-16
    overflow-hidden
    rounded-[28px]
    border
    border-white/10
    bg-white/5
    shadow-2xl
  "
>
  <div className="aspect-[16/9] w-full">
    <iframe
      title={`${settings.businessName} location on Google Maps`}
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6865986.541988565!2d150.05236179999997!3d-32.8311501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87109fa1a388a6ab%3A0x1b1998696af44754!2sGR%20Pest%20and%20Termite%20services!5e0!3m2!1sen!2sau!4v1788158481384!5m2!1sen!2sau"
      className="h-full w-full border-0"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
</div>
        {/* =====================================================
            HOURS + WHATSAPP
        ====================================================== */}

        <div
          className="
            grid
            gap-5
            border-t
            border-white/10
            py-8
            sm:grid-cols-2
            lg:grid-cols-[1fr_auto]
            lg:items-center
          "
        >
          {/* Hours */}

          <div className="flex items-start gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-white/5
                text-[#4FD1C5]
              "
            >
              <Clock3 size={18} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/30">
                Business Hours
              </p>

              {todayHours?.closed ? (
                <p className="mt-1 text-sm font-semibold text-white/65">
                  Closed today
                </p>
              ) : todayHours?.open &&
                todayHours?.close ? (
                <p className="mt-1 text-sm font-semibold text-white/65">
                  Today ·{" "}
                  {formatTime(todayHours.open)} –{" "}
                  {formatTime(todayHours.close)}
                </p>
              ) : (
                <p className="mt-1 text-sm font-semibold text-white/65">
                  Contact us for availability
                </p>
              )}
            </div>
          </div>

          {/* WhatsApp */}

          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-white/10
                bg-white/5
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white/70
                transition-all
                duration-300
                hover:border-white/20
                hover:bg-white/10
                hover:text-white
              "
            >
              <MessageCircle
                size={17}
                className="text-[#4FD1C5]"
              />

              WhatsApp us

              <ArrowUpRight
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </a>
          )}
        </div>

        {/* =====================================================
            BOTTOM BAR
        ====================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            border-t
            border-white/10
            py-6
            text-xs
            text-white/35
            sm:flex-row
            sm:items-center
            sm:justify-between
            text-center
            items-center
          "
        >
          <p>
            © {new Date().getFullYear()}{" "}
            {settings.businessName}. All rights
            reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-center justify-center">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white/70"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-white/70"
            >
              Terms & Conditions
            </Link>

            <span className="hidden h-3 w-px bg-white/10 sm:block" />

            <a
              href="https://amandigitalsolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                inline-flex
                items-center
                gap-1.5
                font-semibold
                text-white/45
                transition-colors
                hover:text-white
              "
            >
              Built by
              <span className="text-[#4FD1C5]">
                Aman Digital Solutions
              </span>

              <ArrowUpRight
                size={12}
                className="
                  transition-transform
                  duration-200
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}