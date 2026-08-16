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

import { toggleFAQStatus } from "@/features/faq/actions/toggle-faq-status";
import { toggleFAQFeatured } from "@/features/faq/actions/toggle-faq-featured";
import { deleteFAQ } from "@/features/faq/actions/delete-faq";

interface FAQActionsProps {
  faqId: string;
  active: boolean;
  featured: boolean;
}

export default function FAQActions({
  faqId,
  active,
  featured,
}: FAQActionsProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function handleStatus() {
    setLoading(true);
    setError(null);

    try {
      const result =
        await toggleFAQStatus(faqId);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setOpen(false);
      router.refresh();
    } catch {
      setError(
        "Unable to update FAQ status.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleFeatured() {
    setLoading(true);
    setError(null);

    try {
      const result =
        await toggleFAQFeatured(faqId);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setOpen(false);
      router.refresh();
    } catch {
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
        await deleteFAQ(faqId);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setDeleteOpen(false);
      setOpen(false);

      router.refresh();
    } catch {
      setError(
        "Unable to delete the FAQ.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="relative inline-block">
        <button
          type="button"
          aria-label="Open FAQ actions"
          onClick={() =>
            setOpen((value) => !value)
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-[#062B63]"
        >
          <MoreHorizontal size={18} />
        </button>

        {open && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setOpen(false)}
            />

            <div className="absolute right-0 top-11 z-40 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-xl">

              <Link
                href="/faq"
                target="_blank"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                <Eye size={15} />
                View FAQs
              </Link>

              <Link
                href={`/admin/faqs/${faqId}/edit`}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                <Pencil size={15} />
                Edit
              </Link>

              <button
                type="button"
                disabled={loading}
                onClick={handleStatus}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                {active ? (
                  <X size={15} />
                ) : (
                  <Check size={15} />
                )}

                {active
                  ? "Deactivate"
                  : "Activate"}
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={handleFeatured}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
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

              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  setDeleteOpen(true)
                }
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      {error && (
        <p className="fixed bottom-5 right-5 z-50 max-w-sm rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600 shadow-lg">
          {error}
        </p>
      )}

      {/* DELETE CONFIRMATION */}

      {deleteOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Trash2 size={20} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-[#062B63]">
              Delete FAQ?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This FAQ will be permanently
              removed. This action cannot be
              undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  setDeleteOpen(false)
                }
                className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={handleDelete}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                <Trash2 size={15} />

                {loading
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}