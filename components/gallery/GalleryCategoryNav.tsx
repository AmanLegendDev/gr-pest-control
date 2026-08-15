import Link from "next/link";
import {
  Building2,
  Check,
  ChevronRight,
  Home,
  Images,
  ShieldCheck,
  Users,
} from "lucide-react";

type GalleryCategory =
  | "home"
  | "workplace"
  | "commercial"
  | "residential"
  | "treatment"
  | "team"
  | "other";

interface GalleryCategoryNavProps {
  activeCategory?: string;
}

const CATEGORIES: Array<{
  value: GalleryCategory;
  label: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
}> = [
  {
    value: "home",
    label: "Home",
    icon: Home,
  },
  {
    value: "workplace",
    label: "Workplace",
    icon: Building2,
  },
  {
    value: "commercial",
    label: "Commercial",
    icon: Building2,
  },
  {
    value: "residential",
    label: "Residential",
    icon: Home,
  },
  {
    value: "treatment",
    label: "Treatment",
    icon: ShieldCheck,
  },
  {
    value: "team",
    label: "Our Team",
    icon: Users,
  },
  {
    value: "other",
    label: "Other",
    icon: Images,
  },
];

export default function GalleryCategoryNav({
  activeCategory = "",
}: GalleryCategoryNavProps) {
  const normalizedActive =
    activeCategory.trim().toLowerCase();

  return (
    <section
      className="
        sticky
        top-0
        z-20
        border-y
        border-slate-100
        bg-white/95
        px-4
        py-4
        backdrop-blur-xl
        sm:px-6
        lg:px-8
      "
    >
      <div className="mx-auto max-w-7xl">
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
              <Images size={17} />
            </div>

            <div>
              <p
                className="
                  text-xs
                  font-extrabold
                  text-[#062B63]
                "
              >
                Explore our work
              </p>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  font-medium
                  text-slate-400
                "
              >
                Browse by category
              </p>
            </div>
          </div>

          {/* =========================
              FILTERS
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
              href="/gallery"
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
                duration-200
                ${
                  normalizedActive === ""
                    ? "border-[#0878E8] bg-[#0878E8] text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-500 hover:border-blue-100 hover:bg-blue-50 hover:text-[#0878E8]"
                }
              `}
            >
              {normalizedActive === "" ? (
                <Check size={13} />
              ) : (
                <Images size={13} />
              )}

              All Work
            </Link>

            {CATEGORIES.map(
              ({
                value,
                label,
                icon: Icon,
              }) => {
                const isActive =
                  normalizedActive ===
                  value;

                return (
                  <Link
                    key={value}
                    href={`/gallery?category=${value}`}
                    aria-current={
                      isActive
                        ? "page"
                        : undefined
                    }
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
                      duration-200
                      ${
                        isActive
                          ? "border-[#0878E8] bg-[#0878E8] text-white shadow-sm"
                          : "border-slate-200 bg-white text-slate-500 hover:border-blue-100 hover:bg-blue-50 hover:text-[#0878E8]"
                      }
                    `}
                  >
                    {isActive ? (
                      <Check size={13} />
                    ) : (
                      <Icon size={13} />
                    )}

                    {label}
                  </Link>
                );
              },
            )}
          </div>
        </div>

        {/* Mobile hint */}
        <div
          className="
            mt-2
            flex
            items-center
            justify-end
            gap-1
            sm:hidden
          "
        >
          <span
            className="
              text-[9px]
              font-semibold
              text-slate-300
            "
          >
            Swipe to explore
          </span>

          <ChevronRight
            size={11}
            className="text-slate-300"
          />
        </div>
      </div>
    </section>
  );
}