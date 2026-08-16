import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  Pencil,
  Star,
  Tag,
  UserRound,
} from "lucide-react";

import type { BlogAdminViewModel } from "@/features/blogs/types/blog";

interface BlogDetailProps {
  blog: BlogAdminViewModel;
}

function formatDate(date?: string) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default function BlogDetail({
  blog,
}: BlogDetailProps) {
  return (
    <div className="space-y-6">
      {/* =========================================
          TOP ACTION BAR
      ========================================== */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/admin/blogs"
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-[#062B63]"
        >
          <ArrowLeft size={16} />
          Back to Blogs
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={`/blog/${blog.slug}`}
            target="_blank"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            <ExternalLink size={15} />
            View Public
          </Link>

          <Link
            href={`/admin/blogs/${blog.id}/edit`}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0878E8] px-4 text-sm font-bold text-white transition hover:bg-[#066BCF]"
          >
            <Pencil size={15} />
            Edit Blog
          </Link>
        </div>
      </div>

      {/* =========================================
          HERO
      ========================================== */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {blog.featuredImage?.url ? (
          <div className="aspect-[21/8] w-full overflow-hidden bg-slate-100">
            <img
              src={blog.featuredImage.url}
              alt={
                blog.featuredImage.alt ||
                blog.title
              }
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="flex aspect-[21/8] w-full items-center justify-center bg-slate-100 text-slate-300">
            <FileText size={42} />
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            {blog.category && (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#0878E8]">
                {blog.category}
              </span>
            )}

            {blog.featured && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600">
                <Star
                  size={12}
                  className="fill-amber-400"
                />
                Featured
              </span>
            )}

            {blog.published ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                <CheckCircle2 size={12} />
                Published
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600">
                <Clock3 size={12} />
                Draft
              </span>
            )}
          </div>

          <h1 className="mt-4 max-w-4xl text-3xl font-extrabold tracking-tight text-[#062B63] sm:text-4xl">
            {blog.title}
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
            {blog.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-100 pt-5 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-2">
              <UserRound size={14} />
              {blog.author}
            </span>

            {blog.publishedAt && (
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={14} />
                {formatDate(blog.publishedAt)}
              </span>
            )}

            <span className="inline-flex items-center gap-2">
              <FileText size={14} />
              /blog/{blog.slug}
            </span>
          </div>
        </div>
      </section>

      {/* =========================================
          MAIN CONTENT + SIDEBAR
      ========================================== */}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* CONTENT */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
            <FileText
              size={18}
              className="text-[#0878E8]"
            />

            <h2 className="text-lg font-bold text-[#062B63]">
              Blog Content
            </h2>
          </div>

          <article className="whitespace-pre-wrap break-words text-sm leading-8 text-slate-600">
            {blog.content}
          </article>
        </section>

        {/* SIDEBAR */}

        <aside className="space-y-6">
          {/* Tags */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Tag
                size={17}
                className="text-[#0878E8]"
              />

              <h2 className="font-bold text-[#062B63]">
                Tags
              </h2>
            </div>

            {blog.tags.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-400">
                No tags added.
              </p>
            )}
          </section>

          {/* Publishing */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-[#062B63]">
              Publishing
            </h2>

            <div className="mt-4 space-y-4">
              <InfoRow
                label="Status"
                value={
                  blog.published
                    ? "Published"
                    : "Draft"
                }
              />

              <InfoRow
                label="Featured"
                value={
                  blog.featured
                    ? "Yes"
                    : "No"
                }
              />

              <InfoRow
                label="Sort Order"
                value={String(blog.sortOrder)}
              />

              <InfoRow
                label="Published At"
                value={formatDate(
                  blog.publishedAt,
                )}
              />
            </div>
          </section>

          {/* SEO */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-[#062B63]">
              SEO
            </h2>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  SEO Title
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {blog.seoTitle || "Not set"}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  SEO Description
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {blog.seoDescription ||
                    "Not set"}
                </p>
              </div>
            </div>
          </section>

          {/* Metadata */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-[#062B63]">
              Record Information
            </h2>

            <div className="mt-4 space-y-4">
              <InfoRow
                label="Created"
                value={formatDate(
                  blog.createdAt,
                )}
              />

              <InfoRow
                label="Last Updated"
                value={formatDate(
                  blog.updatedAt,
                )}
              />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-600">
        {value}
      </p>
    </div>
  );
}