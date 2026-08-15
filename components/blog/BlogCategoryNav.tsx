import Link from "next/link";
import {
  BookOpen,
  Check,
  ChevronRight,
  Layers3,
} from "lucide-react";

interface BlogCategoryNavProps {
  categories: string[];
  activeCategory?: string;
}

export default function BlogCategoryNav({
  categories,
  activeCategory = "",
}: BlogCategoryNavProps) {
  if (categories.length === 0) {
    return null;
  }

  const normalizedActiveCategory =
    activeCategory.trim().toLowerCase();

  return (
    <section
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
      <div
        className="
          mx-auto
          max-w-7xl
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* =========================
              LABEL
          ========================== */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-3
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
              <Layers3 size={17} />
            </div>

            <div>
              <p
                className="
                  text-xs
                  font-extrabold
                  text-[#062B63]
                "
              >
                Browse by topic
              </p>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  font-medium
                  text-slate-400
                "
              >
                Find the information you need
              </p>
            </div>
          </div>

          {/* =========================
              CATEGORY LINKS
          ========================== */}

          <div
            className="
              -mx-1
              flex
              gap-2
              overflow-x-auto
              px-1
              pb-1
              scrollbar-none
              lg:justify-end
            "
          >
            {/* All */}
            <Link
              href="/blog"
              className={`
                inline-flex
                shrink-0
                items-center
                gap-1.5
                rounded-full
                border
                px-4
                py-2.5
                text-xs
                font-extrabold
                transition-all
                ${
                  normalizedActiveCategory === ""
                    ? "border-[#0878E8] bg-[#0878E8] text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-500 hover:border-blue-100 hover:bg-blue-50 hover:text-[#0878E8]"
                }
              `}
            >
              {normalizedActiveCategory === "" ? (
                <Check size={13} />
              ) : (
                <BookOpen size={13} />
              )}

              All Articles
            </Link>

            {categories.map((category) => {
              const isActive =
                category.trim().toLowerCase() ===
                normalizedActiveCategory;

              return (
                <Link
                  key={category}
                  href={`/blog?category=${encodeURIComponent(
                    category,
                  )}`}
                  className={`
                    inline-flex
                    shrink-0
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    px-4
                    py-2.5
                    text-xs
                    font-extrabold
                    transition-all
                    ${
                      isActive
                        ? "border-[#0878E8] bg-[#0878E8] text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-500 hover:border-blue-100 hover:bg-blue-50 hover:text-[#0878E8]"
                    }
                  `}
                >
                  {isActive && (
                    <Check size={13} />
                  )}

                  {category}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile scroll hint */}
        <div
          className="
            mt-2
            flex
            items-center
            justify-end
            gap-1
            text-[9px]
            font-semibold
            text-slate-300
            sm:hidden
          "
        >
          <span>Swipe for more</span>
          <ChevronRight size={11} />
        </div>
      </div>
    </section>
  );
}