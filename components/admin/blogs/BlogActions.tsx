"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Eye,
  MoreHorizontal,
  Pencil,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

import {
  toggleBlogPublished,
} from "@/features/blogs/actions/toggle-blog-published";

import {
  toggleBlogFeatured,
} from "@/features/blogs/actions/toggle-blog-featured";

import {
  deleteBlog,
} from "@/features/blogs/actions/delete-blog";

interface BlogActionsProps {
  blogId: string;
  slug: string;
  published: boolean;
  featured: boolean;
}

export default function BlogActions({
  blogId,
  slug,
  published,
  featured,
}: BlogActionsProps) {
  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function handleTogglePublished() {
    setLoading(true);
    setError(null);

    try {
      const result =
        await toggleBlogPublished(
          blogId,
        );

      if (!result.success) {
        setError(result.message);
        return;
      }

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(
        "BLOG_PUBLISH_TOGGLE_ERROR",
        error,
      );

      setError(
        "Unable to update publishing status.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleFeatured() {
    setLoading(true);
    setError(null);

    try {
      const result =
        await toggleBlogFeatured(
          blogId,
        );

      if (!result.success) {
        setError(result.message);
        return;
      }

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(
        "BLOG_FEATURED_TOGGLE_ERROR",
        error,
      );

      setError(
        "Unable to update featured status.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    setLoading(true);
    setError(null);

    try {
      const result =
        await deleteBlog(blogId);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setDeleteOpen(false);
      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error(
        "DELETE_BLOG_ERROR",
        error,
      );

      setError(
        "Unable to delete the blog.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* =========================
          ACTION MENU
      ========================== */}

      <div className="relative inline-block text-left">

        <button
          type="button"
          onClick={() => {
            setError(null);
            setOpen((value) => !value);
          }}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-[#062B63]"
          aria-label="Open blog actions"
          aria-expanded={open}
        >
          <MoreHorizontal size={18} />
        </button>

        {open && (
          <>
            {/* Outside click */}

            <div
              className="fixed inset-0 z-30"
              onClick={() => setOpen(false)}
            />

            <div className="absolute right-0 top-11 z-40 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">

              {/* VIEW */}

              {published ? (
              <Link
  href={`/admin/blogs/${blogId}`}
  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
>
  <Eye size={15} />
  View Details
</Link>
              ) : (
                <div
                  title="Publish the blog before viewing it publicly."
                  className="flex cursor-not-allowed items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300"
                >
                  <Eye size={15} />
                  View Blog
                </div>
              )}

              {/* EDIT */}

              <Link
                href={`/admin/blogs/${blogId}/edit`}
                onClick={() =>
                  setOpen(false)
                }
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                <Pencil size={15} />
                Edit
              </Link>

              {/* PUBLISH */}

              <button
                type="button"
                disabled={loading}
                onClick={
                  handleTogglePublished
                }
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {published ? (
                  <X size={15} />
                ) : (
                  <Check size={15} />
                )}

                {published
                  ? "Unpublish"
                  : "Publish"}
              </button>

              {/* FEATURED */}

              <button
                type="button"
                disabled={loading}
                onClick={
                  handleToggleFeatured
                }
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Star
                  size={15}
                  className={
                    featured
                      ? "fill-amber-400 text-amber-400"
                      : ""
                  }
                />

                {featured
                  ? "Remove Featured"
                  : "Mark Featured"}
              </button>

              <div className="my-1 border-t border-slate-100" />

              {/* DELETE */}

              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setOpen(false);
                  setDeleteOpen(true);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={15} />
                Delete
              </button>

            </div>
          </>
        )}
      </div>

      {/* =========================
          ERROR TOAST
      ========================== */}

      {error && (
        <div className="fixed bottom-5 right-5 z-[110] max-w-sm rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700 shadow-xl">
          {error}
        </div>
      )}

      {/* =========================
          DELETE CONFIRMATION
      ========================== */}

      {deleteOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Trash2 size={20} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-[#062B63]">
              Delete this blog?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This blog post will be permanently
              removed from the database. This action
              cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  setDeleteOpen(false)
                }
                className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={handleDelete}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={15} />
                    Delete
                  </>
                )}
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}