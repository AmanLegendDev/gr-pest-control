import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface AboutBreadcrumbProps {
  businessName?: string;
}

export default function AboutBreadcrumb({
  businessName = "GR Pest Control",
}: AboutBreadcrumbProps) {
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

          {/* Separator */}

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

          {/* Current page */}

          <li
            aria-current="page"
            className="min-w-0"
          >
            <span
              className="
                block
                max-w-[220px]
                truncate
                font-bold
                text-[#062B63]
              "
            >
              About {businessName}
            </span>
          </li>
        </ol>
      </div>
    </nav>
  );
}