"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ListFilter,
} from "lucide-react";

interface FAQCategoryNavProps {
  categories: string[];
  activeCategory?: string;
}

export default function FAQCategoryNav({
  categories,
  activeCategory = "",
}: FAQCategoryNavProps) {
  const pathname = usePathname();

  const normalizedActive =
    activeCategory
      .trim()
      .toLowerCase();

  const formatCategory = (
    category: string,
  ) => {
    return category
      .trim()
      .replace(/[-_]+/g, " ")
      .replace(
        /\b\w/g,
        (letter) =>
          letter.toUpperCase(),
      );
  };

  const buildHref = (
    category?: string,
  ) => {
    if (!category) {
      return pathname;
    }

    return `${pathname}?category=${encodeURIComponent(
      category,
    )}`;
  };

  return (
    <section
      className="
        sticky
        top-0
        z-30
        border-y
        border-slate-100
        bg-white/95
        px-4
        py-3
        backdrop-blur-md
        sm:px-6
        lg:px-8
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* Desktop / Tablet */}

        <div
          className="
            hidden
            items-center
            gap-2
            overflow-x-auto
            scrollbar-none
            md:flex
          "
        >
          <div
            className="
              mr-2
              flex
              shrink-0
              items-center
              gap-2
              border-r
              border-slate-100
              pr-4
            "
          >
            <ListFilter
              size={14}
              className="text-[#0878E8]"
            />

            <span
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.12em]
                text-slate-400
              "
            >
              Browse by topic
            </span>
          </div>

          {/* All */}

          <Link
            href={buildHref()}
            className={`
              inline-flex
              shrink-0
              items-center
              rounded-full
              px-4
              py-2.5
              text-xs
              font-extrabold
              transition-all
              duration-200
              ${
                normalizedActive === ""
                  ? "bg-[#062B63] text-white shadow-sm"
                  : "bg-[#F8FAFC] text-slate-500 hover:bg-blue-50 hover:text-[#0878E8]"
              }
            `}
          >
            All questions
          </Link>

          {/* Categories */}

          {categories.map(
            (category) => {
              const normalizedCategory =
                category
                  .trim()
                  .toLowerCase();

              const isActive =
                normalizedActive ===
                normalizedCategory;

              return (
                <Link
                  key={category}
                  href={buildHref(
                    category,
                  )}
                  className={`
                    inline-flex
                    shrink-0
                    items-center
                    rounded-full
                    px-4
                    py-2.5
                    text-xs
                    font-extrabold
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? "bg-[#0878E8] text-white shadow-sm"
                        : "bg-[#F8FAFC] text-slate-500 hover:bg-blue-50 hover:text-[#0878E8]"
                    }
                  `}
                >
                  {formatCategory(
                    category,
                  )}
                </Link>
              );
            },
          )}
        </div>

        {/* Mobile */}

        <div className="md:hidden">
          <div className="relative">
            <ListFilter
              size={14}
              className="
                pointer-events-none
                absolute
                left-3.5
                top-1/2
                z-10
                -translate-y-1/2
                text-[#0878E8]
              "
            />

            <select
              value={
                normalizedActive
              }
              onChange={(event) => {
                const value =
                  event.target.value;

                window.location.href =
                  buildHref(
                    value || undefined,
                  );
              }}
              aria-label="Filter FAQs by category"
              className="
                h-11
                w-full
                appearance-none
                rounded-xl
                border
                border-slate-200
                bg-[#F8FAFC]
                pl-10
                pr-10
                text-xs
                font-extrabold
                text-[#062B63]
                outline-none
                transition
                focus:border-[#0878E8]
                focus:bg-white
                focus:ring-2
                focus:ring-[#0878E8]/10
              "
            >
              <option value="">
                All questions
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category}
                    value={category
                      .trim()
                      .toLowerCase()}
                  >
                    {formatCategory(
                      category,
                    )}
                  </option>
                ),
              )}
            </select>

            <ChevronDown
              size={15}
              className="
                pointer-events-none
                absolute
                right-3.5
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}