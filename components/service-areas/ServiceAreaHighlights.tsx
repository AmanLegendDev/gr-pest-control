import {
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface ServiceAreaHighlightsProps {
  areaName: string;
  highlights: string[];
}

export default function ServiceAreaHighlights({
  areaName,
  highlights,
}: ServiceAreaHighlightsProps) {
  if (highlights.length === 0) {
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
            <Sparkles
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
              Local Service
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
            Pest control support in {areaName}
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
            Local service information and support
            designed around properties in the
            {` ${areaName}`} area.
          </p>
        </div>

        {/* =========================
            HIGHLIGHTS
        ========================== */}

        <div
          className="
            mt-9
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {highlights.map(
            (highlight, index) => (
              <div
                key={`${highlight}-${index}`}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-slate-200
                  bg-[#F8FAFC]
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-blue-100
                  hover:bg-white
                  hover:shadow-[0_16px_40px_rgba(15,23,42,0.07)]
                  sm:p-6
                "
              >
                {/* Decorative glow */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10
                    h-24
                    w-24
                    rounded-full
                    bg-blue-50
                    opacity-0
                    blur-2xl
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                />

                <div className="relative">
                  {/* Icon + number */}
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-50
                        text-[#0878E8]
                        transition
                        group-hover:bg-[#0878E8]
                        group-hover:text-white
                      "
                    >
                      <CheckCircle2
                        size={21}
                        strokeWidth={2}
                      />
                    </div>

                    <span
                      className="
                        text-xs
                        font-extrabold
                        tabular-nums
                        text-slate-300
                      "
                    >
                      {String(index + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>
                  </div>

                  {/* Highlight */}
                  <p
                    className="
                      mt-5
                      text-sm
                      font-bold
                      leading-6
                      text-[#062B63]
                      sm:text-[15px]
                    "
                  >
                    {highlight}
                  </p>

                  {/* Bottom accent */}
                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      gap-2
                      border-t
                      border-slate-200
                      pt-4
                    "
                  >
                    <ShieldCheck
                      size={14}
                      className="text-[#0878E8]"
                    />

                    <span
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wide
                        text-slate-400
                      "
                    >
                      Local coverage
                    </span>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>

        {/* =========================
            LOCATION NOTE
        ========================== */}

        <div
          className="
            mt-6
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-blue-100
            bg-blue-50/50
            px-4
            py-4
            sm:px-5
          "
        >
          <div
            className="
              mt-0.5
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-white
              text-[#0878E8]
              shadow-sm
            "
          >
            <MapPin size={15} />
          </div>

          <p
            className="
              text-xs
              leading-5
              text-slate-500
              sm:text-sm
            "
          >
            Service availability can vary based
            on the property location, service
            required and current coverage.
          </p>
        </div>
      </div>
    </section>
  );
}