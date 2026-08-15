import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Navigation,
} from "lucide-react";

interface AboutAreaItem {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  nearbyAreas: string[];
  featured: boolean;
}

interface AboutAreasProps {
  areas: AboutAreaItem[];
  city?: string;
  state?: string;
}

export default function AboutAreas({
  areas,
  city,
  state,
}: AboutAreasProps) {
  const visibleAreas =
    areas.slice(0, 6);

  const location =
    [city, state]
      .filter(Boolean)
      .join(", ");

  if (visibleAreas.length === 0) {
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
            HEADER
        ========================== */}

        <div
          className="
            flex
            flex-col
            gap-5
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div className="max-w-2xl">
            <div
              className="
                inline-flex
                items-center
                gap-1.5
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.16em]
                text-[#0878E8]
              "
            >
              <MapPin size={12} />

              Where we serve
            </div>

            <h2
              className="
                mt-3
                text-3xl
                font-extrabold
                leading-[1.08]
                tracking-[-0.045em]
                text-[#062B63]
                sm:text-4xl
              "
            >
              Local service,
              close to you.
            </h2>

            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-7
                text-slate-500
                sm:text-base
              "
            >
              Explore the areas where our
              services are available and find
              the location that is closest to
              your property.
            </p>
          </div>

          {/* Location pill */}

          {location && (
            <div
              className="
                inline-flex
                shrink-0
                items-center
                gap-2
                self-start
                rounded-full
                border
                border-slate-100
                bg-[#F8FAFC]
                px-4
                py-2.5
                lg:self-auto
              "
            >
              <span
                className="
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-50
                  text-[#0878E8]
                "
              >
                <Navigation size={12} />
              </span>

              <span
                className="
                  text-[10px]
                  font-extrabold
                  text-slate-500
                "
              >
                Based in {location}
              </span>
            </div>
          )}
        </div>

        {/* =========================
            AREAS GRID
        ========================== */}

        <div
          className="
            mt-10
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {visibleAreas.map(
            (area) => (
              <Link
                key={area.id}
                href={`/service-areas/${area.slug}`}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[26px]
                  border
                  border-slate-100
                  bg-[#F8FAFC]
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-100
                  hover:bg-white
                  hover:shadow-[0_18px_45px_rgba(15,23,42,0.07)]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#0878E8]
                  focus-visible:ring-offset-2
                "
              >
                {/* Top */}

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-white
                      text-[#0878E8]
                      shadow-sm
                      transition-all
                      duration-300
                      group-hover:bg-[#0878E8]
                      group-hover:text-white
                    "
                  >
                    <MapPin size={18} />
                  </div>

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-slate-300
                      shadow-sm
                      transition-all
                      duration-300
                      group-hover:bg-blue-50
                      group-hover:text-[#0878E8]
                    "
                  >
                    <ArrowRight
                      size={14}
                    />
                  </span>
                </div>

                {/* Content */}

                <div className="mt-5">
                  <h3
                    className="
                      text-lg
                      font-extrabold
                      tracking-[-0.025em]
                      text-[#062B63]
                      transition-colors
                      group-hover:text-[#0878E8]
                    "
                  >
                    {area.name}
                  </h3>

                  {area.shortDescription && (
                    <p
                      className="
                        mt-2
                        line-clamp-2
                        text-xs
                        leading-6
                        text-slate-400
                      "
                    >
                      {area.shortDescription}
                    </p>
                  )}
                </div>

                {/* Nearby areas */}

                {area.nearbyAreas.length >
                  0 && (
                  <div
                    className="
                      mt-5
                      flex
                      flex-wrap
                      gap-1.5
                    "
                  >
                    {area.nearbyAreas
                      .slice(0, 3)
                      .map(
                        (
                          nearby,
                        ) => (
                          <span
                            key={
                              nearby
                            }
                            className="
                              rounded-full
                              bg-white
                              px-2.5
                              py-1.5
                              text-[9px]
                              font-bold
                              text-slate-400
                            "
                          >
                            {nearby}
                          </span>
                        ),
                      )}

                    {area.nearbyAreas
                      .length > 3 && (
                      <span
                        className="
                          rounded-full
                          bg-white
                          px-2.5
                          py-1.5
                          text-[9px]
                          font-bold
                          text-slate-300
                        "
                      >
                        +
                        {area
                          .nearbyAreas
                          .length -
                          3}
                      </span>
                    )}
                  </div>
                )}

                {/* Bottom */}

                <div
                  className="
                    mt-5
                    border-t
                    border-slate-100
                    pt-3
                  "
                >
                  <span
                    className="
                      text-[9px]
                      font-extrabold
                      uppercase
                      tracking-[0.12em]
                      text-slate-300
                      transition-colors
                      group-hover:text-[#0878E8]
                    "
                  >
                    Explore service area
                  </span>
                </div>
              </Link>
            ),
          )}
        </div>

        {/* =========================
            VIEW ALL
        ========================== */}

        {areas.length > 6 && (
          <div
            className="
              mt-8
              flex
              justify-center
            "
          >
            <Link
              href="/service-areas"
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-slate-200
                bg-white
                px-5
                py-3
                text-xs
                font-extrabold
                text-[#062B63]
                transition-all
                duration-200
                hover:border-blue-100
                hover:bg-blue-50
                hover:text-[#0878E8]
              "
            >
              View all service areas

              <span
                className="
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-50
                  text-slate-400
                  transition-all
                  group-hover:bg-white
                  group-hover:text-[#0878E8]
                "
              >
                <ArrowRight size={12} />
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}