"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  ShieldCheck,
} from "lucide-react";

interface ServiceImage {
  url: string;
  publicId: string;
  alt: string;
}

interface ServiceCardProps {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  heroImage?: ServiceImage;
  icon?: string;
  pestTypes?: string[];
  benefits?: string[];
  featured?: boolean;
}

function formatCategory(category: string) {
  return category
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    );
}

export default function ServiceCard({
  title,
  slug,
  category,
  shortDescription,
  heroImage,
  pestTypes = [],
  benefits = [],
  featured = false,
}: ServiceCardProps) {
  const visiblePests = pestTypes.slice(0, 3);

  const visibleBenefits = benefits.slice(0, 2);

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[26px]
        border
        border-slate-200
        bg-white
        shadow-[0_10px_35px_rgba(15,23,42,0.045)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-100
        hover:shadow-[0_22px_55px_rgba(15,23,42,0.09)]
      "
    >
      {/* =========================
          IMAGE
      ========================== */}

      <div className="relative p-2 pb-0">
        <div
          className="
            relative
            aspect-[16/9]
            overflow-hidden
            rounded-[21px]
            bg-[#EEF6FF]
          "
        >
          {heroImage?.url ? (
            <img
              src={heroImage.url}
              alt={heroImage.alt || title}
              loading="lazy"
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-500
                ease-out
                group-hover:scale-[1.035]
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                bg-[linear-gradient(135deg,#EEF6FF,#F8FAFC)]
              "
            >
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white
                  text-[#0878E8]
                  shadow-sm
                "
              >
                <ShieldCheck
                  size={30}
                  strokeWidth={1.7}
                />
              </div>
            </div>
          )}

          {/* Image overlay */}
          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-24
              bg-gradient-to-t
              from-black/20
              to-transparent
            "
          />

          {/* Category */}
          <div
            className="
              absolute
              left-4
              top-4
              rounded-full
              border
              border-white/70
              bg-white/95
              px-3
              py-1.5
              shadow-sm
              backdrop-blur-sm
            "
          >
            <span
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.12em]
                text-[#0878E8]
              "
            >
              {formatCategory(category)}
            </span>
          </div>

          {/* Featured */}
          {featured && (
            <div
              className="
                absolute
                right-4
                top-4
                inline-flex
                items-center
                gap-1.5
                rounded-full
                bg-[#062B63]
                px-3
                py-1.5
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.1em]
                text-white
                shadow-lg
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              Featured
            </div>
          )}
        </div>
      </div>

      {/* =========================
          CONTENT
      ========================== */}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex-1">
          <h3
            className="
              text-xl
              font-extrabold
              tracking-[-0.025em]
              text-[#062B63]
              transition-colors
              group-hover:text-[#0878E8]
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-2.5
              line-clamp-3
              text-sm
              leading-6
              text-slate-500
            "
          >
            {shortDescription}
          </p>

          {/* Pest types */}
          {visiblePests.length > 0 && (
            <div className="mt-5">
              <p
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.13em]
                  text-slate-400
                "
              >
                Helps with
              </p>

              <div className="mt-2.5 flex flex-wrap gap-2">
                {visiblePests.map((pest) => (
                  <span
                    key={pest}
                    className="
                      rounded-full
                      bg-slate-50
                      px-2.5
                      py-1.5
                      text-[11px]
                      font-semibold
                      text-slate-600
                    "
                  >
                    {pest}
                  </span>
                ))}

                {pestTypes.length > 3 && (
                  <span
                    className="
                      rounded-full
                      bg-blue-50
                      px-2.5
                      py-1.5
                      text-[11px]
                      font-bold
                      text-[#0878E8]
                    "
                  >
                    +{pestTypes.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Benefits */}
          {visibleBenefits.length > 0 && (
            <div className="mt-5 space-y-2">
              {visibleBenefits.map(
                (benefit) => (
                  <div
                    key={benefit}
                    className="
                      flex
                      items-start
                      gap-2
                      text-xs
                      font-medium
                      leading-5
                      text-slate-600
                    "
                  >
                    <span
                      className="
                        mt-0.5
                        flex
                        h-4
                        w-4
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-emerald-50
                        text-emerald-600
                      "
                    >
                      <Check size={10} strokeWidth={3} />
                    </span>

                    <span className="line-clamp-1">
                      {benefit}
                    </span>
                  </div>
                ),
              )}
            </div>
          )}
        </div>

        {/* =========================
            ACTIONS
        ========================== */}

        <div
          className="
            mt-6
            border-t
            border-slate-100
            pt-5
          "
        >
          <div className="flex items-center gap-2">
            <Link
              href={`/services/${slug}`}
              className="
                group/view
                inline-flex
                min-h-11
                flex-1
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-slate-200
                px-4
                text-xs
                font-extrabold
                text-[#062B63]
                transition-all
                duration-200
                hover:border-blue-100
                hover:bg-blue-50
                hover:text-[#0878E8]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#0878E8]
                focus-visible:ring-offset-2
              "
            >
              View service

              <ArrowRight
                size={14}
                className="
                  transition-transform
                  duration-200
                  group-hover/view:translate-x-0.5
                "
              />
            </Link>

            <Link
              href="/quote"
              className="
                inline-flex
                min-h-11
                flex-1
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[#0878E8]
                px-4
                text-xs
                font-extrabold
                text-white
                shadow-[0_8px_20px_rgba(8,120,232,0.14)]
                transition-all
                duration-200
                hover:bg-[#066BCF]
                hover:shadow-[0_10px_25px_rgba(8,120,232,0.20)]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#0878E8]
                focus-visible:ring-offset-2
              "
            >
              Get a quote
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}