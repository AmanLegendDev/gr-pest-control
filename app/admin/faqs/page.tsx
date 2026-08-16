import Link from "next/link";
import {
  ChevronRight,
  CircleHelp,
  Plus,
  Star,
} from "lucide-react";

import { getAdminFAQs } from "@/features/faq/queries/getFAQs";

import FAQActions from "@/components/admin/faq/FAQActions";

export const dynamic = "force-dynamic";

export default async function AdminFAQPage() {
  const faqs = await getAdminFAQs();

  const activeCount = faqs.filter(
    (faq) => faq.active,
  ).length;

  const featuredCount = faqs.filter(
    (faq) => faq.featured,
  ).length;

  const categories = new Set(
    faqs
      .map((faq) => faq.category)
      .filter(Boolean),
  ).size;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* =========================
            HEADER
        ========================== */}

        <div className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-400">
                <span>Admin</span>

                <ChevronRight size={13} />

                <span className="text-[#0878E8]">
                  FAQs
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0878E8]">
                  <CircleHelp size={23} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-[#062B63] sm:text-3xl">
                    Frequently Asked Questions
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Manage customer questions,
                    answers, categories, featured
                    FAQs and publishing status.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/admin/faqs/new"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0878E8] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#066BCF]"
            >
              <Plus size={17} />
              Add FAQ
            </Link>
          </div>
        </div>

        {/* =========================
            STATS
        ========================== */}

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Total FAQs"
            value={faqs.length}
          />

          <StatCard
            label="Active FAQs"
            value={activeCount}
          />

          <StatCard
            label="Featured FAQs"
            value={featuredCount}
            icon={<Star size={15} />}
          />
        </div>

        {/* =========================
            TABLE
        ========================== */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-[#062B63]">
                  All FAQs
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {faqs.length} FAQ
                  {faqs.length === 1 ? "" : "s"}
                  {categories > 0 &&
                    ` · ${categories} categor${
                      categories === 1
                        ? "y"
                        : "ies"
                    }`}
                </p>
              </div>
            </div>
          </div>

          {faqs.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                    <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Question
                    </th>

                    <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Category
                    </th>

                    <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Order
                    </th>

                    <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Status
                    </th>

                    <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {faqs.map((faq) => (
                    <tr
                      key={faq.id}
                      className="group transition hover:bg-slate-50/60"
                    >
                      {/* Question */}

                      <td className="max-w-[420px] px-5 py-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
                            <CircleHelp
                              size={15}
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="line-clamp-2 text-sm font-bold text-[#062B63]">
                              {faq.question}
                            </p>

                            <p className="mt-1 line-clamp-1 text-xs text-slate-400">
                              {faq.answer}
                            </p>

                            {faq.featured && (
                              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-600">
                                <Star
                                  size={10}
                                  className="fill-current"
                                />
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}

                      <td className="px-5 py-4">
                        {faq.category ? (
                          <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                            {faq.category}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-300">
                            —
                          </span>
                        )}
                      </td>

                      {/* Sort */}

                      <td className="px-5 py-4">
                        <span className="text-sm font-semibold text-slate-600">
                          {faq.sortOrder}
                        </span>
                      </td>

                      {/* Status */}

                      <td className="px-5 py-4">
                        <span
                          className={
                            faq.active
                              ? "inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600"
                              : "inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500"
                          }
                        >
                          {faq.active
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}

                      <td className="px-5 py-4 text-right">
                        <FAQActions
                          faqId={faq.id}
                          active={faq.active}
                          featured={faq.featured}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        {icon && (
          <span className="text-amber-400">
            {icon}
          </span>
        )}
      </div>

      <p className="mt-2 text-3xl font-extrabold tracking-tight text-[#062B63]">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   EMPTY
========================================================= */

function EmptyState() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#0878E8]">
        <CircleHelp size={26} />
      </div>

      <h3 className="mt-4 text-lg font-bold text-[#062B63]">
        No FAQs yet
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
        Create your first FAQ to start building
        the customer help section.
      </p>

      <Link
        href="/admin/faqs/new"
        className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-[#0878E8] px-4 text-sm font-semibold text-white hover:bg-[#066BCF]"
      >
        <Plus size={16} />
        Add FAQ
      </Link>
    </div>
  );
}