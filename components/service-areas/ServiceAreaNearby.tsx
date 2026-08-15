import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Navigation,
} from "lucide-react";

interface ServiceAreaNearbyProps {
  areaName: string;
  nearbyAreas: string[];
}

export default function ServiceAreaNearby({
  areaName,
  nearbyAreas,
}: ServiceAreaNearbyProps) {
  if (nearbyAreas.length === 0) {
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
        <div
          className="
            grid
            gap-10
            lg:grid-cols-[0.8fr_1.2fr]
            lg:items-center
            lg:gap-16
          "
        >
          {/* =========================
              LEFT
          ========================== */}

          <div className="max-w-xl">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-slate-200
                bg-white
                px-3
                py-1.5
                shadow-sm
              "
            >
              <Navigation
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
                Nearby Coverage
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
              Serving {areaName} and nearby
              areas
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
              Our service coverage may also
              include locations around {areaName}.
              If you're nearby, send us your
              location and we'll check availability
              for your property.
            </p>

            <Link
              href="/quote"
              className="
                group
                mt-6
                inline-flex
                items-center
                gap-2
                text-sm
                font-extrabold
                text-[#0878E8]
                transition-colors
                hover:text-[#066BCF]
              "
            >
              Check service availability

              <ArrowRight
                size={15}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>

          {/* =========================
              NEARBY AREA LIST
          ========================== */}

          <div
            className="
              rounded-[28px]
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
              sm:p-7
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
                border-b
                border-slate-100
                pb-5
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
                  bg-blue-50
                  text-[#0878E8]
                "
              >
                <MapPin size={18} />
              </div>

              <div>
                <p
                  className="
                    text-sm
                    font-extrabold
                    text-[#062B63]
                  "
                >
                  Nearby locations
                </p>

                <p
                  className="
                    mt-0.5
                    text-xs
                    text-slate-400
                  "
                >
                  Areas close to {areaName}
                </p>
              </div>
            </div>

            <div
              className="
                mt-5
                flex
                flex-wrap
                gap-2.5
              "
            >
              {nearbyAreas.map(
                (nearbyArea, index) => (
                  <div
                    key={`${nearbyArea}-${index}`}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-slate-200
                      bg-[#F8FAFC]
                      px-4
                      py-2.5
                      text-xs
                      font-bold
                      text-slate-600
                      transition
                      hover:border-blue-100
                      hover:bg-blue-50
                      hover:text-[#0878E8]
                    "
                  >
                    <MapPin
                      size={13}
                      className="shrink-0 text-[#0878E8]"
                    />

                    {nearbyArea}
                  </div>
                ),
              )}
            </div>

            <div
              className="
                mt-6
                rounded-2xl
                bg-[#F8FAFC]
                px-4
                py-3.5
              "
            >
              <p
                className="
                  text-xs
                  leading-5
                  text-slate-500
                "
              >
                <span
                  className="
                    font-bold
                    text-[#062B63]
                  "
                >
                  Not sure if we cover you?
                </span>{" "}
                Send your location through our
                quote form and our team can check
                your service availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}