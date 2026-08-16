"use client";

import { useState, useTransition } from "react";
import {
  MoreHorizontal,
  Star,
  Power,
  Trash2,
  Loader2,
} from "lucide-react";

import { toggleServiceAreaStatus } from "@/features/service-areas/actions/toggle-service-area-status";
import { toggleServiceAreaFeatured } from "@/features/service-areas/actions/toggle-service-area-featured";
import { deleteServiceArea } from "@/features/service-areas/actions/delete-service-area";

interface ServiceAreaActionsProps {
  serviceAreaId: string;
  active: boolean;
  featured: boolean;
}

export default function ServiceAreaActions({
  serviceAreaId,
  active,
  featured,
}: ServiceAreaActionsProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] =
    useTransition();

  const handleStatusToggle = () => {
    startTransition(async () => {
      const result =
        await toggleServiceAreaStatus(
          serviceAreaId,
        );

      if (!result.success) {
        window.alert(result.message);
        return;
      }

      setOpen(false);
    });
  };

  const handleFeaturedToggle = () => {
    startTransition(async () => {
      const result =
        await toggleServiceAreaFeatured(
          serviceAreaId,
        );

      if (!result.success) {
        window.alert(result.message);
        return;
      }

      setOpen(false);
    });
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service area? This action cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      const result =
        await deleteServiceArea(
          serviceAreaId,
        );

      if (!result.success) {
        window.alert(result.message);
        return;
      }

      setOpen(false);
    });
  };

  return (
    <div className="relative">
      {/* Trigger */}

      <button
        type="button"
        title="More actions"
        aria-label="More service area actions"
        aria-expanded={open}
        disabled={isPending}
        onClick={() =>
          setOpen((current) => !current)
        }
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

      {/* Dropdown */}

      {open && (
        <>
          {/* Click-away layer */}

          <button
            type="button"
            aria-label="Close actions"
            className="fixed inset-0 z-30 cursor-default"
            onClick={() =>
              setOpen(false)
            }
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
            {/* Status */}

            <button
              type="button"
              onClick={
                handleStatusToggle
              }
              disabled={isPending}
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
                hover:text-[#062B63]
                disabled:opacity-50
              "
            >
              <span
                className={`
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  ${
                    active
                      ? "bg-amber-50 text-amber-500"
                      : "bg-emerald-50 text-emerald-600"
                  }
                `}
              >
                <Power size={14} />
              </span>

              <span>
                {active
                  ? "Deactivate"
                  : "Activate"}
              </span>
            </button>

            {/* Featured */}

            <button
              type="button"
              onClick={
                handleFeaturedToggle
              }
              disabled={isPending}
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
                hover:text-[#062B63]
                disabled:opacity-50
              "
            >
              <span
                className={`
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  ${
                    featured
                      ? "bg-slate-50 text-slate-400"
                      : "bg-amber-50 text-amber-500"
                  }
                `}
              >
                <Star
                  size={14}
                  className={
                    featured
                      ? ""
                      : "fill-current"
                  }
                />
              </span>

              <span>
                {featured
                  ? "Remove Featured"
                  : "Mark Featured"}
              </span>
            </button>

            <div className="my-1 border-t border-slate-100" />

            {/* Delete */}

            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
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
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-red-50
                  text-red-500
                "
              >
                <Trash2 size={14} />
              </span>

              <span>
                Delete Service Area
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}