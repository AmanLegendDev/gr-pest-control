import Link from "next/link";
import {
  MessageSquareQuote,
  Plus,
  Star,
} from "lucide-react";

import {
  getAdminTestimonials,
} from "@/features/testimonials/queries/getTestimonials";

import TestimonialActions from "@/components/admin/testimonials/TestimonialActions";

export const dynamic = "force-dynamic";

export default async function TestimonialsAdminPage() {
  const testimonials =
    await getAdminTestimonials(100);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#0878E8]">
              <MessageSquareQuote size={16} />
              Testimonials
            </div>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#062B63] sm:text-3xl">
              Customer Reviews
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage customer testimonials, ratings,
              featured reviews and publishing status.
            </p>
          </div>

          <Link
            href="/admin/testimonials/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0878E8] px-5 text-sm font-semibold text-white transition hover:bg-[#066BCF]"
          >
            <Plus size={17} />
            Add Testimonial
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Total Reviews"
            value={testimonials.length}
          />

          <StatCard
            label="Active"
            value={
              testimonials.filter(
                (item) => item.active,
              ).length
            }
          />

          <StatCard
            label="Featured"
            value={
              testimonials.filter(
                (item) => item.featured,
              ).length
            }
          />
        </div>

        {/* Empty */}
        {testimonials.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#0878E8]">
              <MessageSquareQuote size={25} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-[#062B63]">
              No testimonials yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Add your first customer review to
              start building social proof.
            </p>

            <Link
              href="/admin/testimonials/new"
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-[#0878E8] px-4 text-sm font-semibold text-white"
            >
              <Plus size={16} />
              Add Testimonial
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* Desktop header */}
            <div className="hidden grid-cols-[1.7fr_1fr_100px_120px_110px] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 lg:grid">
              <span>Customer</span>
              <span>Content</span>
              <span>Rating</span>
              <span>Status</span>
              <span className="text-right">Actions</span>
            </div>

            <div className="divide-y divide-slate-100">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="grid gap-4 px-5 py-5 lg:grid-cols-[1.7fr_1fr_100px_120px_110px] lg:items-center"
                >
                  {/* Customer */}
                  <div className="flex min-w-0 items-center gap-3">
                    {testimonial.image ? (
                      <img
                        src={testimonial.image.url}
                        alt={testimonial.image.alt}
                        className="h-11 w-11 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-[#0878E8]">
                        {testimonial.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#062B63]">
                        {testimonial.name}
                      </p>

                      {(testimonial.role ||
                        testimonial.company) && (
                        <p className="truncate text-xs text-slate-400">
                          {[
                            testimonial.role,
                            testimonial.company,
                          ]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>
                      )}

                      {testimonial.location && (
                        <p className="mt-0.5 truncate text-[11px] text-slate-300">
                          {testimonial.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <p className="line-clamp-2 text-sm leading-5 text-slate-500">
                    {testimonial.content}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <Star
                      size={14}
                      className="fill-amber-400 text-amber-400"
                    />

                    <span className="text-sm font-bold text-slate-700">
                      {testimonial.rating}/5
                    </span>
                  </div>

                  {/* Status */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        testimonial.active
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {testimonial.active
                        ? "ACTIVE"
                        : "INACTIVE"}
                    </span>

                    {testimonial.featured && (
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-600">
                        FEATURED
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-start lg:justify-end">
                    <TestimonialActions
                      testimonialId={
                        testimonial.id
                      }
                      active={
                        testimonial.active
                      }
                      featured={
                        testimonial.featured
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-[#062B63]">
        {value}
      </p>
    </div>
  );
}