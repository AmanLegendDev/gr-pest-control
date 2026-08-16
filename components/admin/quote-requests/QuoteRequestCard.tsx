"use client";

import {
  CalendarDays,
  Clock3,
  MapPin,
  User,
} from "lucide-react";

import type {
  IQuoteRequest,
  QuoteRequestStatus,
} from "@/models/QuoteRequest";

import QuoteRequestActions from "./QuoteRequestActions";

interface QuoteRequestCardProps {
  request: IQuoteRequest;

  onView: (
    request: IQuoteRequest,
  ) => void;

  onEdit?: (
    request: IQuoteRequest,
  ) => void;

  onArchive?: (
    request: IQuoteRequest,
  ) => void;

  onStatusChange: (
    id: string,
    status: QuoteRequestStatus,
  ) => void;

  isAllView?: boolean;

  updating?: boolean;

  archiving?: boolean;
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatCreatedAt(value: Date | string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getStatusLabel(
  status: QuoteRequestStatus,
) {
  switch (status) {
    case "pending":
      return "Pending";

    case "in-progress":
      return "In Progress";

    case "completed":
      return "Completed";

    case "cancelled":
      return "Cancelled";

    default:
      return status;
  }
}

export default function QuoteRequestCard({
  request,
  onView,
  onEdit,
  onArchive,
  onStatusChange,
  isAllView = false,
  updating = false,
  archiving = false,
}: QuoteRequestCardProps) {
  const statusLabel =
    getStatusLabel(request.status);

  return (
    <article
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-[0_8px_30px_rgba(15,23,42,0.05)]
        transition
        hover:border-slate-300
        hover:shadow-[0_12px_35px_rgba(15,23,42,0.07)]
      "
    >
      {/* Top bar */}
      <div
        className="
          flex
          flex-col
          gap-3
          border-b
          border-slate-100
          px-5
          py-4
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-6
        "
      >
        <div className="flex items-center gap-3">
          <span
            className="
              inline-flex
              items-center
              rounded-full
              bg-blue-50
              px-3
              py-1.5
              text-[11px]
              font-extrabold
              tracking-[0.04em]
              text-[#0878E8]
            "
          >
            {request.referenceNumber}
          </span>

          <span
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-slate-200
              bg-slate-50
              px-2.5
              py-1
              text-[10px]
              font-bold
              text-slate-500
            "
          >
            {statusLabel}
          </span>
        </div>

        <p className="text-[11px] text-slate-400">
          Received{" "}
          {formatCreatedAt(request.createdAt)}
        </p>
      </div>

      {/* Main content */}
      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
          {/* Request information */}
          <div className="min-w-0">
            <div className="flex items-start gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-slate-100
                  text-[#062B63]
                "
              >
                <User size={19} />
              </div>

              <div className="min-w-0">
                <h2
                  className="
                    truncate
                    text-base
                    font-extrabold
                    text-[#062B63]
                    sm:text-lg
                  "
                >
                  {request.customer.name}
                </h2>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  {request.service.title}
                </p>
              </div>
            </div>

            {/* Details */}
            <div
              className="
                mt-6
                grid
                gap-4
                sm:grid-cols-2
              "
            >
              {/* Preferred date */}
              <div
                className="
                  rounded-xl
                  border
                  border-slate-100
                  bg-slate-50/70
                  p-4
                "
              >
                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={15}
                    className="text-[#0878E8]"
                  />

                  <p
                    className="
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.12em]
                      text-slate-400
                    "
                  >
                    Preferred date
                  </p>
                </div>

                <p className="mt-2 text-sm font-bold text-[#062B63]">
                  {formatDate(
                    request.preferredDate,
                  )}
                </p>
              </div>

              {/* Preferred time */}
              <div
                className="
                  rounded-xl
                  border
                  border-slate-100
                  bg-slate-50/70
                  p-4
                "
              >
                <div className="flex items-center gap-2">
                  <Clock3
                    size={15}
                    className="text-[#0878E8]"
                  />

                  <p
                    className="
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.12em]
                      text-slate-400
                    "
                  >
                    Preferred time
                  </p>
                </div>

                <p className="mt-2 text-sm font-bold text-[#062B63]">
                  {request.preferredTime}
                </p>
              </div>

              {/* Location */}
              <div
                className="
                  rounded-xl
                  border
                  border-slate-100
                  bg-slate-50/70
                  p-4
                  sm:col-span-2
                "
              >
                <div className="flex items-center gap-2">
                  <MapPin
                    size={15}
                    className="text-[#0878E8]"
                  />

                  <p
                    className="
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.12em]
                      text-slate-400
                    "
                  >
                    Location
                  </p>
                </div>

                <p className="mt-2 text-sm font-bold text-[#062B63]">
                  {request.location.suburb}
                </p>

                <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                  {request.location.address}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div
            className="
              flex
              items-end
              lg:min-w-[250px]
              lg:justify-end
            "
          >
            <QuoteRequestActions
              status={request.status}
              isAllView={isAllView}
              onView={() =>
                onView(request)
              }
              onEdit={
                onEdit
                  ? () => onEdit(request)
                  : undefined
              }
              onArchive={
                onArchive
                  ? () => onArchive(request)
                  : undefined
              }
             onStatusChange={(status) =>
  onStatusChange(
    String(request._id),
    status,
  )
}
              updating={updating}
              archiving={archiving}
            />
          </div>
        </div>
      </div>
    </article>
  );
}