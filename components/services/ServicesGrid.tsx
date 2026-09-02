"use client";

import { SearchX } from "lucide-react";

import ServiceCard from "./ServiceCard";

interface ServiceImage {
  url: string;
  publicId: string;
  alt: string;
}

interface Service {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  price: number;
  heroImage?: ServiceImage;
  icon?: string;
  pestTypes?: string[];
  benefits?: string[];
  process?: {
    title: string;
    description: string;
    sortOrder: number;
  }[];
  faqs?: {
    question: string;
    answer: string;
    sortOrder: number;
  }[];
  featured: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
}

interface ServicesGridProps {
  services: Service[];
  activeCategory: string;
}

function matchesCategory(
  service: Service,
  activeCategory: string,
) {
  if (
    activeCategory.toLowerCase() === "all"
  ) {
    return true;
  }

  return (
    service.category.toLowerCase().trim() ===
    activeCategory.toLowerCase().trim()
  );
}

export default function ServicesGrid({
  services,
  activeCategory,
}: ServicesGridProps) {
  const filteredServices = services.filter(
    (service) =>
      matchesCategory(
        service,
        activeCategory,
      ),
  );

  return (
    <section
      id="services"
      className="
        bg-white
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
            gap-4
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
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
              All solutions
            </p>

            <h2
              className="
                mt-2
                text-2xl
                font-extrabold
                tracking-[-0.035em]
                text-[#062B63]
                sm:text-3xl
              "
            >
              Find the right service
              for your property.
            </h2>

            <p
              className="
                mt-2.5
                max-w-2xl
                text-sm
                leading-6
                text-slate-500
                sm:text-base
                sm:leading-7
              "
            >
              Browse our pest control solutions
              and choose the service that best
              matches the problem you are dealing
              with.
            </p>
          </div>

          {/* Result count */}
          <div
            className="
              inline-flex
              w-fit
              items-center
              rounded-full
              border
              border-slate-200
              bg-[#F8FAFC]
              px-3.5
              py-2
            "
          >
            <span
              className="
                text-xs
                font-bold
                text-slate-500
              "
            >
              {filteredServices.length}{" "}
              {filteredServices.length === 1
                ? "service"
                : "services"}
            </span>
          </div>
        </div>

        {/* =========================
            EMPTY STATE
        ========================== */}

        {filteredServices.length === 0 ? (
          <div
            className="
              mt-10
              flex
              min-h-[280px]
              flex-col
              items-center
              justify-center
              rounded-[28px]
              border
              border-dashed
              border-slate-200
              bg-[#F8FAFC]
              px-6
              text-center
            "
          >
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-white
                text-slate-400
                shadow-sm
              "
            >
              <SearchX size={24} />
            </div>

            <h3
              className="
                mt-5
                text-base
                font-extrabold
                text-[#062B63]
              "
            >
              No services found
            </h3>

            <p
              className="
                mt-2
                max-w-sm
                text-sm
                leading-6
                text-slate-500
              "
            >
              We don't currently have a service
              listed under this category. Try
              another category or request a free
              quote and we'll help you find the
              right solution.
            </p>
          </div>
        ) : (
          /* =========================
             SERVICES
          ========================== */

          <div
            className="
              mt-9
              grid
              gap-5
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {filteredServices.map(
              (service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  title={service.title}
                  slug={service.slug}
                  category={service.category}
                  shortDescription={
                    service.shortDescription
                  }
                  price={service.price ?? 0}
                  heroImage={
                    service.heroImage
                  }
                  icon={service.icon}
                  pestTypes={
                    service.pestTypes
                  }
                  benefits={
                    service.benefits
                  }
                  featured={
                    service.featured
                  }
                />
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}