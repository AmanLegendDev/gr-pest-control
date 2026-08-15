"use client";

import Link from "next/link";
import {
  Plus,
  Search,
  SlidersHorizontal,
  Layers3,
  CheckCircle2,
  Star,
  X,
} from "lucide-react";

import ServiceCard from "@/components/admin/services/ServiceCard";
import ServiceFilters from "@/components/admin/services/ServiceFilters";

interface ServiceImage {
  url: string;
  publicId: string;
  alt: string;
}

interface AdminService {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  heroImage?: ServiceImage;
  icon?: string;
  pestTypes: string[];
  benefits: string[];
  process: {
    title: string;
    description: string;
    sortOrder: number;
  }[];
  faqs: {
    question: string;
    answer: string;
    sortOrder: number;
  }[];
  seoTitle?: string;
  seoDescription?: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface Filters {
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
}

interface AdminServicesListProps {
  services: AdminService[];
  pagination: Pagination;
  categories: string[];
  filters: Filters;
}

function buildQuery(
  filters: Filters,
  page?: number,
) {
  const params =
    new URLSearchParams();

  if (filters.search) {
    params.set(
      "search",
      filters.search,
    );
  }

  if (filters.category) {
    params.set(
      "category",
      filters.category,
    );
  }

  if (filters.active !== "all") {
    params.set(
      "active",
      filters.active,
    );
  }

  if (
    filters.featured !== "all"
  ) {
    params.set(
      "featured",
      filters.featured,
    );
  }

  if (page && page > 1) {
    params.set(
      "page",
      String(page),
    );
  }

  const query =
    params.toString();

  return query
    ? `?${query}`
    : "/admin/services";
}

export default function AdminServicesList({
  services,
  pagination,
  categories,
  filters,
}: AdminServicesListProps) {
  const activeCount =
    services.filter(
      (service) =>
        service.active,
    ).length;

  const featuredCount =
    services.filter(
      (service) =>
        service.featured,
    ).length;

  const hasFilters =
    Boolean(
      filters.search ||
        filters.category ||
        filters.active !==
          "all" ||
        filters.featured !==
          "all",
    );

  return (
    <div className="space-y-6">
      {/* =========================
          PAGE HEADER
      ========================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-end
          lg:justify-between
        "
      >
        <div>
          <div
            className="
              mb-2
              flex
              items-center
              gap-2
              text-xs
              font-semibold
              text-slate-400
            "
          >
            <Layers3
              size={14}
              className="text-[#0878E8]"
            />

            Content Management
          </div>

          <h1
            className="
              text-2xl
              font-extrabold
              tracking-[-0.04em]
              text-[#062B63]
              sm:text-3xl
            "
          >
            Services
          </h1>

          <p
            className="
              mt-1.5
              max-w-xl
              text-sm
              leading-6
              text-slate-400
            "
          >
            Manage your pest control
            services, visibility, categories
            and featured content.
          </p>
        </div>

        <Link
          href="/admin/services/new"
          className="
            inline-flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#062B63]
            px-5
            text-xs
            font-extrabold
            text-white
            shadow-[0_8px_20px_rgba(6,43,99,0.14)]
            transition-all
            hover:-translate-y-0.5
            hover:bg-[#0878E8]
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#0878E8]
            focus-visible:ring-offset-2
          "
        >
          <Plus size={16} />

          Add Service
        </Link>
      </div>

      {/* =========================
          STATS
      ========================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-3
        "
      >
        <div
          className="
            rounded-2xl
            border
            border-slate-100
            bg-white
            p-4
            shadow-[0_5px_20px_rgba(15,23,42,0.025)]
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <span
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.12em]
                text-slate-400
              "
            >
              Total services
            </span>

            <Layers3
              size={15}
              className="text-[#0878E8]"
            />
          </div>

          <p
            className="
              mt-2
              text-2xl
              font-extrabold
              tracking-[-0.04em]
              text-[#062B63]
            "
          >
            {pagination.total}
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-slate-100
            bg-white
            p-4
            shadow-[0_5px_20px_rgba(15,23,42,0.025)]
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <span
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.12em]
                text-slate-400
              "
            >
              Active on page
            </span>

            <CheckCircle2
              size={15}
              className="text-emerald-500"
            />
          </div>

          <p
            className="
              mt-2
              text-2xl
              font-extrabold
              tracking-[-0.04em]
              text-[#062B63]
            "
          >
            {activeCount}
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-slate-100
            bg-white
            p-4
            shadow-[0_5px_20px_rgba(15,23,42,0.025)]
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <span
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.12em]
                text-slate-400
              "
            >
              Featured on page
            </span>

            <Star
              size={15}
              className="text-amber-500"
            />
          </div>

          <p
            className="
              mt-2
              text-2xl
              font-extrabold
              tracking-[-0.04em]
              text-[#062B63]
            "
          >
            {featuredCount}
          </p>
        </div>
      </div>

      {/* =========================
          FILTER BAR
      ========================== */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-100
          bg-white
          shadow-[0_5px_20px_rgba(15,23,42,0.025)]
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            border-b
            border-slate-100
            px-4
            py-3
          "
        >
          <SlidersHorizontal
            size={14}
            className="text-[#0878E8]"
          />

          <span
            className="
              text-[10px]
              font-extrabold
              uppercase
              tracking-[0.12em]
              text-slate-400
            "
          >
            Filter services
          </span>

          {hasFilters && (
            <Link
              href="/admin/services"
              className="
                ml-auto
                inline-flex
                items-center
                gap-1
                text-[10px]
                font-extrabold
                text-[#0878E8]
                hover:text-[#062B63]
              "
            >
              <X size={12} />

              Clear
            </Link>
          )}
        </div>

        <ServiceFilters
          categories={categories}
          filters={filters}
        />
      </div>

      {/* =========================
          RESULT HEADER
      ========================== */}

      <div
        className="
          flex
          flex-col
          gap-1
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h2
            className="
              text-sm
              font-extrabold
              text-[#062B63]
            "
          >
            {hasFilters
              ? "Filtered services"
              : "All services"}
          </h2>

          <p
            className="
              mt-0.5
              text-[11px]
              text-slate-400
            "
          >
            Showing{" "}
            {services.length} of{" "}
            {pagination.total} services
          </p>
        </div>

        {pagination.totalPages >
          1 && (
          <span
            className="
              text-[10px]
              font-bold
              text-slate-400
            "
          >
            Page{" "}
            {pagination.page}{" "}
            of{" "}
            {pagination.totalPages}
          </span>
        )}
      </div>

      {/* =========================
          SERVICE GRID
      ========================== */}

      {services.length > 0 ? (
        <div
          className="
            grid
            gap-5
            sm:grid-cols-2
            xl:grid-cols-3
          "
        >
          {services.map(
            (service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ),
          )}
        </div>
      ) : (
        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-slate-200
            bg-white
            px-6
            py-16
            text-center
          "
        >
          <div
            className="
              mx-auto
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-slate-50
              text-slate-400
            "
          >
            <Search size={19} />
          </div>

          <h3
            className="
              mt-4
              text-sm
              font-extrabold
              text-[#062B63]
            "
          >
            No services found
          </h3>

          <p
            className="
              mx-auto
              mt-1.5
              max-w-sm
              text-xs
              leading-6
              text-slate-400
            "
          >
            Try changing your search or
            filters, or create a new service.
          </p>

          {hasFilters && (
            <Link
              href="/admin/services"
              className="
                mt-5
                inline-flex
                items-center
                gap-1.5
                text-xs
                font-extrabold
                text-[#0878E8]
                hover:text-[#062B63]
              "
            >
              Clear all filters
            </Link>
          )}
        </div>
      )}

      {/* =========================
          PAGINATION
      ========================== */}

      {pagination.totalPages > 1 && (
        <div
          className="
            flex
            items-center
            justify-center
            gap-2
            pt-2
          "
        >
          {pagination.hasPreviousPage ? (
            <Link
              href={buildQuery(
                filters,
                pagination.page - 1,
              )}
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-2.5
                text-[10px]
                font-extrabold
                text-[#062B63]
                transition-colors
                hover:border-blue-200
                hover:bg-blue-50
                hover:text-[#0878E8]
              "
            >
              Previous
            </Link>
          ) : (
            <span
              className="
                cursor-not-allowed
                rounded-xl
                border
                border-slate-100
                bg-slate-50
                px-4
                py-2.5
                text-[10px]
                font-extrabold
                text-slate-300
              "
            >
              Previous
            </span>
          )}

          <span
            className="
              rounded-xl
              bg-[#062B63]
              px-4
              py-2.5
              text-[10px]
              font-extrabold
              text-white
            "
          >
            {pagination.page}
          </span>

          {pagination.hasNextPage ? (
            <Link
              href={buildQuery(
                filters,
                pagination.page + 1,
              )}
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-2.5
                text-[10px]
                font-extrabold
                text-[#062B63]
                transition-colors
                hover:border-blue-200
                hover:bg-blue-50
                hover:text-[#0878E8]
              "
            >
              Next
            </Link>
          ) : (
            <span
              className="
                cursor-not-allowed
                rounded-xl
                border
                border-slate-100
                bg-slate-50
                px-4
                py-2.5
                text-[10px]
                font-extrabold
                text-slate-300
              "
            >
              Next
            </span>
          )}
        </div>
      )}
    </div>
  );
}