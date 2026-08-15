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

interface FeaturedService {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  heroImage?: ServiceImage;
  pestTypes?: string[];
  benefits?: string[];
  featured: boolean;
}

interface FeaturedServicesProps {
  services: FeaturedService[];
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

export default function FeaturedServices({
  services,
}: FeaturedServicesProps) {
  const featuredServices = services
    .filter((service) => service.featured)
    .slice(0, 3);

  if (featuredServices.length === 0) {
    return null;
  }

  return (
    <section
      className="
        bg-[#F8FAFC]
        px-4
        py-16
        sm:px-6
        sm:py-20
        lg:px-8
        lg:py-24
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* =========================
            SECTION HEADER
        ========================== */}

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
          <div className="max-w-2xl">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-100
                bg-white
                px-3
                py-1.5
              "
            >
              <ShieldCheck
                size={13}
                className="text-[#0878E8]"
              />

              <span
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.15em]
                  text-[#0878E8]
                "
              >
                Popular solutions
              </span>
            </div>

            <h2
              className="
                mt-4
                text-2xl
                font-extrabold
                tracking-[-0.035em]
                text-[#062B63]
                sm:text-3xl
                lg:text-4xl
              "
            >
              Our most requested
              pest control services.
            </h2>

            <p
              className="
                mt-3
                max-w-xl
                text-sm
                leading-7
                text-slate-500
                sm:text-base
              "
            >
              Start with one of our commonly
              requested services, or explore the
              full range of solutions below.
            </p>
          </div>

          <Link
            href="#services"
            className="
              inline-flex
              shrink-0
              items-center
              gap-2
              text-sm
              font-extrabold
              text-[#0878E8]
              transition-colors
              hover:text-[#066BCF]
            "
          >
            View all services

            <ArrowRight
              size={16}
              className="transition-transform hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* =========================
            FEATURED SERVICES
        ========================== */}

        <div
          className="
            mt-9
            grid
            gap-5
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {featuredServices.map((service) => {
            const visiblePests =
              (service.pestTypes ?? []).slice(
                0,
                3,
              );

            const visibleBenefits =
              (service.benefits ?? []).slice(
                0,
                2,
              );

            return (
              <article
                key={service.id}
                className="
                  group
                  relative
                  flex
                  h-full
                  flex-col
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-slate-200
                  bg-white
                  shadow-[0_12px_40px_rgba(15,23,42,0.055)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-100
                  hover:shadow-[0_25px_65px_rgba(15,23,42,0.10)]
                "
              >
                {/* Image */}
                <div className="relative p-2 pb-0">
                  <div
                    className="
                      relative
                      aspect-[16/10]
                      overflow-hidden
                      rounded-[22px]
                      bg-[#EEF6FF]
                    "
                  >
                    {service.heroImage?.url ? (
                      <img
                        src={
                          service.heroImage.url
                        }
                        alt={
                          service.heroImage.alt ||
                          service.title
                        }
                        loading="lazy"
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-500
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
                        {formatCategory(
                          service.category,
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className="
                    flex
                    flex-1
                    flex-col
                    p-5
                    sm:p-6
                  "
                >
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
                      {service.title}
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
                      {service.shortDescription}
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
                          Commonly treated
                        </p>

                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {visiblePests.map(
                            (pest) => (
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
                            ),
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
                                <Check
                                  size={10}
                                  strokeWidth={3}
                                />
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

                  {/* Actions */}
                  <div
                    className="
                      mt-6
                      flex
                      items-center
                      gap-3
                      border-t
                      border-slate-100
                      pt-5
                    "
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      className="
                        group/link
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
                        hover:border-blue-100
                        hover:bg-blue-50
                        hover:text-[#0878E8]
                      "
                    >
                      Explore

                      <ArrowRight
                        size={14}
                        className="
                          transition-transform
                          group-hover/link:translate-x-0.5
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
                        rounded-full
                        bg-[#0878E8]
                        px-4
                        text-xs
                        font-extrabold
                        text-white
                        shadow-[0_8px_20px_rgba(8,120,232,0.14)]
                        transition-all
                        hover:bg-[#066BCF]
                        hover:shadow-[0_10px_25px_rgba(8,120,232,0.20)]
                      "
                    >
                      Get a quote
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}