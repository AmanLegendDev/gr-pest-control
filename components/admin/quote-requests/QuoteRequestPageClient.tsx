"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ClipboardList,
  RefreshCw,
} from "lucide-react";

import QuoteRequestCard from "./QuoteRequestCard";
import QuoteRequestModal from "./QuoteRequestModal";

import type {
  QuoteRequestStatus,
} from "@/models/QuoteRequest";

export interface AdminQuoteRequest {
  _id: string;

  requestNumber: number;

  referenceNumber: string;

  customer: {
    name: string;
    phone: string;
    email: string;
  };

  service: {
    id: string;
    title: string;
    slug: string;
  };

  propertyType:
    | "residential"
    | "commercial";

  location: {
    suburb: string;
    address: string;
  };

  pestProblem: string;

  preferredDate: string;
  preferredTime: string;

  status: QuoteRequestStatus;

  createdAt: string;
  updatedAt: string;
}

interface QuoteRequestsPageClientProps {
  requests: AdminQuoteRequest[];

  status: QuoteRequestStatus;
}

function getPageTitle(
  status: QuoteRequestStatus,
) {
  switch (status) {
    case "pending":
      return "Pending Requests";

    case "in-progress":
      return "In Progress";

    case "completed":
      return "Completed Requests";

    case "cancelled":
      return "Cancelled Requests";

    default:
      return "Quote Requests";
  }
}

function getPageDescription(
  status: QuoteRequestStatus,
) {
  switch (status) {
    case "pending":
      return "New quote requests waiting for your attention.";

    case "in-progress":
      return "Quote requests currently being handled.";

    case "completed":
      return "Quote requests that have been completed.";

    case "cancelled":
      return "Quote requests that have been cancelled.";

    default:
      return "Manage quote requests.";
  }
}

export default function QuoteRequestsPageClient({
  requests,
  status,
}: QuoteRequestsPageClientProps) {
  const router = useRouter();

  const [selectedRequest, setSelectedRequest] =
    useState<AdminQuoteRequest | null>(null);

  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

  const pageTitle =
    getPageTitle(status);

  const pageDescription =
    getPageDescription(status);

  const requestCount =
    requests.length;

  const countLabel =
    requestCount === 1
      ? "request"
      : "requests";

  const handleView = useCallback(
    (request: AdminQuoteRequest) => {
      setSelectedRequest(request);
    },
    [],
  );

  const handleCloseModal =
    useCallback(() => {
      if (updatingId) {
        return;
      }

      setSelectedRequest(null);
    }, [updatingId]);

  const handleStatusChange =
    useCallback(
      async (
        id: string,
        nextStatus: QuoteRequestStatus,
      ) => {
        if (updatingId) {
          return;
        }

        setUpdatingId(id);

        try {
          const response =
            await fetch(
              `/api/admin/quote-requests/${id}/status`,
              {
                method: "PATCH",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify({
                  status: nextStatus,
                }),
              },
            );

          const result =
            await response.json();

          if (!response.ok) {
            throw new Error(
              result.message ||
                "Unable to update request status.",
            );
          }

          /*
           * Close the modal after
           * successful update.
           */
          setSelectedRequest(null);

          /*
           * Re-fetch the server page.
           *
           * Example:
           *
           * pending → in-progress
           *
           * The request disappears
           * from the pending list.
           */
          router.refresh();
        } catch (error) {
          console.error(
            "QUOTE_REQUEST_STATUS_UPDATE_ERROR",
            error,
          );

          window.alert(
            error instanceof Error
              ? error.message
              : "Unable to update request status.",
          );
        } finally {
          setUpdatingId(null);
        }
      },
      [router, updatingId],
    );

  return (
    <>
      <main className="min-h-screen bg-[#F8FAFC]">
        {/* =========================
            HEADER
        ========================== */}

        <section className="border-b border-slate-200 bg-white">
          <div
            className="
              mx-auto
              max-w-7xl
              px-5
              py-7
              sm:px-8
              sm:py-9
            "
          >
            {/* Dashboard back button */}
            <button
              type="button"
              onClick={() =>
                router.push("/admin")
              }
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-lg
                text-xs
                font-bold
                text-slate-500
                transition
                hover:text-[#0878E8]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-blue-200
              "
            >
              <ArrowLeft size={15} />

              Dashboard
            </button>

            <div
              className="
                flex
                flex-col
                gap-5
                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >
              {/* Title */}
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-50
                    text-[#0878E8]
                  "
                >
                  <ClipboardList size={22} />
                </div>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.16em]
                      text-[#0878E8]
                    "
                  >
                    Quote Management
                  </p>

                  <h1
                    className="
                      mt-1
                      text-2xl
                      font-extrabold
                      tracking-[-0.035em]
                      text-[#062B63]
                      sm:text-3xl
                    "
                  >
                    {pageTitle}
                  </h1>

                  <p
                    className="
                      mt-2
                      max-w-2xl
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    {pageDescription}
                  </p>
                </div>
              </div>

              {/* Count */}
              <div
                className="
                  inline-flex
                  w-fit
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-2
                "
              >
                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-[#0878E8]
                  "
                />

                <span
                  className="
                    text-xs
                    font-bold
                    text-[#062B63]
                  "
                >
                  {requestCount}{" "}
                  {countLabel}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            REQUESTS
        ========================== */}

        <section
          className="
            mx-auto
            max-w-7xl
            px-5
            py-7
            sm:px-8
            sm:py-9
          "
        >
          {requests.length === 0 ? (
            /* =========================
               EMPTY STATE
            ========================== */

            <div
              className="
                flex
                min-h-[420px]
                items-center
                justify-center
                rounded-3xl
                border
                border-dashed
                border-slate-300
                bg-white
                px-6
              "
            >
              <div className="max-w-md text-center">
                <div
                  className="
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-slate-100
                    text-slate-400
                  "
                >
                  <ClipboardList size={28} />
                </div>

                <h2
                  className="
                    mt-5
                    text-lg
                    font-extrabold
                    text-[#062B63]
                  "
                >
                  No {status} requests
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-slate-500
                  "
                >
                  There are currently no quote
                  requests in this section. New
                  requests will appear here
                  automatically.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    router.refresh()
                  }
                  className="
                    mt-6
                    inline-flex
                    min-h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#0878E8]
                    px-5
                    text-sm
                    font-bold
                    text-white
                    transition
                    hover:bg-[#066BCF]
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-blue-200
                    focus-visible:ring-offset-2
                  "
                >
                  <RefreshCw size={15} />

                  Refresh
                </button>
              </div>
            </div>
          ) : (
            /* =========================
               REQUEST LIST
            ========================== */

            <div className="space-y-4">
              {requests.map(
                (request) => (
                  <QuoteRequestCard
                    key={request._id}
                    request={
                      request as any
                    }
                    onView={
                      handleView as any
                    }
                    onStatusChange={
                      handleStatusChange
                    }
                    updating={
                      updatingId ===
                      request._id
                    }
                  />
                ),
              )}
            </div>
          )}
        </section>
      </main>

      {/* =========================
          REQUEST MODAL
      ========================== */}

      <QuoteRequestModal
        request={
          selectedRequest as any
        }
        onClose={
          handleCloseModal
        }
        onStatusChange={
          handleStatusChange
        }
        updating={
          selectedRequest
            ? updatingId ===
              selectedRequest._id
            : false
        }
      />
    </>
  );
}