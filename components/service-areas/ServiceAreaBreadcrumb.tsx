import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";

interface ServiceAreaBreadcrumbProps {
  areaName: string;
}

export default function ServiceAreaBreadcrumb({
  areaName,
}: ServiceAreaBreadcrumbProps) {
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

          {/* Service Areas */}
          <li className="shrink-0">
            <Link
              href="/service-areas"
              className="
                inline-flex
                items-center
                gap-1.5
                text-slate-400
                transition-colors
                hover:text-[#0878E8]
              "
            >
              <MapPin size={13} />

              <span>
                Service Areas
              </span>
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

          {/* Current area */}
          <li
            aria-current="page"
            className="
              min-w-0
            "
          >
            <span
              title={areaName}
              className="
                block
                max-w-[150px]
                truncate
                font-bold
                text-[#062B63]
                sm:max-w-[300px]
              "
            >
              {areaName}
            </span>
          </li>
        </ol>
      </div>
    </nav>
  );
}