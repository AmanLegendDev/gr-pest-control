"use client";
import { motion } from "framer-motion";
import { Menu, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import MobileNav from "./MobileNav";
import type { NavbarProps, NavigationItem } from "./types";

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
    {
    label: "About",
    href: "/About",
  },
];

function isActiveRoute(
  pathname: string,
  href: string,
) {
  if (href === "/") {
    return pathname === "/";
  }

  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

export default function Navbar({
  settings,
}: NavbarProps) {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const quoteHref = "/#quote";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-5 sm:px-5 sm:pt-4">
<div className="mx-auto max-w-[1440px]">
<div className="flex min-h-[76px] items-center gap-4 rounded-[26px] border border-slate-200/80 bg-white/95 px-4 shadow-[0_10px_35px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:min-h-[80px] sm:px-5 lg:rounded-[30px] lg:px-6">            {/* Brand */}
<Link
  href="/"
  aria-label={`${settings.businessName} home`}
  className="flex min-w-0 shrink-0 items-center gap-4 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#0878E8] focus-visible:ring-offset-2 sm:gap-3"
>
  {settings.logo?.url ? (
    <Image
      src={settings.logo.url}
      alt={
        settings.logo.alt ||
        settings.businessName
      }
      width={72}
      height={72}
      priority
      className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
    />
  ) : (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-[#0878E8] sm:h-16 sm:w-16">
      GR
    </div>
  )}

<div className="min-w-0 flex-1">
  <div className="flex items-center whitespace-nowrap">
   <span className="text-[19px] font-bold tracking-[-0.025em] text-[#062B63] sm:text-[21px]">
  GR
</span>

  <span className="ml-1.5 text-[19px] font-bold tracking-[-0.025em] text-[#0FAF9F] sm:text-[21px]">
  Pest Control
</span>
  </div>

 <p className="mt-1 whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.13em] text-slate-500 sm:text-[11px] sm:tracking-[0.16em]">
  Sydney Pest Management
</p>
</div>
</Link>
            {/* Desktop navigation */}
           <nav
  aria-label="Primary navigation"
  className="ml-auto hidden items-center lg:flex"
>
  <div className="flex items-center gap-1">
    {NAVIGATION_ITEMS.map((item) => {
      const active = isActiveRoute(
        pathname,
        item.href,
      );

      return (
        <Link
          key={item.href}
          href={item.href}
          aria-current={
            active ? "page" : undefined
          }
          className="relative rounded-full px-3.5 py-2.5 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
        >
          {/* Smooth moving active pill */}
          {active && (
            <motion.span
              layoutId="navbar-active-pill"
              className="absolute inset-0 rounded-full bg-blue-50"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 32,
                mass: 0.7,
              }}
            />
          )}

          {/* Label */}
          <span
            className={`relative z-10 transition-colors duration-200 ${
              active
                ? "text-[#0878E8]"
                : "text-[#475569] hover:text-[#062B63]"
            }`}
          >
            {item.label}
          </span>

          {/* Active dot */}
          {active && (
            <motion.span
              layoutId="navbar-active-dot"
              className="absolute bottom-[4px] left-1/2 z-10 h-1 w-1 -translate-x-1/2 rounded-full bg-[#0878E8]"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 32,
                mass: 0.7,
              }}
            />
          )}
        </Link>
      );
    })}
  </div>
</nav>

            {/* Desktop CTA */}
            <Link
              href={quoteHref}
              className="group ml-auto hidden shrink-0 items-center gap-2 rounded-full bg-[#0878E8] px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(8,120,232,0.18)] transition-all duration-200 hover:bg-[#066BCF] hover:shadow-[0_10px_24px_rgba(8,120,232,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2 lg:flex"
            >
              <span>
                {settings.primaryCTA ||
                  "Get Free Quote"}
              </span>

              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowUpRight size={14} />
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() =>
                setMobileOpen(true)
              }
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[#062B63] transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0878E8] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 lg:hidden"
            >
              <Menu
                size={20}
                strokeWidth={2.2}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        settings={settings}
        open={mobileOpen}
        onClose={() =>
          setMobileOpen(false)
        }
      />
    </>
  );
}