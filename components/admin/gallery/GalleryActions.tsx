"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import {
  Loader2,
  MoreHorizontal,
  Pencil,
  Power,
  Star,
  Trash2,
} from "lucide-react";

import { deleteGalleryItem } from "@/features/gallery/actions/delete-gallery-item";
import { toggleGalleryFeatured } from "@/features/gallery/actions/toggle-gallery-featured";
import { toggleGalleryStatus } from "@/features/gallery/actions/toggle-gallery-status";

interface GalleryActionsProps {
  galleryId: string;
  active: boolean;
  featured: boolean;
}

export default function GalleryActions({
  galleryId,
  active,
  featured,
}: GalleryActionsProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleToggleStatus = () => {
    startTransition(async () => {
      const result =
        await toggleGalleryStatus(galleryId);

      if (!result.success) {
        window.alert(result.message);
        return;
      }

      setOpen(false);
    });
  };

  const handleToggleFeatured = () => {
    startTransition(async () => {
      const result =
        await toggleGalleryFeatured(galleryId);

      if (!result.success) {
        window.alert(result.message);
        return;
      }

      setOpen(false);
    });
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gallery item? This action cannot be undone.",
    );

    if (!confirmed) return;

    startTransition(async () => {
      const result =
        await deleteGalleryItem(galleryId);

      if (!result.success) {
        window.alert(result.message);
        return;
      }

      setOpen(false);
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        disabled={isPending}
        onClick={() => setOpen((value) => !value)}
        aria-label="Gallery actions"
        aria-expanded={open}
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          border
          border-slate-200
          bg-white
          text-slate-500
          transition
          hover:border-blue-100
          hover:bg-blue-50
          hover:text-[#0878E8]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {isPending ? (
          <Loader2
            size={15}
            className="animate-spin"
          />
        ) : (
          <MoreHorizontal size={16} />
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close actions"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-30 cursor-default"
          />

          <div
            className="
              absolute
              right-0
              z-40
              mt-2
              w-52
              overflow-hidden
              rounded-xl
              border
              border-slate-200
              bg-white
              p-1.5
              shadow-[0_15px_45px_rgba(15,23,42,0.12)]
            "
          >
            {/* EDIT */}

            <Link
              href={`/admin/gallery/${galleryId}/edit`}
              onClick={() => setOpen(false)}
              className="
                flex
                items-center
                gap-3
                rounded-lg
                px-3
                py-2.5
                text-xs
                font-bold
                text-slate-600
                transition
                hover:bg-blue-50
                hover:text-[#0878E8]
              "
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
                <Pencil size={14} />
              </span>

              Edit Gallery Item
            </Link>

            {/* ACTIVE */}

            <button
              type="button"
              disabled={isPending}
              onClick={handleToggleStatus}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                px-3
                py-2.5
                text-left
                text-xs
                font-bold
                text-slate-600
                transition
                hover:bg-slate-50
                disabled:opacity-50
              "
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Power size={14} />
              </span>

              {active
                ? "Deactivate"
                : "Activate"}
            </button>

            {/* FEATURED */}

            <button
              type="button"
              disabled={isPending}
              onClick={handleToggleFeatured}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                px-3
                py-2.5
                text-left
                text-xs
                font-bold
                text-slate-600
                transition
                hover:bg-slate-50
                disabled:opacity-50
              "
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
                <Star
                  size={14}
                  className={
                    featured
                      ? "fill-current"
                      : ""
                  }
                />
              </span>

              {featured
                ? "Remove Featured"
                : "Mark Featured"}
            </button>

            <div className="my-1 border-t border-slate-100" />

            {/* DELETE */}

            <button
              type="button"
              disabled={isPending}
              onClick={handleDelete}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                px-3
                py-2.5
                text-left
                text-xs
                font-bold
                text-red-500
                transition
                hover:bg-red-50
                disabled:opacity-50
              "
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500">
                <Trash2 size={14} />
              </span>

              Delete Gallery Item
            </button>
          </div>
        </>
      )}
    </div>
  );
}