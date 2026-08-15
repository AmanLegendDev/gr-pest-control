import ServiceAreaCard from "./ServiceAreaCard";

interface ServiceArea {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  image?: {
    url: string;
    publicId: string;
    alt: string;
  };
  highlights: string[];
  nearbyAreas: string[];
  featured: boolean;
  sortOrder: number;
}

interface ServiceAreasGridProps {
  areas: ServiceArea[];
}

export default function ServiceAreasGrid({
  areas,
}: ServiceAreasGridProps) {
  if (areas.length === 0) {
    return (
      <section
        id="service-areas"
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
        <div className="mx-auto max-w-3xl">
          <div
            className="
              rounded-[28px]
              border
              border-dashed
              border-slate-200
              bg-white
              px-6
              py-12
              text-center
              shadow-sm
              sm:px-10
            "
          >
            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-blue-50
                text-[#0878E8]
              "
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M20 10.5C20 16 12 21 12 21S4 16 4 10.5a8 8 0 1 1 16 0Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <circle
                  cx="12"
                  cy="10.5"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
              </svg>
            </div>

            <h2
              className="
                mt-5
                text-xl
                font-extrabold
                tracking-tight
                text-[#062B63]
              "
            >
              Service areas are being updated
            </h2>

            <p
              className="
                mx-auto
                mt-2
                max-w-md
                text-sm
                leading-6
                text-slate-500
              "
            >
              We are currently updating our local
              coverage information. If you need
              help, you can still send us a quote
              request.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="service-areas"
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
            HEADER
        ========================== */}

        <div
          className="
            flex
            flex-col
            gap-3
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
              Our coverage
            </p>

            <h2
              className="
                mt-2
                text-2xl
                font-extrabold
                tracking-[-0.04em]
                text-[#062B63]
                sm:text-3xl
              "
            >
              Areas we currently serve
            </h2>

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-6
                text-slate-500
                sm:text-base
                sm:leading-7
              "
            >
              Browse our active service areas and
              explore the pest control support
              available near you.
            </p>
          </div>

          <div
            className="
              inline-flex
              w-fit
              items-center
              rounded-full
              border
              border-slate-200
              bg-white
              px-3.5
              py-2
              text-xs
              font-bold
              text-slate-500
              shadow-sm
            "
          >
            {areas.length}{" "}
            {areas.length === 1
              ? "area"
              : "areas"}{" "}
            available
          </div>
        </div>

        {/* =========================
            GRID
        ========================== */}

        <div
          className="
            mt-9
            grid
            auto-rows-fr
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {areas.map((area) => (
            <ServiceAreaCard
              key={area.id}
              id={area.id}
              name={area.name}
              slug={area.slug}
              shortDescription={
                area.shortDescription
              }
              image={area.image}
              highlights={
                area.highlights
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}