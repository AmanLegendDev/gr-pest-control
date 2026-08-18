import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  FileText,
  Plus,
  Star,
} from "lucide-react";



import { getAdminBlogs } from "@/features/blogs/queries/getBlogs";

import BlogActions from "@/components/admin/blogs/BlogActions";

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const blogs = await getAdminBlogs(100);

  const publishedCount = blogs.filter(
    (blog) => blog.published,
  ).length;

  const draftCount =
    blogs.length - publishedCount;

  const featuredCount = blogs.filter(
    (blog) => blog.featured,
  ).length;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* =========================
            HEADER
        ========================== */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#0878E8]">
              <FileText size={13} />
              Blog Management
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-[#062B63] sm:text-3xl">
              Blogs
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Create, manage, publish and organize
              your website blog content.
            </p>
          </div>

          <Link
            href="/admin/blogs/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0878E8] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#066BCF] focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <Plus size={17} />
            New Blog
          </Link>
        </div>

        {/* =========================
            STATS
        ========================== */}

        <div className="mb-6 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Blogs
            </p>

            <p className="mt-2 text-2xl font-extrabold text-[#062B63]">
              {blogs.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Published
            </p>

            <p className="mt-2 text-2xl font-extrabold text-emerald-600">
              {publishedCount}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {draftCount} draft
              {draftCount === 1 ? "" : "s"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Featured
            </p>

            <p className="mt-2 flex items-center gap-2 text-2xl font-extrabold text-amber-500">
              {featuredCount}
              <Star
                size={19}
                className="fill-amber-400"
              />
            </p>
          </div>

        </div>

        {/* =========================
            EMPTY STATE
        ========================== */}

        {blogs.length === 0 ? (
          <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#0878E8]">
              <FileText size={25} />
            </div>

            <h2 className="mt-5 text-lg font-bold text-[#062B63]">
              No blogs yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Create your first blog post to start
              publishing useful content on your website.
            </p>

            <Link
              href="/admin/blogs/new"
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-[#0878E8] px-4 text-sm font-bold text-white hover:bg-[#066BCF]"
            >
              <Plus size={16} />
              Create First Blog
            </Link>
          </section>
        ) : (

          /* =========================
             TABLE
          ========================== */

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

  {/* =================================
      MOBILE BLOG CARDS
  ================================== */}

  <div className="divide-y divide-slate-100 sm:hidden">

    {blogs.map((blog) => (
      <div
        key={blog.id}
        className="p-4"
      >
        <div className="flex items-start gap-3">

          {/* Image */}
          <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
            {blog.featuredImage?.url ? (
              <img
                src={blog.featuredImage.url}
                alt={
                  blog.featuredImage.alt ||
                  blog.title
                }
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-300">
                <FileText size={18} />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">

            {/* Title */}
            <div className="flex min-w-0 items-start gap-2">

              <p className="min-w-0 flex-1 break-words text-sm font-bold leading-5 text-[#062B63]">
                {blog.title}
              </p>

              {blog.featured && (
                <Star
                  size={13}
                  className="mt-0.5 shrink-0 fill-amber-400 text-amber-400"
                />
              )}

            </div>

            {/* Slug */}
            <p className="mt-1 break-all text-xs leading-5 text-slate-400">
              /blog/{blog.slug}
            </p>

            {/* Meta */}
            <div className="mt-3 flex flex-wrap items-center gap-2">

              {blog.category && (
                <span className="max-w-full truncate rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                  {blog.category}
                </span>
              )}

              {blog.published ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Published
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Draft
                </span>
              )}

            </div>

            {/* Date + Actions */}
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">

              <div className="min-w-0">

                {blog.publishedAt ? (
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                    <CalendarDays
                      size={13}
                      className="shrink-0"
                    />

                    <span>
                      {formatDate(blog.publishedAt)}
                    </span>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-300">
                    Not published
                  </span>
                )}

              </div>

              <div className="shrink-0">
                <BlogActions
                  blogId={blog.id}
                  slug={blog.slug}
                  published={blog.published}
                  featured={blog.featured}
                />
              </div>

            </div>

          </div>
        </div>
      </div>
    ))}

  </div>


  {/* =================================
      DESKTOP BLOG TABLE
  ================================== */}

  <div className="hidden overflow-x-auto sm:block">

    <table className="w-full text-left">

      <thead className="border-b border-slate-200 bg-slate-50">

        <tr>

          <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
            Blog
          </th>

          <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
            Category
          </th>

          <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
            Author
          </th>

          <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
            Status
          </th>

          <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
            Published
          </th>

          <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-400">
            Actions
          </th>

        </tr>

      </thead>


      <tbody className="divide-y divide-slate-100">

        {blogs.map((blog) => (

          <tr
            key={blog.id}
            className="transition hover:bg-slate-50/70"
          >

            {/* BLOG */}

            <td className="px-5 py-4">

              <div className="flex items-center gap-3">

                <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">

                  {blog.featuredImage?.url ? (

                    <img
                      src={blog.featuredImage.url}
                      alt={
                        blog.featuredImage.alt ||
                        blog.title
                      }
                      className="h-full w-full object-cover"
                    />

                  ) : (

                    <div className="flex h-full items-center justify-center text-slate-300">
                      <FileText size={18} />
                    </div>

                  )}

                </div>


                <div className="min-w-0 max-w-md">

                  <div className="flex items-center gap-2">

                    <p className="truncate text-sm font-bold text-[#062B63]">
                      {blog.title}
                    </p>

                    {blog.featured && (
                      <Star
                        size={13}
                        className="shrink-0 fill-amber-400 text-amber-400"
                      />
                    )}

                  </div>

                  <p className="mt-1 truncate text-xs text-slate-400">
                    /blog/{blog.slug}
                  </p>

                </div>

              </div>

            </td>


            {/* CATEGORY */}

            <td className="px-5 py-4">

              {blog.category ? (

                <span className="inline-flex max-w-[180px] truncate rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {blog.category}
                </span>

              ) : (

                <span className="text-xs text-slate-300">
                  —
                </span>

              )}

            </td>


            {/* AUTHOR */}

            <td className="px-5 py-4">

              <span className="text-sm font-medium text-slate-600">
                {blog.author}
              </span>

            </td>


            {/* STATUS */}

            <td className="px-5 py-4">

              {blog.published ? (

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">

                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                  Published

                </span>

              ) : (

                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-600">

                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />

                  Draft

                </span>

              )}

            </td>


            {/* DATE */}

            <td className="px-5 py-4">

              {blog.publishedAt ? (

                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">

                  <CalendarDays size={14} />

                  {formatDate(blog.publishedAt)}

                </div>

              ) : (

                <span className="text-xs text-slate-300">
                  Not published
                </span>

              )}

            </td>


            {/* ACTIONS */}

            <td className="px-5 py-4 text-right">

              <BlogActions
                blogId={blog.id}
                slug={blog.slug}
                published={blog.published}
                featured={blog.featured}
              />

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</section>
        )}
      </div>
    </main>
  );
}