"use client";

import {
  AlertTriangle,
  Loader2,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { deleteService } from "@/features/services/actions/delete-service";
interface DeleteServiceButtonProps {
  serviceId: string;
  serviceTitle: string;
}

export default function DeleteServiceButton({
  serviceId,
  serviceTitle,
}: DeleteServiceButtonProps) {
  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleDelete() {
    if (deleting) return;

    setDeleting(true);
    setError("");

    try {
      const result =
        await deleteService(
          serviceId,
        );

      if (!result.success) {
        setError(
          result.message ||
            "Unable to delete service.",
        );

        return;
      }

      setOpen(false);

      router.replace(
        "/admin/services",
      );

      router.refresh();
    } catch (error) {
      console.error(
        "DELETE_SERVICE_UI_ERROR",
        error,
      );

      setError(
        "Something went wrong. Please try again.",
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      {/* =========================
          DELETE BUTTON
      ========================== */}

      <button
        type="button"
        onClick={() => {
          setError("");
          setOpen(true);
        }}
        className="
          inline-flex
          h-10
          items-center
          gap-2
          rounded-xl
          border
          border-red-100
          bg-white
          px-4
          text-[10px]
          font-extrabold
          text-red-500
          transition-all
          hover:border-red-200
          hover:bg-red-50
          hover:text-red-600
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-red-400
          focus-visible:ring-offset-2
        "
      >
        <Trash2 size={13} />

        Delete
      </button>

      {/* =========================
          CONFIRMATION MODAL
      ========================== */}

      {open && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-[#041B3D]/45
            px-4
            py-6
            backdrop-blur-sm
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-service-title"
        >
          <div
            className="
              relative
              w-full
              max-w-md
              overflow-hidden
              rounded-[28px]
              border
              border-slate-100
              bg-white
              shadow-[0_30px_80px_rgba(2,24,58,0.22)]
            "
          >
            {/* Close */}

            <button
              type="button"
              onClick={() => {
                if (!deleting) {
                  setOpen(false);
                  setError("");
                }
              }}
              disabled={deleting}
              aria-label="Close delete dialog"
              className="
                absolute
                right-4
                top-4
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-slate-50
                text-slate-400
                transition-colors
                hover:bg-slate-100
                hover:text-slate-600
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <X size={16} />
            </button>

            <div className="p-6 sm:p-7">
              {/* Icon */}

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-red-50
                  text-red-500
                "
              >
                <AlertTriangle
                  size={22}
                />
              </div>

              {/* Content */}

              <h2
                id="delete-service-title"
                className="
                  mt-5
                  text-lg
                  font-extrabold
                  tracking-[-0.025em]
                  text-[#062B63]
                "
              >
                Delete this service?
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                You are about to permanently
                delete{" "}
                <strong className="font-extrabold text-[#062B63]">
                  {serviceTitle}
                </strong>
                .
              </p>

              <div
                className="
                  mt-4
                  rounded-2xl
                  border
                  border-red-100
                  bg-red-50
                  px-4
                  py-3
                "
              >
                <p
                  className="
                    text-[11px]
                    font-semibold
                    leading-5
                    text-red-600
                  "
                >
                  This action cannot be
                  undone. The service will
                  also disappear from the
                  public services listing.
                </p>
              </div>

              {/* Error */}

              {error && (
                <div
                  className="
                    mt-4
                    rounded-xl
                    border
                    border-red-100
                    bg-red-50
                    px-4
                    py-3
                    text-xs
                    font-semibold
                    leading-5
                    text-red-600
                  "
                  role="alert"
                >
                  {error}
                </div>
              )}

              {/* Actions */}

              <div
                className="
                  mt-6
                  grid
                  grid-cols-2
                  gap-3
                "
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setError("");
                  }}
                  disabled={deleting}
                  className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    text-xs
                    font-extrabold
                    text-[#062B63]
                    transition-colors
                    hover:bg-slate-50
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-red-500
                    text-xs
                    font-extrabold
                    text-white
                    transition-all
                    hover:bg-red-600
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {deleting ? (
                    <>
                      <Loader2
                        size={14}
                        className="animate-spin"
                      />

                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={14} />

                      Delete Service
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}