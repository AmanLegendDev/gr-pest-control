"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { ServiceAreaPublicViewModel } from "@/features/service-areas/queries/getServiceAreas";

interface ServiceAreasPreviewProps {
  serviceAreas: ServiceAreaPublicViewModel[];
}

export default function ServiceAreasPreview({
  serviceAreas,
}: ServiceAreasPreviewProps) {
  const areas = serviceAreas.slice(0, 3);

  if (!areas.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-slate-50/60 py-20 sm:py-24 lg:py-28">
      {/* Background atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-52 top-10 h-[480px] w-[480px] rounded-full bg-blue-50/70 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-52 bottom-0 h-[420px] w-[420px] rounded-full bg-teal-50/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0878E8] sm:text-[11px]">
              <MapPin
                size={14}
                strokeWidth={2.3}
              />

              Sydney Wide Coverage
            </div>

            <h2 className="mt-5 text-4xl font-extrabold leading-[1.04] tracking-[-0.045em] text-[#062B63] sm:text-5xl lg:text-[58px]">
              Pest control
              <span className="text-[#0878E8]">
                {" "}
                across Sydney.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Professional pest management for homes
              and businesses across Sydney and the
              surrounding areas.
            </p>
          </div>

          {/* Desktop CTA */}

          <Link
            href="/service-areas"
            className="group hidden shrink-0 items-center gap-2 text-sm font-bold text-[#062B63] transition-colors hover:text-[#0878E8] sm:inline-flex"
          >
            View all service areas

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white transition-all duration-300 group-hover:border-blue-200 group-hover:bg-blue-50">
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </motion.div>

        {/* Cards */}

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, index) => {
            const imageUrl = area.image?.url;

            return (
              <motion.article
                key={area.id}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group"
              >
                <Link
                  href={`/service-areas/${area.slug}`}
                  className="block overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-100 hover:shadow-[0_20px_50px_rgba(6,43,99,0.11)]"
                >
                  {/* Image */}

                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={
                          area.image?.alt ||
                          `${area.name} pest control services`
                        }
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
                        <MapPin
                          size={38}
                          className="text-[#0878E8]"
                        />
                      </div>
                    )}

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#062B63]/65 via-transparent to-transparent"
                    />

                    {/* Area badge */}

                    <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#062B63] shadow-lg backdrop-blur-md">
                      <MapPin
                        size={12}
                        className="text-[#0878E8]"
                      />

                      Sydney
                    </div>

                    {/* Image title */}

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-white">
                        {area.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}

                  <div className="p-5 sm:p-6">
                    <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                      {area.shortDescription}
                    </p>

                    {/* Highlights */}

                    {area.highlights.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {area.highlights
                          .slice(0, 3)
                          .map((highlight) => (
                            <span
                              key={highlight}
                              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-600"
                            >
                              <ShieldCheck
                                size={11}
                                className="text-[#0FAF9F]"
                              />

                              {highlight}
                            </span>
                          ))}
                      </div>
                    )}

                    {/* Nearby areas */}

                    {area.nearbyAreas.length > 0 && (
                      <p className="mt-4 text-xs text-slate-400">
                        Also serving{" "}
                        <span className="font-semibold text-slate-500">
                          {area.nearbyAreas
                            .slice(0, 3)
                            .join(", ")}
                        </span>
                      </p>
                    )}

                    {/* Learn more */}

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-sm font-bold text-[#062B63]">
                        Explore area
                      </span>

                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-[#0878E8] transition-all duration-300 group-hover:bg-[#0878E8] group-hover:text-white">
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* Mobile CTA */}

        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/service-areas"
            className="group inline-flex min-h-[48px] items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-bold text-[#062B63] shadow-sm transition-all duration-300 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0878E8]"
          >
            View all service areas

            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}