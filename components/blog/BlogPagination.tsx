import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  category?: string;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  category = "",
}: BlogPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const buildHref = (page: number) => {
    const params = new URLSearchParams();

    if (category.trim()) {
      params.set("category", category);
    }

    if (page > 1) {
      params.set("page", String(page));
    }

    const query = params.toString();

    return query
      ? `/blog?${query}`
      : "/blog";
  };

  const pages: number[] = [];

  const start = Math.max(
    1,
    currentPage - 2,
  );

  const end = Math.min(
    totalPages,
    currentPage + 2,
  );

  for (
    let page = start;
    page <= end;
    page++
  ) {
    pages.push(page);
  }

  return (
    <nav
      aria-label="Blog pagination"
      className="
        mt-10
        flex
        items-center
        justify-center
        gap-2
      "
    >
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={buildHref(
            currentPage - 1,
          )}
          aria-label="Previous page"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-500
            transition
            hover:border-blue-100
            hover:bg-blue-50
            hover:text-[#0878E8]
          "
        >
          <ChevronLeft size={17} />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-100
            bg-slate-50
            text-slate-300
          "
        >
          <ChevronLeft size={17} />
        </span>
      )}

      {/* Page numbers */}
      <div
        className="
          flex
          items-center
          gap-1.5
        "
      >
        {pages.map((page) => {
          const isActive =
            page === currentPage;

          return isActive ? (
            <span
              key={page}
              aria-current="page"
              className="
                flex
                h-10
                min-w-10
                items-center
                justify-center
                rounded-xl
                bg-[#0878E8]
                px-3
                text-xs
                font-extrabold
                text-white
                shadow-sm
              "
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={buildHref(page)}
              className="
                flex
                h-10
                min-w-10
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
                text-xs
                font-bold
                text-slate-500
                transition
                hover:border-blue-100
                hover:bg-blue-50
                hover:text-[#0878E8]
              "
            >
              {page}
            </Link>
          );
        })}
      </div>

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={buildHref(
            currentPage + 1,
          )}
          aria-label="Next page"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-500
            transition
            hover:border-blue-100
            hover:bg-blue-50
            hover:text-[#0878E8]
          "
        >
          <ChevronRight size={17} />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-100
            bg-slate-50
            text-slate-300
          "
        >
          <ChevronRight size={17} />
        </span>
      )}
    </nav>
  );
}