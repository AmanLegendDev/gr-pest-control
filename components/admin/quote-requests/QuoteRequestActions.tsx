"use client";

import {
  Check,
  Eye,
  X,
} from "lucide-react";

import type { QuoteRequestStatus } from "@/models/QuoteRequest";

interface QuoteRequestActionsProps {
  status: QuoteRequestStatus;

  onView: () => void;

  onStatusChange: (
    status: QuoteRequestStatus,
  ) => void;

  updating?: boolean;
}

export default function QuoteRequestActions({
  status,
  onView,
  onStatusChange,
  updating = false,
}: QuoteRequestActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* View */}
      <button
        type="button"
        onClick={onView}
        disabled={updating}
        className="
          inline-flex
          min-h-10
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-slate-200
          bg-white
          px-3.5
          text-xs
          font-bold
          text-[#062B63]
          transition
          hover:border-blue-200
          hover:bg-blue-50
          hover:text-[#0878E8]
          disabled:cursor-not-allowed
          disabled:opacity-50
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-blue-200
        "
      >
        <Eye size={15} />
        View
      </button>

      {/* Pending actions */}
      {status === "pending" && (
        <>
          <button
            type="button"
            onClick={() =>
              onStatusChange("in-progress")
            }
            disabled={updating}
            className="
              inline-flex
              min-h-10
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#0878E8]
              px-4
              text-xs
              font-extrabold
              text-white
              shadow-sm
              transition
              hover:bg-[#066BCF]
              disabled:cursor-not-allowed
              disabled:opacity-50
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-200
              focus-visible:ring-offset-2
            "
          >
            {updating ? (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <Check size={15} />
            )}

            Accept
          </button>

          <button
            type="button"
            onClick={() =>
              onStatusChange("cancelled")
            }
            disabled={updating}
            className="
              inline-flex
              min-h-10
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-red-100
              bg-red-50
              px-4
              text-xs
              font-extrabold
              text-red-600
              transition
              hover:border-red-200
              hover:bg-red-100
              disabled:cursor-not-allowed
              disabled:opacity-50
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-red-200
            "
          >
            <X size={15} />
            Cancel
          </button>
        </>
      )}

      {/* In-progress actions */}
      {status === "in-progress" && (
        <>
          <button
            type="button"
            onClick={() =>
              onStatusChange("completed")
            }
            disabled={updating}
            className="
              inline-flex
              min-h-10
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-emerald-600
              px-4
              text-xs
              font-extrabold
              text-white
              shadow-sm
              transition
              hover:bg-emerald-700
              disabled:cursor-not-allowed
              disabled:opacity-50
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-200
              focus-visible:ring-offset-2
            "
          >
            {updating ? (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <Check size={15} />
            )}

            Complete
          </button>

          <button
            type="button"
            onClick={() =>
              onStatusChange("cancelled")
            }
            disabled={updating}
            className="
              inline-flex
              min-h-10
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-red-100
              bg-red-50
              px-4
              text-xs
              font-extrabold
              text-red-600
              transition
              hover:border-red-200
              hover:bg-red-100
              disabled:cursor-not-allowed
              disabled:opacity-50
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-red-200
            "
          >
            <X size={15} />
            Cancel
          </button>
        </>
      )}
    </div>
  );
}