"use client";

import {
  Archive,
  Check,
  Edit3,
  Eye,
  X,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";

import type { QuoteRequestStatus } from "@/models/QuoteRequest";

interface QuoteRequestActionsProps {
  status: QuoteRequestStatus;

  isAllView?: boolean;

  onView: () => void;

  onEdit?: () => void;

  onArchive?: () => void;

  onStatusChange: (
    status: QuoteRequestStatus,
  ) => void;

  updating?: boolean;

  archiving?: boolean;
}

type PendingAction =
  | {
      type: "status";
      status: QuoteRequestStatus;
    }
  | {
      type: "archive";
    }
  | null;

export default function QuoteRequestActions({
  status,
  isAllView = false,
  onView,
  onEdit,
  onArchive,
  onStatusChange,
  updating = false,
  archiving = false,
}: QuoteRequestActionsProps) {
  const [pendingAction, setPendingAction] =
    useState<PendingAction>(null);

  const busy = updating || archiving;

  const openStatusConfirmation = (
    nextStatus: QuoteRequestStatus,
  ) => {
    if (busy) return;

    setPendingAction({
      type: "status",
      status: nextStatus,
    });
  };

  const openArchiveConfirmation = () => {
    if (busy) return;

    setPendingAction({
      type: "archive",
    });
  };

  const closeConfirmation = () => {
    if (busy) return;

    setPendingAction(null);
  };

  const handleConfirm = () => {
    if (!pendingAction || busy) {
      return;
    }

    if (pendingAction.type === "archive") {
      setPendingAction(null);
      onArchive?.();
      return;
    }

    const nextStatus =
      pendingAction.status;

    setPendingAction(null);
    onStatusChange(nextStatus);
  };

  const isConfirmationOpen =
    pendingAction !== null;

  const confirmationTitle =
    pendingAction?.type === "archive"
      ? "Archive this request?"
      : pendingAction?.status === "in-progress"
        ? "Accept this request?"
        : pendingAction?.status ===
            "completed"
          ? "Complete this request?"
          : pendingAction?.status ===
              "cancelled"
            ? "Cancel this request?"
            : "";

  const confirmationDescription =
    pendingAction?.type === "archive"
      ? "This request will be moved to the archived section. You can no longer manage it from the active request list."
      : pendingAction?.status ===
          "in-progress"
        ? "This will accept the quote request and move it to In Progress."
        : pendingAction?.status ===
            "completed"
          ? "This will mark the quote request as completed."
          : pendingAction?.status ===
              "cancelled"
            ? "This will cancel the quote request. Make sure you want to close this request before continuing."
            : "";

  const confirmationButtonLabel =
    pendingAction?.type === "archive"
      ? "Archive Request"
      : pendingAction?.status ===
          "in-progress"
        ? "Accept Request"
        : pendingAction?.status ===
            "completed"
          ? "Mark Completed"
          : pendingAction?.status ===
              "cancelled"
            ? "Cancel Request"
            : "Confirm";

  const confirmationIcon =
    pendingAction?.type === "archive"
      ? "archive"
      : pendingAction?.status ===
            "cancelled"
        ? "danger"
        : "confirm";

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {/* =====================================================
            VIEW
        ====================================================== */}

        <button
          type="button"
          onClick={onView}
          disabled={busy}
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

        {/* =====================================================
            EDIT + ARCHIVE
        ====================================================== */}

        {isAllView && (
          <>
            {onEdit && (
              <button
                type="button"
                onClick={onEdit}
                disabled={busy}
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
                <Edit3 size={15} />
                Edit
              </button>
            )}

            {onArchive && (
              <button
                type="button"
                onClick={
                  openArchiveConfirmation
                }
                disabled={busy}
                className="
                  inline-flex
                  min-h-10
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-3.5
                  text-xs
                  font-bold
                  text-slate-600
                  transition
                  hover:border-slate-300
                  hover:bg-slate-100
                  hover:text-[#062B63]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-slate-200
                "
              >
                {archiving ? (
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
                ) : (
                  <Archive size={15} />
                )}

                Archive
              </button>
            )}
          </>
        )}

        {/* =====================================================
            PENDING
            ACCEPT + CANCEL
        ====================================================== */}

        {!isAllView &&
          status === "pending" && (
            <>
              <button
                type="button"
                onClick={() =>
                  openStatusConfirmation(
                    "in-progress",
                  )
                }
                disabled={busy}
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
                  openStatusConfirmation(
                    "cancelled",
                  )
                }
                disabled={busy}
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

        {/* =====================================================
            IN PROGRESS
            COMPLETE + CANCEL
        ====================================================== */}

        {!isAllView &&
          status === "in-progress" && (
            <>
              <button
                type="button"
                onClick={() =>
                  openStatusConfirmation(
                    "completed",
                  )
                }
                disabled={busy}
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
                  openStatusConfirmation(
                    "cancelled",
                  )
                }
                disabled={busy}
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

      {/* =====================================================
          CONFIRMATION MODAL
      ====================================================== */}

      {isConfirmationOpen && (
        <div
          className="
            fixed
            inset-0
            z-[200]
            flex
            items-end
            justify-center
            bg-slate-950/45
            p-0
            backdrop-blur-[3px]
            sm:items-center
            sm:p-5
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-action-confirm-title"
        >
          <div
            className="
              w-full
              max-w-md
              overflow-hidden
              rounded-t-[28px]
              border
              border-slate-200
              bg-white
              shadow-[0_30px_100px_rgba(15,23,42,0.22)]
              sm:rounded-[28px]
            "
          >
            {/* Header */}
            <div className="px-6 pt-6 sm:px-7 sm:pt-7">
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    ${
                      confirmationIcon ===
                      "danger"
                        ? "bg-red-50 text-red-600"
                        : confirmationIcon ===
                            "archive"
                          ? "bg-slate-100 text-slate-600"
                          : "bg-blue-50 text-[#0878E8]"
                    }
                  `}
                >
                  {confirmationIcon ===
                  "archive" ? (
                    <Archive size={21} />
                  ) : confirmationIcon ===
                    "danger" ? (
                    <X size={21} />
                  ) : (
                    <Check size={21} />
                  )}
                </div>

                <button
                  type="button"
                  onClick={
                    closeConfirmation
                  }
                  disabled={busy}
                  aria-label="Close confirmation"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-slate-200
                    text-slate-400
                    transition
                    hover:bg-slate-50
                    hover:text-slate-600
                    disabled:opacity-50
                  "
                >
                  <X size={16} />
                </button>
              </div>

              <h2
                id="quote-action-confirm-title"
                className="
                cursor-pointer
                  mt-5
                  text-lg
                  font-extrabold
                  tracking-tight
                  text-[#062B63]
                  sm:text-xl
                "
              >
                {confirmationTitle}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {confirmationDescription}
              </p>
            </div>

            {/* Footer */}
            <div
              className="
                mt-6
                flex
                flex-col-reverse
                gap-3
                border-t
                border-slate-100
                bg-slate-50/60
                px-6
                py-5
                sm:flex-row
                sm:justify-end
                sm:px-7
              "
            >
              <button
                type="button"
                onClick={
                  closeConfirmation
                }
                disabled={busy}
                className="
                  min-h-11
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  text-sm
                  font-bold
                  text-[#062B63]
                  transition
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                No, Go Back
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={busy}
                className={`
                  inline-flex
                  cursor-pointer
                  min-h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-5
                  text-sm
                  font-extrabold
                  text-white
                  shadow-sm
                  transition
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  ${
                    pendingAction?.type ===
                      "status" &&
                    pendingAction.status ===
                      "cancelled"
                      ? "bg-red-600 hover:bg-red-700"
                      : pendingAction?.type ===
                          "archive"
                        ? "bg-slate-700 hover:bg-slate-800"
                        : "bg-[#0878E8] hover:bg-[#066BCF]"
                  }
                `}
              >
                {pendingAction?.type ===
                  "archive" ? (
                  <Archive size={15} />
                ) : pendingAction?.status ===
                  "cancelled" ? (
                  <X size={15} />
                ) : (
                  <Check size={15} />
                )}

                {confirmationButtonLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}