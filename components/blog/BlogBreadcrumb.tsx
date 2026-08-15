import Link from "next/link";
import {
  BookOpen,
  ChevronRight,
} from "lucide-react";

interface BlogBreadcrumbProps {
  title: string;
  category?: string;
}

export default function BlogBreadcrumb({
  title,
  category,
}: BlogBreadcrumbProps) {
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

          {/* Blog */}
          <li className="shrink-0">
            <Link
              href="/blog"
              className="
                inline-flex
                items-center
                gap-1.5
                text-slate-400
                transition-colors
                hover:text-[#0878E8]
              "
            >
              <BookOpen size={13} />

              <span>Blog</span>
            </Link>
          </li>

          {/* Category */}
          {category && (
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
                    max-w-[160px]
                    truncate
                    text-slate-400
                  "
                >
                  {category}
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

          {/* Current article */}
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