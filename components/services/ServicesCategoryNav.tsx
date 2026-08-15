"use client";

import {
  Bug,
  Home,
  Building2,
  ShieldCheck,
  MousePointer2,
  Search,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

interface ServicesCategoryNavProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CATEGORY_ICONS: Record<
  string,
  LucideIcon
> = {
  "general pest control": ShieldCheck,
  "residential pest control": Home,
  "commercial pest control": Building2,
  "rodent control": MousePointer2,
  "insect control": Bug,
  "termite control": Bug,
  "bird control": Sparkles,
};

function getCategoryIcon(
  category: string,
): LucideIcon {
  return (
    CATEGORY_ICONS[
      category.toLowerCase().trim()
    ] ?? ShieldCheck
  );
}

function formatCategoryName(
  category: string,
) {
  return category
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}

export default function ServicesCategoryNav({
  categories,
  activeCategory,
  onCategoryChange,
}: ServicesCategoryNavProps) {
  const allCategories = [
    "all",
    ...categories.filter(
      (category) =>
        category.toLowerCase() !== "all",
    ),
  ];

  return (
    <section
      aria-label="Filter pest control services"
      className="
        border-y
        border-slate-100
        bg-white
        px-4
        py-5
        sm:px-6
        lg:px-8
      "
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="
            flex
            items-center
            gap-3
            overflow-x-auto
            pb-1
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {/* Section label */}
          <div
            className="
              mr-2
              hidden
              shrink-0
              items-center
              gap-2
              pr-3
              sm:flex
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-blue-50
                text-[#0878E8]
              "
            >
              <Search size={17} />
            </div>

            <div className="whitespace-nowrap">
              <p
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.14em]
                  text-slate-400
                "
              >
                Find your service
              </p>

              <p
                className="
                  mt-0.5
                  text-xs
                  font-bold
                  text-[#062B63]
                "
              >
                Browse by category
              </p>
            </div>
          </div>

          {allCategories.map((category) => {
            const isActive =
              activeCategory === category;

            const Icon =
              category === "all"
                ? Sparkles
                : getCategoryIcon(category);

            const label =
              category === "all"
                ? "All services"
                : formatCategoryName(category);

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  onCategoryChange(category)
                }
                aria-pressed={isActive}
                className={`
                  group
                  inline-flex
                  min-h-11
                  shrink-0
                  items-center
                  gap-2.5
                  rounded-full
                  border
                  px-4
                  text-xs
                  font-bold
                  transition-all
                  duration-200
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#0878E8]
                  focus-visible:ring-offset-2
                  ${
                    isActive
                      ? "border-[#0878E8] bg-[#0878E8] text-white shadow-[0_8px_20px_rgba(8,120,232,0.16)]"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50/60 hover:text-[#0878E8]"
                  }
                `}
              >
                <span
                  className={`
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    transition-colors
                    ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-[#0878E8]"
                    }
                  `}
                >
                  <Icon size={14} />
                </span>

                {label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}