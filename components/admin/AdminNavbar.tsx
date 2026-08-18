"use client";

import { Menu, ExternalLink } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminNavbarProps {
  onMenuClick: () => void;
}

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/dashboard": "Dashboard",
  "/admin/quote-requests?status=all": "Quote Requests",
  "/admin/services": "Services",
  "/admin/service-areas": "Service Areas",
  "/admin/gallery": "Gallery",
  "/admin/testimonials": "Testimonials",
  "/admin/faqs": "FAQs",
  "/admin/blogs": "Blogs",
  "/admin/settings": "Settings",
};

function getPageTitle(pathname: string) {
  if (PAGE_TITLES[pathname]) {
    return PAGE_TITLES[pathname];
  }

  if (pathname.startsWith("/admin/services/")) {
    return "Services";
  }

  if (pathname.startsWith("/admin/service-areas/")) {
    return "Service Areas";
  }

  if (pathname.startsWith("/admin/gallery/")) {
    return "Gallery";
  }

  if (pathname.startsWith("/admin/testimonials/")) {
    return "Testimonials";
  }

  if (pathname.startsWith("/admin/faqs/")) {
    return "FAQs";
  }

  if (pathname.startsWith("/admin/blogs/")) {
    return "Blogs";
  }

  return "Admin";
}

export default function AdminNavbar({
  onMenuClick,
}: AdminNavbarProps) {
  const pathname = usePathname();

  const pageTitle = getPageTitle(pathname);

  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-[72px]
        shrink-0
        items-center
        justify-between
        border-b
        border-slate-200/80
        bg-white/95
        px-4
        backdrop-blur-sm
        sm:px-6
        lg:h-[76px]
        lg:px-8
      "
    >
      {/* =====================================================
          LEFT
      ====================================================== */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open admin navigation"
          aria-controls="admin-mobile-sidebar"
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-[#062B63]
            transition-colors
            hover:border-blue-200
            hover:bg-blue-50
            hover:text-[#0878E8]
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-200
            lg:hidden
          "
        >
          <Menu
            size={20}
            strokeWidth={2.2}
          />
        </button>

        <div className="min-w-0">
          <p className="truncate text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
            Admin Panel
          </p>

          <h1 className="truncate text-base font-extrabold tracking-[-0.02em] text-[#062B63] sm:text-lg">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* =====================================================
          RIGHT
      ====================================================== */}
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            hidden
            h-10
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-3.5
            text-xs
            font-bold
            text-slate-600
            transition-all
            hover:border-blue-200
            hover:bg-blue-50
            hover:text-[#0878E8]
            sm:inline-flex
          "
        >
          <ExternalLink
            size={15}
            strokeWidth={2}
          />

          <span>View Website</span>
        </Link>

        {/* Admin status */}
        <div
          className="
            flex
            h-10
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-3
          "
        >
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-emerald-500
              shadow-[0_0_0_3px_rgba(16,185,129,0.10)]
            "
          />

          <span className="hidden text-xs font-bold text-slate-600 sm:block">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}