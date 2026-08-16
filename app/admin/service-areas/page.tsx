import Link from "next/link";
import {
  MapPin,
  Plus,
  Search,
  Star,
  Eye,
  Pencil,
  ChevronRight,
  Layers3,
} from "lucide-react";

import { getAdminServiceAreas } from "@/features/service-areas/queries/getAdminServiceAreas";

import ServiceAreaActions from "@/components/admin/service-areas/ServiceAreaActions";

export const dynamic = "force-dynamic";

interface ServiceAreasPageProps {
  searchParams: Promise<{
    q?: string;
    status?: string;
    featured?: string;
  }>;
}

export default async function ServiceAreasPage({
  searchParams,
}: ServiceAreasPageProps) {
  const params = await searchParams;

  const query =
    params.q?.trim().toLowerCase() ?? "";

  const status =
    params.status?.trim().toLowerCase() ?? "all";

  const featured =
    params.featured?.trim().toLowerCase() ?? "all";

  const serviceAreas =
    await getAdminServiceAreas();

  const filteredAreas =
    serviceAreas.filter((area) => {
      const matchesSearch =
        !query ||
        area.name
          .toLowerCase()
          .includes(query) ||
        area.slug
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        status === "all" ||
        (status === "active" &&
          area.active) ||
        (status === "inactive" &&
          !area.active);

      const matchesFeatured =
        featured === "all" ||
        (featured === "featured" &&
          area.featured) ||
        (featured === "normal" &&
          !area.featured);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesFeatured
      );
    });

  const totalCount =
    serviceAreas.length;

  const activeCount =
    serviceAreas.filter(
      (area) => area.active,
    ).length;

  const featuredCount =
    serviceAreas.filter(
      (area) => area.featured,
    ).length;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* =========================
          HEADER
      ========================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              {/* Breadcrumb */}

              <div className="mb-3 flex items-center gap-1.5 text-xs font-medium">
                <Link
                  href="/admin/dashboard"
                  className="text-slate-400 transition hover:text-[#0878E8]"
                >
                  Dashboard
                </Link>

                <ChevronRight
                  size={13}
                  className="text-slate-300"
                />

                <span className="font-bold text-[#062B63]">
                  Service Areas
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#0878E8]">
                  <MapPin size={21} />
                </div>

                <div>
                  <h1 className="text-2xl font-extrabold tracking-[-0.035em] text-[#062B63] sm:text-3xl">
                    Service Areas
                  </h1>

                  <p className="mt-1 text-sm text-slate-400">
                    Manage locations where GR Pest
                    Control provides services.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/admin/service-areas/new"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#0878E8]
                px-5
                py-3
                text-sm
                font-extrabold
                text-white
                shadow-[0_8px_25px_rgba(8,120,232,0.20)]
                transition
                hover:bg-[#066dcc]
                active:scale-[0.98]
              "
            >
              <Plus size={17} />
              Add Service Area
            </Link>
          </div>
        </div>
      </section>

      {/* =========================
          CONTENT
      ========================== */}

      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* =========================
              STATS
          ========================== */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              icon={<Layers3 size={18} />}
              label="Total Areas"
              value={totalCount}
            />

            <StatCard
              icon={<MapPin size={18} />}
              label="Active Areas"
              value={activeCount}
            />

            <StatCard
              icon={<Star size={18} />}
              label="Featured Areas"
              value={featuredCount}
            />
          </div>

          {/* =========================
              FILTERS
          ========================== */}

          <form
            method="GET"
            className="
              mt-6
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-4
              shadow-[0_5px_25px_rgba(15,23,42,0.035)]
            "
          >
            <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_auto]">
              {/* Search */}

              <div className="relative">
                <Search
                  size={17}
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
                  name="q"
                  defaultValue={params.q ?? ""}
                  placeholder="Search service areas..."
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    pl-10
                    pr-4
                    text-sm
                    font-medium
                    text-[#062B63]
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-[#0878E8]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-50
                  "
                />
              </div>

              {/* Status */}

              <select
                name="status"
                defaultValue={status}
                className="
                  h-11
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-3
                  text-sm
                  font-semibold
                  text-[#062B63]
                  outline-none
                  focus:border-[#0878E8]
                  focus:ring-4
                  focus:ring-blue-50
                "
              >
                <option value="all">
                  All Status
                </option>

                <option value="active">
                  Active
                </option>

                <option value="inactive">
                  Inactive
                </option>
              </select>

              {/* Featured */}

              <select
                name="featured"
                defaultValue={featured}
                className="
                  h-11
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-3
                  text-sm
                  font-semibold
                  text-[#062B63]
                  outline-none
                  focus:border-[#0878E8]
                  focus:ring-4
                  focus:ring-blue-50
                "
              >
                <option value="all">
                  All Areas
                </option>

                <option value="featured">
                  Featured
                </option>

                <option value="normal">
                  Normal
                </option>
              </select>

              <button
                type="submit"
                className="
                  h-11
                  rounded-xl
                  bg-[#062B63]
                  px-5
                  text-sm
                  font-extrabold
                  text-white
                  transition
                  hover:bg-[#041f49]
                  active:scale-[0.98]
                "
              >
                Filter
              </button>
            </div>
          </form>

          {/* =========================
              LIST
          ========================== */}

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.035)]">

            {/* Desktop Header */}

            <div className="hidden grid-cols-[minmax(280px,1fr)_150px_120px_120px_140px] items-center gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400 lg:grid">
              <span>Service Area</span>
              <span>Status</span>
              <span>Featured</span>
              <span>Order</span>
              <span className="text-right">
                Actions
              </span>
            </div>

            {filteredAreas.length === 0 ? (
              <EmptyState
                hasFilters={
                  Boolean(query) ||
                  status !== "all" ||
                  featured !== "all"
                }
              />
            ) : (
              <div>
                {filteredAreas.map(
                  (area, index) => (
                    <article
                      key={area.id}
                      className={`
                        group
                        border-b
                        border-slate-100
                        p-4
                        last:border-b-0
                        sm:p-5
                      `}
                    >
                      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(280px,1fr)_150px_120px_120px_140px] lg:items-center lg:gap-4">

                        {/* Area */}

                        <div className="flex min-w-0 items-center gap-4">
                          <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                            {area.image?.url ? (
                              <img
                                src={area.image.url}
                                alt={
                                  area.image.alt ||
                                  area.name
                                }
                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-slate-300">
                                <MapPin size={20} />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h2 className="truncate text-sm font-extrabold text-[#062B63]">
                                {area.name}
                              </h2>

                              {area.featured && (
                                <Star
                                  size={13}
                                  className="shrink-0 fill-current text-amber-400"
                                />
                              )}
                            </div>

                            <p className="mt-1 truncate text-xs text-slate-400">
                              /service-areas/
                              {area.slug}
                            </p>

                            <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                              {area.shortDescription}
                            </p>
                          </div>
                        </div>

                        {/* Status */}

                        <div>
                          <StatusBadge
                            active={area.active}
                          />
                        </div>

                        {/* Featured */}

                        <div>
                          {area.featured ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-extrabold text-amber-600">
                              <Star
                                size={11}
                                className="fill-current"
                              />
                              Featured
                            </span>
                          ) : (
                            <span className="text-xs font-semibold text-slate-400">
                              Normal
                            </span>
                          )}
                        </div>

                        {/* Sort */}

                        <div className="text-xs font-bold text-slate-500">
                          #{String(
                            area.sortOrder,
                          ).padStart(2, "0")}
                        </div>

                        {/* Actions */}

                        <div className="flex items-center justify-start gap-2 lg:justify-end">
                          <Link
                            href={`/admin/service-areas/${area.id}`}
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
                              text-slate-500
                              transition
                              hover:border-blue-100
                              hover:bg-blue-50
                              hover:text-[#0878E8]
                            "
                          >
                            <Eye size={15} />
                          </Link>

                          <Link
                            href={`/admin/service-areas/${area.id}/edit`}
                            title="Edit"
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-lg
                              border
                              border-slate-200
                              text-slate-500
                              transition
                              hover:border-blue-100
                              hover:bg-blue-50
                              hover:text-[#0878E8]
                            "
                          >
                            <Pencil size={15} />
                          </Link>

                          <ServiceAreaActions
                            serviceAreaId={
                              area.id
                            }
                            active={
                              area.active
                            }
                            featured={
                              area.featured
                            }
                          />
                        </div>
                      </div>

                      {/* Mobile meta */}

                      <div className="mt-4 flex flex-wrap items-center gap-2 lg:hidden">
                        <StatusBadge
                          active={area.active}
                        />

                        {area.featured && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-extrabold text-amber-600">
                            <Star
                              size={10}
                              className="fill-current"
                            />
                            Featured
                          </span>
                        )}

                        <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-400">
                          Order #
                          {area.sortOrder}
                        </span>
                      </div>
                    </article>
                  ),
                )}
              </div>
            )}
          </div>

          {/* Result count */}

          {filteredAreas.length > 0 && (
            <div className="mt-4 text-center text-xs font-medium text-slate-400">
              Showing{" "}
              <span className="font-extrabold text-[#062B63]">
                {filteredAreas.length}
              </span>{" "}
              of{" "}
              <span className="font-extrabold text-[#062B63]">
                {totalCount}
              </span>{" "}
              service areas
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* =========================
   STAT CARD
========================= */

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_5px_25px_rgba(15,23,42,0.035)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-[#062B63]">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0878E8]">
          {icon}
        </div>
      </div>
    </div>
  );
}

/* =========================
   STATUS BADGE
========================= */

function StatusBadge({
  active,
}: {
  active: boolean;
}) {
  return active ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold text-emerald-600">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-extrabold text-slate-500">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
      Inactive
    </span>
  );
}

/* =========================
   EMPTY STATE
========================= */

function EmptyState({
  hasFilters,
}: {
  hasFilters: boolean;
}) {
  return (
    <div className="px-6 py-20 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">
        <MapPin size={24} />
      </div>

      <h3 className="mt-5 text-base font-extrabold text-[#062B63]">
        {hasFilters
          ? "No service areas found"
          : "No service areas yet"}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
        {hasFilters
          ? "Try changing your search or filters."
          : "Start building your service coverage by adding your first service area."}
      </p>

      {!hasFilters && (
        <Link
          href="/admin/service-areas/new"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0878E8] px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-[#066dcc]"
        >
          <Plus size={15} />
          Add Service Area
        </Link>
      )}
    </div>
  );
}