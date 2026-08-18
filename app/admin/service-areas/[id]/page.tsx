import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  CircleHelp,
  ExternalLink,
  FileText,
  Globe2,
  Image as ImageIcon,
  Layers3,
  MapPin,
  MapPinned,
  Pencil,
  Search,
  Star,
  Tag,
  XCircle,
} from "lucide-react";

import { getServiceAreaById } from "@/features/service-areas/queries/getServiceAreaById";

interface ServiceAreaDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function ServiceAreaDetailPage({
  params,
}: ServiceAreaDetailPageProps) {
  const { id } = await params;

  const serviceArea = await getServiceAreaById(id);

  if (!serviceArea) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* =========================
          HEADER
      ========================== */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Link
                href="/admin/service-areas"
                className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-[#0878E8]"
              >
                <ArrowLeft size={16} />
                Back to Service Areas
              </Link>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#0878E8]">
                  <MapPinned size={22} />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold text-[#0878E8]">
                      Service Area
                    </p>

                    {serviceArea.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-extrabold text-amber-600">
                        <Star
                          size={11}
                          className="fill-current"
                        />
                        Featured
                      </span>
                    )}

                    {serviceArea.active ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold text-emerald-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-extrabold text-slate-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                        Inactive
                      </span>
                    )}
                  </div>

                  <h1 className="mt-1 break-words text-2xl font-extrabold tracking-[-0.035em] text-[#062B63] sm:text-3xl">
                    {serviceArea.name}
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                    {serviceArea.shortDescription}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:pt-8">
              <Link
                href={`/admin/service-areas/${serviceArea.id}/edit`}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 transition hover:border-blue-100 hover:bg-blue-50 hover:text-[#0878E8]"
              >
                <Pencil size={15} />
                Edit
              </Link>

              {serviceArea.active && (
                <Link
                  href={`/service-areas/${serviceArea.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#0878E8] px-4 text-sm font-extrabold text-white shadow-[0_8px_25px_rgba(8,120,232,0.18)] transition hover:bg-[#066dcc]"
                >
                  View Live
                  <ExternalLink size={15} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CONTENT
      ========================== */}

      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">

          {/* =========================
              HERO / IMAGE
          ========================== */}

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.035)]">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">

              {/* Image */}

              <div className="relative min-h-[260px] bg-slate-100 sm:min-h-[360px] lg:min-h-[430px]">
                {serviceArea.image?.url ? (
                  <img
                    src={serviceArea.image.url}
                    alt={
                      serviceArea.image.alt ||
                      serviceArea.name
                    }
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[260px] items-center justify-center text-slate-300 sm:min-h-[360px]">
                    <div className="text-center">
                      <ImageIcon
                        size={36}
                        className="mx-auto"
                      />
                      <p className="mt-3 text-xs font-semibold">
                        No service area image
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Overview */}

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#0878E8]">
                  Area Overview
                </p>

                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#062B63]">
                  {serviceArea.name}
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-500">
                  {serviceArea.description}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <InfoStat
                    icon={<MapPin size={16} />}
                    label="Service Area"
                    value={serviceArea.name}
                  />

                  <InfoStat
                    icon={<Layers3 size={16} />}
                    label="Sort Order"
                    value={`#${String(
                      serviceArea.sortOrder,
                    ).padStart(2, "0")}`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* =========================
              MAIN GRID
          ========================== */}

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">

            {/* LEFT */}

            <div className="space-y-6">

              {/* Highlights */}

              {serviceArea.highlights.length > 0 && (
                <SectionCard
                  icon={<CheckCircle2 size={18} />}
                  eyebrow="Key Information"
                  title="Service Highlights"
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    {serviceArea.highlights.map(
                      (highlight, index) => (
                        <div
                          key={`${highlight}-${index}`}
                          className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4"
                        >
                          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                            <CheckCircle2 size={15} />
                          </span>

                          <p className="text-sm font-semibold leading-6 text-slate-600">
                            {highlight}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </SectionCard>
              )}

              {/* Nearby Areas */}

              {serviceArea.nearbyAreas.length > 0 && (
                <SectionCard
                  icon={<MapPin size={18} />}
                  eyebrow="Coverage"
                  title="Nearby Areas"
                >
                  <div className="flex flex-wrap gap-2">
                    {serviceArea.nearbyAreas.map(
                      (area, index) => (
                        <span
                          key={`${area}-${index}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600"
                        >
                          <MapPin
                            size={12}
                            className="text-[#0878E8]"
                          />
                          {area}
                        </span>
                      ),
                    )}
                  </div>
                </SectionCard>
              )}

              {/* FAQs */}

              {serviceArea.faqs.length > 0 && (
                <SectionCard
                  icon={<CircleHelp size={18} />}
                  eyebrow="Customer Questions"
                  title="Frequently Asked Questions"
                >
                  <div className="divide-y divide-slate-100 rounded-xl border border-slate-100">
                    {serviceArea.faqs
                      .slice()
                      .sort(
                        (a, b) =>
                          a.sortOrder -
                          b.sortOrder,
                      )
                      .map((faq, index) => (
                        <div
                          key={`${faq.question}-${index}`}
                          className="p-5"
                        >
                          <div className="flex items-start gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
                              <CircleHelp size={15} />
                            </span>

                            <div className="min-w-0">
                              <h3 className="text-sm font-extrabold leading-6 text-[#062B63]">
                                {faq.question}
                              </h3>

                              <p className="mt-2 text-sm leading-6 text-slate-500">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </SectionCard>
              )}

              {/* SEO */}

              <SectionCard
                icon={<Search size={18} />}
                eyebrow="Search Engine Optimisation"
                title="SEO Information"
              >
                <div className="space-y-4">

                  <div>
                    <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                      SEO Title
                    </p>

                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-sm font-semibold leading-6 text-slate-600">
                      {serviceArea.seoTitle ||
                        "No SEO title configured."}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                      SEO Description
                    </p>

                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-600">
                      {serviceArea.seoDescription ||
                        "No SEO description configured."}
                    </div>
                  </div>

                </div>
              </SectionCard>
            </div>

            {/* RIGHT */}

            <aside className="space-y-6">

              {/* Publishing */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.035)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0878E8]">
                    <Globe2 size={18} />
                  </div>

                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                      Publishing
                    </p>

                    <h2 className="mt-0.5 text-sm font-extrabold text-[#062B63]">
                      Visibility
                    </h2>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <StatusRow
                    label="Status"
                    active={serviceArea.active}
                    activeText="Active"
                    inactiveText="Inactive"
                  />

                  <StatusRow
                    label="Featured"
                    active={serviceArea.featured}
                    activeText="Featured"
                    inactiveText="Normal"
                  />
                </div>
              </div>

              {/* URL */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.035)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0878E8]">
                    <Globe2 size={18} />
                  </div>

                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                      Public URL
                    </p>

                    <h2 className="mt-0.5 text-sm font-extrabold text-[#062B63]">
                      Service Page
                    </h2>
                  </div>
                </div>

                <div className="mt-4 break-all rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold leading-5 text-slate-500">
                    /service-areas/
                    {serviceArea.slug}
                  </p>
                </div>

                {serviceArea.active && (
                  <Link
                    href={`/service-areas/${serviceArea.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-xs font-extrabold text-[#0878E8] transition hover:bg-blue-100"
                  >
                    Open Public Page
                    <ArrowUpRight size={14} />
                  </Link>
                )}
              </div>

              {/* Image Information */}

              {serviceArea.image && (
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.035)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0878E8]">
                      <ImageIcon size={18} />
                    </div>

                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                        Media
                      </p>

                      <h2 className="mt-0.5 text-sm font-extrabold text-[#062B63]">
                        Featured Image
                      </h2>
                    </div>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                    <img
                      src={serviceArea.image.url}
                      alt={
                        serviceArea.image.alt ||
                        serviceArea.name
                      }
                      className="h-40 w-full object-cover"
                    />
                  </div>

                  <div className="mt-3">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                      Alt Text
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {serviceArea.image.alt}
                    </p>
                  </div>
                </div>
              )}

              {/* Metadata */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.035)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0878E8]">
                    <FileText size={18} />
                  </div>

                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                      Record
                    </p>

                    <h2 className="mt-0.5 text-sm font-extrabold text-[#062B63]">
                      Details
                    </h2>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <MetaRow
                    icon={<Tag size={14} />}
                    label="Slug"
                    value={serviceArea.slug}
                  />

                  <MetaRow
                    icon={<Layers3 size={14} />}
                    label="Sort Order"
                    value={`#${String(
                      serviceArea.sortOrder,
                    ).padStart(2, "0")}`}
                  />

                  <MetaRow
                    icon={<FileText size={14} />}
                    label="FAQs"
                    value={String(
                      serviceArea.faqs.length,
                    )}
                  />

                  <MetaRow
                    icon={<MapPin size={14} />}
                    label="Nearby Areas"
                    value={String(
                      serviceArea.nearbyAreas.length,
                    )}
                  />

                  <MetaRow
                    icon={<CheckCircle2 size={14} />}
                    label="Highlights"
                    value={String(
                      serviceArea.highlights.length,
                    )}
                  />
                </div>
              </div>

            </aside>
          </div>

        </div>
      </section>
    </main>
  );
}

/* =========================
   SECTION CARD
========================== */

function SectionCard({
  icon,
  eyebrow,
  title,
  children,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.035)] sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0878E8]">
          {icon}
        </div>

        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
            {eyebrow}
          </p>

          <h2 className="mt-0.5 text-base font-extrabold text-[#062B63]">
            {title}
          </h2>
        </div>
      </div>

      {children}
    </section>
  );
}

/* =========================
   INFO STAT
========================== */

function InfoStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
      <div className="flex items-center gap-2 text-[#0878E8]">
        {icon}

        <span className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-400">
          {label}
        </span>
      </div>

      <p className="mt-2 truncate text-sm font-extrabold text-[#062B63]">
        {value}
      </p>
    </div>
  );
}

/* =========================
   STATUS ROW
========================== */

function StatusRow({
  label,
  active,
  activeText,
  inactiveText,
}: {
  label: string;
  active: boolean;
  activeText: string;
  inactiveText: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-3">
      <span className="text-xs font-bold text-slate-500">
        {label}
      </span>

      {active ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold text-emerald-600">
          <CheckCircle2 size={11} />
          {activeText}
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-extrabold text-slate-500">
          <XCircle size={11} />
          {inactiveText}
        </span>
      )}
    </div>
  );
}

/* =========================
   META ROW
========================== */

function MetaRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
        {icon}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-all text-xs font-semibold leading-5 text-slate-600">
          {value}
        </p>
      </div>
    </div>
  );
}