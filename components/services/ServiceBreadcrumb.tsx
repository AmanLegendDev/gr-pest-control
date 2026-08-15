import Link from "next/link";
import {
  ChevronRight,
  Home,
} from "lucide-react";

interface ServiceBreadcrumbProps {
  serviceTitle: string;
}

export default function ServiceBreadcrumb({
  serviceTitle,
}: ServiceBreadcrumbProps) {
  return (
   <nav
  aria-label="Breadcrumb"
  className="
    relative
    z-10
    border-b
    border-slate-100
    bg-[#F8FAFC]
    pt-26
  "
>
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          gap-1.5
          overflow-hidden
          px-4
          py-3.5
          text-xs
          sm:px-6
          lg:px-8
        "
      >
        <Link
          href="/"
          className="
            inline-flex
            shrink-0
            items-center
            gap-1.5
            font-semibold
            text-slate-400
            transition
            hover:text-[#0878E8]
          "
        >
          <Home size={13} />

          <span>Home</span>
        </Link>

        <ChevronRight
          size={13}
          className="shrink-0 text-slate-300"
        />

        <Link
          href="/services"
          className="
            shrink-0
            font-semibold
            text-slate-400
            transition
            hover:text-[#0878E8]
          "
        >
          Services
        </Link>

        <ChevronRight
          size={13}
          className="shrink-0 text-slate-300"
        />

        <span
          className="
            truncate
            font-bold
            text-[#062B63]
          "
        >
          {serviceTitle}
        </span>
      </div>
    </nav>
  );
}