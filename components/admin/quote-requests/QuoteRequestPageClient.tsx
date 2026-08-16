"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { archiveQuoteRequest } from "@/features/quote-requests/actions/archiveQuoteRequest";
import { updateQuoteRequest } from "@/features/quote-requests/actions/updateQuoteRequest";
import {
  ArrowLeft,
  ClipboardList,
  RefreshCw,
  Search,
  Layers3,
  Clock3,
  LoaderCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import QuoteRequestCard from "./QuoteRequestCard";
import QuoteRequestModal from "./QuoteRequestModal";

import type {
  QuoteRequestStatus,
} from "@/models/QuoteRequest";

export interface AdminQuoteRequest {
  id: string;

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

  archived: boolean;

  createdAt: string;
  updatedAt: string;
}

type QuoteRequestsStatus =
  | QuoteRequestStatus
  | "all";

interface QuoteRequestsPageClientProps {
  requests: AdminQuoteRequest[];

  status: QuoteRequestsStatus;
}

/* =========================================================
   PAGE META
========================================================= */

function getPageTitle(
  status: QuoteRequestsStatus,
) {
  switch (status) {
    case "all":
      return "All Quote Requests";

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
  status: QuoteRequestsStatus,
) {
  switch (status) {
    case "all":
      return "View and manage every active quote request from one place.";

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

/* =========================================================
   FILTER CONFIG
========================================================= */

const FILTERS: {
  value: QuoteRequestsStatus;
  label: string;
  icon: typeof Layers3;
}[] = [

  {
    value: "pending",
    label: "Pending",
    icon: Clock3,
  },
  {
    value: "in-progress",
    label: "In Progress",
    icon: LoaderCircle,
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircle2,
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: XCircle,
  },
    {
    value: "all",
    label: "All",
    icon: Layers3,
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function QuoteRequestsPageClient({
  requests,
  status,
}: QuoteRequestsPageClientProps) {
  const router = useRouter();

  const [
    selectedRequest,
    setSelectedRequest,
  ] =
    useState<AdminQuoteRequest | null>(
      null,
    );


    const [
  editMode,
  setEditMode,
] = useState(false);
  const [
    updatingId,
    setUpdatingId,
  ] =
    useState<string | null>(null);

    const [
  archivingId,
  setArchivingId,
] = useState<string | null>(null);

  const [
    search,
    setSearch,
  ] = useState("");

  /* =====================================================
     SEARCH
  ===================================================== */

  const normalizedSearch =
    search.trim().toLowerCase();

  const filteredRequests =
    normalizedSearch
      ? requests.filter((request) => {
          const searchableText = [
            request.referenceNumber,
            request.requestNumber,
            request.customer.name,
            request.customer.phone,
            request.customer.email,
            request.service.title,
            request.location.suburb,
            request.location.address,
            request.pestProblem,
          ]
            .join(" ")
            .toLowerCase();

          return searchableText.includes(
            normalizedSearch,
          );
        })
      : requests;

  /* =====================================================
     PAGE META
  ===================================================== */

  const pageTitle =
    getPageTitle(status);

  const pageDescription =
    getPageDescription(status);

  const requestCount =
    filteredRequests.length;

  const countLabel =
    requestCount === 1
      ? "request"
      : "requests";

  /* =====================================================
     VIEW
  ===================================================== */

const handleView = useCallback(
  (request: AdminQuoteRequest) => {
    setEditMode(false);
    setSelectedRequest(request);
  },
  [],
);


 const handleEdit = useCallback(
  (request: AdminQuoteRequest) => {
    setEditMode(true);
    setSelectedRequest(request);
  },
  [],
);

  /* =====================================================
     CLOSE MODAL
  ===================================================== */

  const handleCloseModal =
    useCallback(() => {
      if (updatingId) {
        return;
      }

      setSelectedRequest(null);
    }, [updatingId]);

  /* =====================================================
     STATUS CHANGE
  ===================================================== */

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

          setSelectedRequest(
            null,
          );

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





    const handleArchive = useCallback(
  async (request: AdminQuoteRequest) => {
    if (archivingId) {
      return;
    }

    const confirmed = window.confirm(
      `Archive ${request.referenceNumber}?\n\nThis request will be removed from the active quote requests list.`,
    );

    if (!confirmed) {
      return;
    }

    setArchivingId(request.id);

    try {
      const result =
        await archiveQuoteRequest(
          request.id,
        );

      if (!result.success) {
        throw new Error(
          result.message,
        );
      }

      setSelectedRequest(null);

      router.refresh();
    } catch (error) {
      console.error(
        "QUOTE_REQUEST_ARCHIVE_ERROR",
        error,
      );

      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to archive the quote request.",
      );
    } finally {
      setArchivingId(null);
    }
  },
  [router, archivingId],
);

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <>
      <main className="min-h-screen bg-[#F8FAFC]">

        {/* =================================================
            HEADER
        ================================================= */}

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-9">

            {/* Dashboard */}
            <button
              type="button"
              onClick={() =>
                router.push("/admin")
              }
              className="mb-5 inline-flex items-center gap-2 rounded-lg text-xs font-bold text-slate-500 transition hover:text-[#0878E8] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
            >
              <ArrowLeft
                size={15}
              />

              Dashboard
            </button>

            {/* Title */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#0878E8]">
                  <ClipboardList
                    size={22}
                  />
                </div>

                <div>

                  <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0878E8]">
                    Quote Management
                  </p>

                  <h1 className="mt-1 text-2xl font-extrabold tracking-[-0.035em] text-[#062B63] sm:text-3xl">
                    {pageTitle}
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    {pageDescription}
                  </p>

                </div>
              </div>

              {/* Count */}
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">

                <span className="h-2 w-2 rounded-full bg-[#0878E8]" />

                <span className="text-xs font-bold text-[#062B63]">
                  {requestCount}{" "}
                  {countLabel}
                </span>

              </div>

            </div>
          </div>
        </section>

        {/* =================================================
            CONTENT
        ================================================= */}

        <section className="mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-9">

          {/* =================================================
              FILTERS
          ================================================= */}

          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

              {/* Status Filters */}

              <div className="flex flex-wrap gap-2">

                {FILTERS.map(
                  (filter) => {
                    const Icon =
                      filter.icon;

                    const active =
                      status ===
                      filter.value;

                    return (
                      <Link
                        key={
                          filter.value
                        }
                        href={
                          filter.value ===
                          "all"
                            ? "/admin/quote-requests?status=all"
                            : `/admin/quote-requests?status=${filter.value}`
                        }
                        className={`
                          inline-flex
                          min-h-10
                          items-center
                          gap-2
                          rounded-xl
                          px-3.5
                          text-xs
                          font-bold
                          transition
                          ${
                            active
                              ? "bg-[#0878E8] text-white shadow-sm"
                              : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                          }
                        `}
                      >
                        <Icon
                          size={14}
                        />

                        {
                          filter.label
                        }
                      </Link>
                    );
                  },
                )}

              </div>

              {/* Search */}

              <div className="relative w-full lg:max-w-sm">

                <Search
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value,
                    )
                  }
                  placeholder="Search requests..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0878E8] focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </div>
          </div>

          {/* =================================================
              RESULTS
          ================================================= */}

          {filteredRequests.length ===
          0 ? (

            <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6">

              <div className="max-w-md text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <ClipboardList
                    size={28}
                  />
                </div>

                <h2 className="mt-5 text-lg font-extrabold text-[#062B63]">
                  {search
                    ? "No matching requests"
                    : status === "all"
                      ? "No quote requests"
                      : `No ${status} requests`}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {search
                    ? "Try another reference number, customer name, phone number or service."
                    : "There are currently no quote requests in this section. New requests will appear here automatically."}
                </p>

                {search ? (
                  <button
                    type="button"
                    onClick={() =>
                      setSearch("")
                    }
                    className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    Clear Search
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      router.refresh()
                    }
                    className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0878E8] px-5 text-sm font-bold text-white transition hover:bg-[#066BCF]"
                  >
                    <RefreshCw
                      size={15}
                    />

                    Refresh
                  </button>
                )}

              </div>

            </div>

          ) : (

            <div className="space-y-4">

              {filteredRequests.map(
                (request) => (
<QuoteRequestCard
  key={request.id}
 request={request}
onView={handleView}
 onEdit={
  status === "all"
    ? handleEdit
    : undefined
}
  onArchive={
    status === "all"
      ? () => handleArchive(request)
      : undefined
  }
  onStatusChange={handleStatusChange}
  isAllView={status === "all"}
  updating={
    updatingId === request.id
  }
  archiving={
    archivingId === request.id
  }
/>
                ),
              )}

            </div>

          )}

        </section>
      </main>

      {/* =====================================================
          REQUEST MODAL
      ===================================================== */}

<QuoteRequestModal
  request={selectedRequest}
  onClose={() => {
    setEditMode(false);
    handleCloseModal();
  }}
  onStatusChange={handleStatusChange}
  initialEditMode={editMode}
  onUpdated={() => {
    setEditMode(false);
    router.refresh();
  }}
  updating={
    selectedRequest
      ? updatingId === selectedRequest.id
      : false
  }
/>
    </>
  );
}