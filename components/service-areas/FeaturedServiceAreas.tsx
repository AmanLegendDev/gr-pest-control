import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  ShieldCheck,
} from "lucide-react";

interface FeaturedArea {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  image?: {
    url: string;
    alt: string;
  };
  highlights: string[];
}

interface FeaturedServiceAreasProps {
  areas: FeaturedArea[];
}

export default function FeaturedServiceAreas({
  areas,
}: FeaturedServiceAreasProps) {
  if (areas.length === 0) {
    return null;
  }

  return (
    <section
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
          <div className="max-w-2xl">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-blue-100
                bg-blue-50/60
                px-3
                py-1.5
              "
            >
              <MapPin
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
                Featured Coverage
              </span>
            </div>

            <h2
              className="
                mt-4
                text-2xl
                font-extrabold
                tracking-[-0.04em]
                text-[#062B63]
                sm:text-3xl
              "
            >
              Popular service areas
            </h2>

            <p
              className="
                mt-3
                text-sm
                leading-6
                text-slate-500
                sm:text-base
                sm:leading-7
              "
            >
              Explore some of the locations where
              our pest control services are
              available.
            </p>
          </div>
        </div>

        {/* =========================
            FEATURED CARDS
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
          {areas.map((area) => {
            const highlights =
              area.highlights.slice(0, 2);

            return (
              <article
                key={area.id}
                className="
                  group
                  overflow-hidden
                  rounded-[26px]
                  border
                  border-slate-200
                  bg-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-100
                  hover:shadow-[0_20px_50px_rgba(15,23,42,0.09)]
                "
              >
                {/* Image */}
                <div
                  className="
                    relative
                    aspect-[16/10]
                    overflow-hidden
                    bg-[#EEF6FF]
                  "
                >
                  {area.image?.url ? (
                    <img
                      src={area.image.url}
                      alt={
                        area.image.alt ||
                        area.name
                      }
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
                        <MapPin
                          size={28}
                          strokeWidth={1.6}
                        />
                      </div>
                    </div>
                  )}

                  {/* Overlay */}
                  <div
                    className="
                      absolute
                      inset-x-0
                      bottom-0
                      h-24
                      bg-gradient-to-t
                      from-black/45
                      to-transparent
                    "
                  />

                  {/* Location badge */}
                  <div
                    className="
                      absolute
                      left-4
                      top-4
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      border
                      border-white/60
                      bg-white/95
                      px-3
                      py-1.5
                      shadow-sm
                      backdrop-blur-sm
                    "
                  >
                    <MapPin
                      size={12}
                      className="text-[#0878E8]"
                    />

                    <span
                      className="
                        text-[10px]
                        font-extrabold
                        text-[#062B63]
                      "
                    >
                      Service Area
                    </span>
                  </div>

                  {/* Area name */}
                  <div
                    className="
                      absolute
                      bottom-4
                      left-4
                      right-4
                    "
                  >
                    <h3
                      className="
                        text-xl
                        font-extrabold
                        tracking-[-0.025em]
                        text-white
                      "
                    >
                      {area.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <p
                    className="
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    {area.shortDescription}
                  </p>

                  {/* Highlights */}
                  {highlights.length > 0 && (
                    <div
                      className="
                        mt-5
                        space-y-2
                      "
                    >
                      {highlights.map(
                        (highlight) => (
                          <div
                            key={highlight}
                            className="
                              flex
                              items-start
                              gap-2.5
                            "
                          >
                            <CheckIcon />

                            <span
                              className="
                                text-xs
                                font-semibold
                                leading-5
                                text-slate-600
                              "
                            >
                              {highlight}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  )}

                  {/* Bottom */}
                  <div
                    className="
                      mt-6
                      flex
                      items-center
                      justify-between
                      border-t
                      border-slate-100
                      pt-4
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-[11px]
                        font-bold
                        text-slate-400
                      "
                    >
                      <ShieldCheck
                        size={14}
                        className="text-[#0878E8]"
                      />

                      Local coverage
                    </div>

                    <Link
                      href={`/service-areas/${area.slug}`}
                      className="
                        group/link
                        inline-flex
                        items-center
                        gap-1.5
                        text-xs
                        font-extrabold
                        text-[#0878E8]
                        transition
                        hover:text-[#066BCF]
                      "
                    >
                      Explore area

                      <ArrowRight
                        size={14}
                        className="
                          transition-transform
                          group-hover/link:translate-x-0.5
                        "
                      />
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

function CheckIcon() {
  return (
    <span
      className="
        mt-0.5
        flex
        h-5
        w-5
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-emerald-50
        text-emerald-600
      "
    >
      <svg
        width="11"
        height="11"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.5 6.2 5 8.5 9.5 3.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}