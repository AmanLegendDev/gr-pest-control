import Link from "next/link";
import Image from "next/image";
import {
  Camera,
  Eye,
  ImageIcon,
  Plus,
  Search,
} from "lucide-react";

import { getAdminGallery } from "@/features/gallery/queries/getGallery";

import GalleryActions from "@/components/admin/gallery/GalleryActions";

const CATEGORY_LABELS: Record<string, string> = {
  home: "Home",
  workplace: "Workplace",
  commercial: "Commercial",
  residential: "Residential",
  treatment: "Treatment",
  team: "Our Team",
  other: "Other",
};

const CATEGORY_STYLES: Record<string, string> = {
  home: "bg-blue-50 text-blue-700",
  workplace: "bg-violet-50 text-violet-700",
  commercial: "bg-amber-50 text-amber-700",
  residential: "bg-emerald-50 text-emerald-700",
  treatment: "bg-cyan-50 text-cyan-700",
  team: "bg-pink-50 text-pink-700",
  other: "bg-slate-100 text-slate-600",
};

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const items = await getAdminGallery();

  const activeCount = items.filter(
    (item) => item.active,
  ).length;

  const featuredCount = items.filter(
    (item) => item.featured,
  ).length;

  const categoryCount = new Set(
    items.map((item) => item.category),
  ).size;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* =========================================
            HEADER
        ========================================== */}

        <div className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
                  <Camera size={18} />
                </div>

                <span className="text-sm font-bold text-[#0878E8]">
                  Content Management
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-[#062B63] sm:text-3xl">
                Gallery
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Manage project images, categories,
                featured content and gallery visibility.
              </p>
            </div>

            <Link
              href="/admin/gallery/new"
              className="
                inline-flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#0878E8]
                px-5
                text-sm
                font-bold
                text-white
                shadow-sm
                transition
                hover:bg-[#066BCF]
                hover:shadow-md
                focus:outline-none
                focus:ring-2
                focus:ring-blue-200
              "
            >
              <Plus size={17} />
              Add Gallery Item
            </Link>
          </div>
        </div>

        {/* =========================================
            STATS
        ========================================== */}

        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            label="Total Items"
            value={items.length}
            icon={<ImageIcon size={17} />}
          />

          <StatCard
            label="Active"
            value={activeCount}
            icon={<span className="h-2 w-2 rounded-full bg-emerald-500" />}
          />

          <StatCard
            label="Featured"
            value={featuredCount}
            icon={<span className="h-2 w-2 rounded-full bg-amber-500" />}
          />

          <StatCard
            label="Categories"
            value={categoryCount}
            icon={<Camera size={17} />}
          />
        </div>

        {/* =========================================
            FILTER / SEARCH BAR
        ========================================== */}

        <div
          className="
            mb-5
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-3
            shadow-[0_4px_20px_rgba(15,23,42,0.03)]
          "
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 lg:max-w-md">
              <Search
                size={16}
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="search"
                placeholder="Search gallery items..."
                className="
                  h-10
                  w-full
                  rounded-lg
                  border
                  border-slate-200
                  bg-slate-50
                  pl-9
                  pr-3
                  text-sm
                  text-slate-700
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-blue-300
                  focus:bg-white
                  focus:ring-2
                  focus:ring-blue-50
                "
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              <FilterButton active>
                All
              </FilterButton>

              <FilterButton>
                Home
              </FilterButton>

              <FilterButton>
                Workplace
              </FilterButton>

              <FilterButton>
                Commercial
              </FilterButton>

              <FilterButton>
                Treatment
              </FilterButton>
            </div>
          </div>
        </div>

        {/* =========================================
            CONTENT
        ========================================== */}

        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-[0_4px_25px_rgba(15,23,42,0.04)]
            "
          >
            {/* Desktop table */}

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                      Gallery Item
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                      Category
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                      Status
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                      Featured
                    </th>

                    <th className="px-5 py-4 text-left text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                      Order
                    </th>

                    <th className="px-5 py-4 text-right text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {items.map((item) => {
                    const category =
                      item.category;

                    return (
                      <tr
                        key={item.id}
                        className="group transition hover:bg-slate-50/60"
                      >
                        {/* ITEM */}

                        <td className="px-5 py-4">
                          <div className="flex min-w-[300px] items-center gap-4">
                            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                              <Image
                                src={item.image.url}
                                alt={item.image.alt}
                                fill
                                sizes="96px"
                                className="object-cover transition duration-300 group-hover:scale-105"
                              />
                            </div>

                            <div className="min-w-0">
                              <Link
                                href={`/gallery/${item.slug}`}
                                target="_blank"
                                className="
                                  block
                                  truncate
                                  text-sm
                                  font-bold
                                  text-[#062B63]
                                  transition
                                  hover:text-[#0878E8]
                                "
                              >
                                {item.title}
                              </Link>

                              <p className="mt-1 max-w-[300px] truncate text-xs text-slate-400">
                                /gallery/{item.slug}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* CATEGORY */}

                        <td className="px-5 py-4">
                          <span
                            className={`
                              inline-flex
                              rounded-full
                              px-2.5
                              py-1
                              text-[10px]
                              font-extrabold
                              uppercase
                              tracking-wide
                              ${
                                CATEGORY_STYLES[
                                  category
                                ] ??
                                "bg-slate-100 text-slate-600"
                              }
                            `}
                          >
                            {CATEGORY_LABELS[
                              category
                            ] ?? category}
                          </span>
                        </td>

                        {/* STATUS */}

                        <td className="px-5 py-4">
                          <StatusBadge
                            active={item.active}
                          />
                        </td>

                        {/* FEATURED */}

                        <td className="px-5 py-4">
                          {item.featured ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                              Featured
                            </span>
                          ) : (
                            <span className="text-xs font-medium text-slate-400">
                              No
                            </span>
                          )}
                        </td>

                        {/* ORDER */}

                        <td className="px-5 py-4">
                          <span className="text-xs font-bold text-slate-500">
                            #{item.sortOrder}
                          </span>
                        </td>

                        {/* ACTIONS */}

                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/gallery/${item.slug}`}
                              target="_blank"
                              title="View"
                              className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-slate-200
                                text-slate-400
                                transition
                                hover:border-blue-100
                                hover:bg-blue-50
                                hover:text-[#0878E8]
                              "
                            >
                              <Eye size={15} />
                            </Link>

                            <GalleryActions
                              galleryId={item.id}
                              active={item.active}
                              featured={item.featured}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile */}

            <div className="divide-y divide-slate-100 lg:hidden">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4"
                >
                  <div className="flex gap-3">
                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      <Image
                        src={item.image.url}
                        alt={item.image.alt}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/gallery/${item.slug}`}
                          target="_blank"
                          className="line-clamp-2 text-sm font-bold text-[#062B63]"
                        >
                          {item.title}
                        </Link>

                        <GalleryActions
                          galleryId={item.id}
                          active={item.active}
                          featured={item.featured}
                        />
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span
                          className={`
                            rounded-full
                            px-2
                            py-1
                            text-[9px]
                            font-extrabold
                            uppercase
                            ${
                              CATEGORY_STYLES[
                                item.category
                              ] ??
                              "bg-slate-100 text-slate-600"
                            }
                          `}
                        >
                          {CATEGORY_LABELS[
                            item.category
                          ] ?? item.category}
                        </span>

                        <StatusBadge
                          active={item.active}
                        />

                        {item.featured && (
                          <span className="text-[10px] font-bold text-amber-600">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-[10px] font-medium text-slate-400">
                      Updated{" "}
                      {new Date(
                        item.updatedAt,
                      ).toLocaleDateString(
                        "en-IN",
                      )}
                    </span>

                    <Link
                      href={`/gallery/${item.slug}`}
                      target="_blank"
                      className="text-xs font-bold text-[#0878E8]"
                    >
                      View Gallery →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

/* =========================================
   STAT CARD
========================================= */

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400">
          {label}
        </span>

        <span className="text-[#0878E8]">
          {icon}
        </span>
      </div>

      <p className="mt-3 text-2xl font-extrabold tracking-tight text-[#062B63]">
        {value}
      </p>
    </div>
  );
}

/* =========================================
   FILTER BUTTON
========================================= */

function FilterButton({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`
        shrink-0
        rounded-lg
        px-3
        py-2
        text-xs
        font-bold
        transition
        ${
          active
            ? "bg-[#062B63] text-white"
            : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        }
      `}
    >
      {children}
    </button>
  );
}

/* =========================================
   STATUS
========================================= */

function StatusBadge({
  active,
}: {
  active: boolean;
}) {
  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        px-2.5
        py-1
        text-[10px]
        font-extrabold
        ${
          active
            ? "bg-emerald-50 text-emerald-700"
            : "bg-slate-100 text-slate-500"
        }
      `}
    >
      <span
        className={`
          h-1.5
          w-1.5
          rounded-full
          ${
            active
              ? "bg-emerald-500"
              : "bg-slate-400"
          }
        `}
      />

      {active
        ? "Active"
        : "Inactive"}
    </span>
  );
}

/* =========================================
   EMPTY STATE
========================================= */

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#0878E8]">
        <ImageIcon size={25} />
      </div>

      <h2 className="mt-5 text-lg font-bold text-[#062B63]">
        No gallery items yet
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Add your first gallery item to
        showcase GR Pest Control's work.
      </p>

      <Link
        href="/admin/gallery/new"
        className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-[#0878E8] px-4 text-sm font-bold text-white transition hover:bg-[#066BCF]"
      >
        <Plus size={16} />
        Add Gallery Item
      </Link>
    </div>
  );
}