"use client";

import { useEffect } from "react";
import { LogOut, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

import {
  ADMIN_EXTERNAL_LINKS,
  ADMIN_NAVIGATION,
} from "./adminNavigation";

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

function isActiveRoute(
  pathname: string,
  href: string,
) {
  if (href === "/admin/dashboard") {
    return pathname === "/admin" || pathname === href;
  }

  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

function SidebarContent({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* =====================================================
          BRAND
      ====================================================== */}
      <div className="shrink-0 border-b border-slate-200/80 px-5 py-5">
        <Link
          href="/admin/dashboard"
          onClick={onNavigate}
          className="
            group
            flex
            items-center
            gap-3
            rounded-2xl
            outline-none
            focus-visible:ring-2
            focus-visible:ring-[#0878E8]
            focus-visible:ring-offset-2
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#0878E8]
              text-sm
              font-extrabold
              text-white
              shadow-[0_8px_20px_rgba(8,120,232,0.18)]
            "
          >
            GR
          </div>

          <div className="min-w-0">
            <p className="truncate text-[15px] font-extrabold tracking-[-0.02em] text-[#062B63]">
              GR Pest Control
            </p>

            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Admin Panel
            </p>
          </div>
        </Link>
      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}
      <nav
        aria-label="Admin navigation"
        className="
          min-h-0
          flex-1
          overflow-y-auto
          px-3
          py-5
          [scrollbar-width:thin]
          [scrollbar-color:#CBD5E1_transparent]
        "
      >
        <div className="space-y-6">
          {ADMIN_NAVIGATION.map(
            (section) => (
              <div key={section.label}>
                <p
                  className="
                    mb-2
                    px-3
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-[0.16em]
                    text-slate-400
                  "
                >
                  {section.label}
                </p>

                <div className="space-y-1">
                  {section.items.map(
                    (item) => {
                      const Icon =
                        item.icon;

                      const active =
                        isActiveRoute(
                          pathname,
                          item.href,
                        );

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={
                            onNavigate
                          }
                          aria-current={
                            active
                              ? "page"
                              : undefined
                          }
                          className={`
                            group
                            relative
                            flex
                            min-h-11
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            text-sm
                            font-semibold
                            outline-none
                            transition-all
                            duration-150
                            focus-visible:ring-2
                            focus-visible:ring-blue-200
                            ${
                              active
                                ? "bg-blue-50 text-[#0878E8]"
                                : "text-slate-600 hover:bg-slate-50 hover:text-[#062B63]"
                            }
                          `}
                        >
                          {active && (
                            <span
                              aria-hidden="true"
                              className="
                                absolute
                                left-0
                                top-1/2
                                h-6
                                w-1
                                -translate-y-1/2
                                rounded-r-full
                                bg-[#0878E8]
                              "
                            />
                          )}

                          <span
                            className={`
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              transition-colors
                              ${
                                active
                                  ? "bg-white text-[#0878E8] shadow-sm"
                                  : "bg-slate-50 text-slate-500 group-hover:bg-white group-hover:text-[#0878E8]"
                              }
                            `}
                          >
                            <Icon
                              size={17}
                              strokeWidth={
                                2
                              }
                            />
                          </span>

                          <span className="truncate">
                            {item.label}
                          </span>
                        </Link>
                      );
                    },
                  )}
                </div>
              </div>
            ),
          )}
        </div>
      </nav>

      {/* =====================================================
          BOTTOM ACTIONS
      ====================================================== */}
      <div className="shrink-0 border-t border-slate-200/80 p-3">
        {ADMIN_EXTERNAL_LINKS.map(
          (item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  min-h-10
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  text-sm
                  font-semibold
                  text-slate-600
                  transition-colors
                  hover:bg-slate-50
                  hover:text-[#062B63]
                "
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-500 transition-colors group-hover:bg-white group-hover:text-[#0878E8]">
                  <Icon
                    size={16}
                    strokeWidth={2}
                  />
                </span>

                <span>
                  {item.label}
                </span>
              </Link>
            );
          },
        )}

        <button
          type="button"
          className="
            group
            mt-1
            flex
            min-h-10
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            text-sm
            font-semibold
            text-slate-600
            transition-colors
            hover:bg-red-50
            hover:text-red-600
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-red-200
          "
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-500 transition-colors group-hover:bg-white group-hover:text-red-500">
            <LogOut
              size={16}
              strokeWidth={2}
            />
          </span>

          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar({
  open,
  onClose,
}: AdminSidebarProps) {
  /* =====================================================
     ESC TO CLOSE MOBILE DRAWER
  ====================================================== */
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [open, onClose]);

  /* =====================================================
     LOCK BODY SCROLL ON MOBILE
  ====================================================== */
  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        originalOverflow;
    };
  }, [open]);

  return (
    <>
      {/* ===================================================
          DESKTOP SIDEBAR
      ==================================================== */}
      <aside
        className="
          fixed
          inset-y-0
          left-0
          z-40
          hidden
          w-[270px]
          border-r
          border-slate-200/80
          bg-white
          lg:block
        "
      >
        <SidebarContent />
      </aside>

      {/* ===================================================
          MOBILE BACKDROP
      ==================================================== */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="
            fixed
            inset-0
            z-[60]
            bg-slate-950/20
            lg:hidden
          "
        />
      )}

      {/* ===================================================
          MOBILE SIDEBAR
      ==================================================== */}
      <aside
        id="admin-mobile-sidebar"
        aria-label="Admin navigation"
        className={`
          fixed
          inset-y-0
          left-0
          z-[70]
          w-[min(86vw,300px)]
          border-r
          border-slate-200
          bg-white
          shadow-[15px_0_50px_rgba(15,23,42,0.12)]
          transition-transform
          duration-200
          ease-out
          lg:hidden
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="relative h-full">
          {/* Mobile close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="
              absolute
              right-4
              top-5
              z-10
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-slate-500
              transition-colors
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-[#0878E8]
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-200
            "
          >
            <X size={18} />
          </button>

          <SidebarContent
            onNavigate={onClose}
          />
        </div>
      </aside>
    </>
  );
}