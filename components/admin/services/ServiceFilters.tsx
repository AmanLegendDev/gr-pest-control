"use client";

import {
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  FormEvent,
  useState,
} from "react";

interface ServiceFiltersProps {
  categories: string[];
  filters: {
    search: string;
    category: string;
    active:
      | "all"
      | "active"
      | "inactive";
    featured:
      | "all"
      | "featured"
      | "normal";
  };
}

export default function ServiceFilters({
  categories,
  filters,
}: ServiceFiltersProps) {
  const router = useRouter();

  const [search, setSearch] =
    useState(filters.search);

  function updateFilters(
    updates: Record<
      string,
      string
    >,
  ) {
    const params =
      new URLSearchParams();

    const next = {
      search: filters.search,
      category: filters.category,
      active: filters.active,
      featured:
        filters.featured,
      ...updates,
    };

    if (next.search.trim()) {
      params.set(
        "search",
        next.search.trim(),
      );
    }

    if (next.category) {
      params.set(
        "category",
        next.category,
      );
    }

    if (next.active !== "all") {
      params.set(
        "active",
        next.active,
      );
    }

    if (
      next.featured !== "all"
    ) {
      params.set(
        "featured",
        next.featured,
      );
    }

    router.push(
      params.toString()
        ? `/admin/services?${params.toString()}`
        : "/admin/services",
    );
  }

  function handleSearch(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    updateFilters({
      search,
    });
  }

  return (
    <div
      className="
        grid
        gap-3
        p-4
        sm:grid-cols-2
        lg:grid-cols-[1.5fr_1fr_1fr_1fr]
      "
    >
      {/* =========================
          SEARCH
      ========================== */}

      <form
        onSubmit={handleSearch}
        className="relative"
      >
        <Search
          size={15}
          className="
            pointer-events-none
            absolute
            left-3.5
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          type="search"
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value,
            )
          }
          placeholder="Search services..."
          aria-label="Search services"
          className="
            h-11
            w-full
            rounded-xl
            border
            border-slate-200
            bg-[#F8FAFC]
            pl-10
            pr-4
            text-xs
            font-semibold
            text-[#062B63]
            outline-none
            transition-all
            placeholder:text-slate-400
            focus:border-[#0878E8]
            focus:bg-white
            focus:ring-2
            focus:ring-blue-100
          "
        />
      </form>

      {/* =========================
          CATEGORY
      ========================== */}

      <div className="relative">
        <SlidersHorizontal
          size={14}
          className="
            pointer-events-none
            absolute
            left-3.5
            top-1/2
            z-10
            -translate-y-1/2
            text-slate-400
          "
        />

        <select
          value={filters.category}
          onChange={(event) =>
            updateFilters({
              category:
                event.target.value,
            })
          }
          aria-label="Filter by category"
          className="
            h-11
            w-full
            appearance-none
            rounded-xl
            border
            border-slate-200
            bg-[#F8FAFC]
            pl-10
            pr-8
            text-xs
            font-bold
            text-[#062B63]
            outline-none
            transition-all
            focus:border-[#0878E8]
            focus:bg-white
            focus:ring-2
            focus:ring-blue-100
          "
        >
          <option value="">
            All categories
          </option>

          {categories.map(
            (category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ),
          )}
        </select>

        <span
          className="
            pointer-events-none
            absolute
            right-3.5
            top-1/2
            -translate-y-1/2
            text-[10px]
            text-slate-400
          "
        >
          ▼
        </span>
      </div>

      {/* =========================
          STATUS
      ========================== */}

      <div className="relative">
        <select
          value={filters.active}
          onChange={(event) =>
            updateFilters({
              active:
                event.target.value,
            })
          }
          aria-label="Filter by status"
          className="
            h-11
            w-full
            appearance-none
            rounded-xl
            border
            border-slate-200
            bg-[#F8FAFC]
            px-4
            pr-8
            text-xs
            font-bold
            text-[#062B63]
            outline-none
            transition-all
            focus:border-[#0878E8]
            focus:bg-white
            focus:ring-2
            focus:ring-blue-100
          "
        >
          <option value="all">
            All statuses
          </option>

          <option value="active">
            Active only
          </option>

          <option value="inactive">
            Inactive only
          </option>
        </select>

        <span
          className="
            pointer-events-none
            absolute
            right-3.5
            top-1/2
            -translate-y-1/2
            text-[10px]
            text-slate-400
          "
        >
          ▼
        </span>
      </div>

      {/* =========================
          FEATURED
      ========================== */}

      <div className="relative">
        <select
          value={filters.featured}
          onChange={(event) =>
            updateFilters({
              featured:
                event.target.value,
            })
          }
          aria-label="Filter by featured status"
          className="
            h-11
            w-full
            appearance-none
            rounded-xl
            border
            border-slate-200
            bg-[#F8FAFC]
            px-4
            pr-8
            text-xs
            font-bold
            text-[#062B63]
            outline-none
            transition-all
            focus:border-[#0878E8]
            focus:bg-white
            focus:ring-2
            focus:ring-blue-100
          "
        >
          <option value="all">
            All services
          </option>

          <option value="featured">
            Featured only
          </option>

          <option value="normal">
            Non-featured only
          </option>
        </select>

        <span
          className="
            pointer-events-none
            absolute
            right-3.5
            top-1/2
            -translate-y-1/2
            text-[10px]
            text-slate-400
          "
        >
          ▼
        </span>
      </div>
    </div>
  );
}