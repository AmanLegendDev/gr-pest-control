import Link from "next/link";
import {
  ChevronRight,
  Images,
} from "lucide-react";

interface GalleryBreadcrumbProps {
  title: string;
  category?: string;
}

const CATEGORY_LABELS: Record<
  string,
  string
> = {
  home: "Home",
  workplace: "Workplace",
  commercial: "Commercial",
  residential: "Residential",
  treatment: "Treatment",
  team: "Our Team",
  other: "Other",
};

export default function GalleryBreadcrumb({
  title,
  category,
}: GalleryBreadcrumbProps) {
  const categoryLabel = category
    ? CATEGORY_LABELS[
        category.toLowerCase()
      ] ?? category
    : "";

  return (
  <nav
  aria-label="Breadcrumb"
  className="
    relative
    z-10
    border-b
    border-slate-100
    bg-white
    px-4
    pt-26
    sm:px-6
    lg:px-8
  "
>
      <div
        className="
          mx-auto
          flex
          min-h-12
          max-w-7xl
          items-center
        "
      >
        <ol
          className="
            flex
            min-w-0
            items-center
            gap-1.5
            text-xs
            font-medium
          "
        >
          {/* Home */}
          <li className="shrink-0">
            <Link
              href="/"
              className="
                text-slate-400
                transition-colors
                hover:text-[#0878E8]
              "
            >
              Home
            </Link>
          </li>

          <li
            aria-hidden="true"
            className="
              flex
              shrink-0
              items-center
              text-slate-300
            "
          >
            <ChevronRight size={13} />
          </li>

          {/* Gallery */}
          <li className="shrink-0">
            <Link
              href="/gallery"
              className="
                inline-flex
                items-center
                gap-1.5
                text-slate-400
                transition-colors
                hover:text-[#0878E8]
              "
            >
              <Images size={13} />

              <span>Gallery</span>
            </Link>
          </li>

          {/* Category */}
          {categoryLabel && (
            <>
              <li
                aria-hidden="true"
                className="
                  flex
                  shrink-0
                  items-center
                  text-slate-300
                "
              >
                <ChevronRight size={13} />
              </li>

              <li className="hidden shrink-0 sm:block">
                <span
                  className="
                    max-w-[140px]
                    truncate
                    text-slate-400
                  "
                >
                  {categoryLabel}
                </span>
              </li>
            </>
          )}

          <li
            aria-hidden="true"
            className="
              flex
              shrink-0
              items-center
              text-slate-300
            "
          >
            <ChevronRight size={13} />
          </li>

          {/* Current item */}
          <li
            aria-current="page"
            className="min-w-0"
          >
            <span
              title={title}
              className="
                block
                max-w-[150px]
                truncate
                font-bold
                text-[#062B63]
                sm:max-w-[360px]
              "
            >
              {title}
            </span>
          </li>
        </ol>
      </div>
    </nav>
  );
}