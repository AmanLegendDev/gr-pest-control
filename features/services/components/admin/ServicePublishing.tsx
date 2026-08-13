"use client";

import { Globe2, Search, Star } from "lucide-react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import type { CreateServiceInput } from "../../schemas/service-schema";

type ServicePublishingProps = {
  register: UseFormRegister<CreateServiceInput>;
  watch: UseFormWatch<CreateServiceInput>;
  errors: FieldErrors<CreateServiceInput>;
};

export default function ServicePublishing({
  register,
  watch,
  errors,
}: ServicePublishingProps) {
  const featured = watch("featured");
  const active = watch("active");

  const seoTitle = watch("seoTitle") ?? "";
  const seoDescription = watch("seoDescription") ?? "";

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* HEADER */}
      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0878E8]">
            <Globe2 size={19} />
          </div>

          <div>
            <h2 className="font-semibold text-[#0F172A]">
              SEO & Publishing
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Control how this service appears on the website and in search
              results.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-5 sm:p-6">
        {/* VISIBILITY */}
        <div>
          <h3 className="text-sm font-semibold text-[#0F172A]">
            Publishing
          </h3>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {/* ACTIVE */}
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-[#0878E8]">
              <input
                type="checkbox"
                {...register("active")}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0878E8] accent-[#0878E8] focus:ring-[#0878E8]"
              />

              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#0F172A]">
                  Active Service
                </p>

                <p className="mt-1 text-xs leading-5 text-[#64748B]">
                  {active
                    ? "This service can appear on the public website."
                    : "This service is hidden from the public website."}
                </p>
              </div>
            </label>

            {/* FEATURED */}
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-[#39A935]">
              <input
                type="checkbox"
                {...register("featured")}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#39A935] accent-[#39A935] focus:ring-[#39A935]"
              />

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Star
                    size={15}
                    className={
                      featured
                        ? "fill-[#39A935] text-[#39A935]"
                        : "text-[#64748B]"
                    }
                  />

                  <p className="text-sm font-semibold text-[#0F172A]">
                    Featured Service
                  </p>
                </div>

                <p className="mt-1 text-xs leading-5 text-[#64748B]">
                  Featured services can be highlighted in selected website
                  sections.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* SORT ORDER */}
        <div>
          <label
            htmlFor="service-sort-order"
            className="mb-2 block text-sm font-semibold text-[#0F172A]"
          >
            Sort Order
          </label>

          <input
            id="service-sort-order"
            type="number"
            min={0}
            {...register("sortOrder", {
              valueAsNumber: true,
            })}
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#0F172A] outline-none transition focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100 sm:max-w-[220px]"
          />

          <p className="mt-1.5 text-xs text-[#64748B]">
            Lower numbers appear earlier when services are manually ordered.
          </p>

          {errors.sortOrder?.message && (
            <p className="mt-1.5 text-sm text-red-600">
              {String(errors.sortOrder.message)}
            </p>
          )}
        </div>

        {/* SEO */}
        <div className="border-t border-slate-200 pt-6">
          <div className="flex items-center gap-2">
            <Search size={18} className="text-[#0878E8]" />

            <h3 className="text-sm font-semibold text-[#0F172A]">
              Search Engine Optimisation
            </h3>
          </div>

          <p className="mt-1 text-xs leading-5 text-[#64748B]">
            Optional SEO fields. If left empty, the public page can fall back
            to the service content.
          </p>

          <div className="mt-4 space-y-5">
            {/* SEO TITLE */}
            <div>
              <label
                htmlFor="service-seo-title"
                className="mb-2 block text-sm font-semibold text-[#0F172A]"
              >
                SEO Title
              </label>

              <input
                id="service-seo-title"
                type="text"
                maxLength={70}
                {...register("seoTitle")}
                placeholder="e.g. Professional Cockroach Control | GR Pest Control"
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
              />

              <div className="mt-1.5 flex items-center justify-between gap-3">
                <p className="text-xs text-[#64748B]">
                  Keep it concise and relevant to this service.
                </p>

                <span
                  className={`shrink-0 text-xs ${
                    seoTitle.length > 60
                      ? "text-amber-600"
                      : "text-slate-400"
                  }`}
                >
                  {seoTitle.length}/70
                </span>
              </div>

              {errors.seoTitle?.message && (
                <p className="mt-1.5 text-sm text-red-600">
                  {String(errors.seoTitle.message)}
                </p>
              )}
            </div>

            {/* SEO DESCRIPTION */}
            <div>
              <label
                htmlFor="service-seo-description"
                className="mb-2 block text-sm font-semibold text-[#0F172A]"
              >
                SEO Description
              </label>

              <textarea
                id="service-seo-description"
                rows={4}
                maxLength={160}
                {...register("seoDescription")}
                placeholder="Describe this pest-control service clearly for search users..."
                className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm leading-6 text-[#0F172A] outline-none transition placeholder:text-slate-400 focus:border-[#0878E8] focus:ring-2 focus:ring-blue-100"
              />

              <div className="mt-1.5 flex items-center justify-between gap-3">
                <p className="text-xs text-[#64748B]">
                  Avoid keyword stuffing or unsupported claims.
                </p>

                <span
                  className={`shrink-0 text-xs ${
                    seoDescription.length > 150
                      ? "text-amber-600"
                      : "text-slate-400"
                  }`}
                >
                  {seoDescription.length}/160
                </span>
              </div>

              {errors.seoDescription?.message && (
                <p className="mt-1.5 text-sm text-red-600">
                  {String(errors.seoDescription.message)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}