import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  ShieldCheck,
} from "lucide-react";

interface ServiceAreasHeroProps {
  areaCount: number;
}

export default function ServiceAreasHero({
  areaCount,
}: ServiceAreasHeroProps) {
  return (
    <section
      className="
        overflow-hidden
        bg-[#F8FAFC]
        px-4
        pb-14
        pt-10
        sm:px-6
        sm:pb-18
        sm:pt-14
        lg:px-8
        lg:pb-20
        lg:pt-16
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-10
          lg:grid-cols-[1.05fr_0.95fr]
          lg:gap-16
        "
      >
        {/* =========================
            LEFT CONTENT
        ========================== */}

        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-100
              bg-white
              px-3.5
              py-2
              shadow-sm
            "
          >
            <span
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-blue-50
                text-[#0878E8]
              "
            >
              <MapPin size={12} />
            </span>

            <span
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.15em]
                text-[#0878E8]
              "
            >
              Areas We Serve
            </span>
          </div>

          {/* Heading */}
          <h1
            className="
              mt-5
              max-w-2xl
              text-3xl
              font-extrabold
              leading-[1.08]
              tracking-[-0.045em]
              text-[#062B63]
              sm:text-4xl
              lg:text-5xl
            "
          >
            Professional pest control,
            <span className="text-[#0878E8]">
              {" "}where you need it.
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-5
              max-w-xl
              text-base
              leading-7
              text-slate-500
              sm:text-lg
            "
          >
            Find your local service area and
            explore the pest control solutions
            available for your property.
          </p>

          {/* Availability */}
          <div
            className="
              mt-6
              flex
              flex-wrap
              gap-x-6
              gap-y-3
            "
          >
            <div className="flex items-center gap-2">
              <CheckCircle2
                size={16}
                className="text-emerald-500"
              />

              <span
                className="
                  text-xs
                  font-bold
                  text-slate-600
                "
              >
                {areaCount} active service{" "}
                {areaCount === 1
                  ? "area"
                  : "areas"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck
                size={16}
                className="text-[#0878E8]"
              />

              <span
                className="
                  text-xs
                  font-bold
                  text-slate-600
                "
              >
                Professional service
              </span>
            </div>
          </div>

          {/* CTA */}
          <div
            className="
              mt-8
              flex
              flex-col
              gap-3
              sm:flex-row
            "
          >
            <a
              href="#service-areas"
              className="
                group
                inline-flex
                min-h-12
                items-center
                justify-center
                gap-2.5
                rounded-full
                bg-[#0878E8]
                px-6
                text-sm
                font-extrabold
                text-white
                shadow-[0_12px_30px_rgba(8,120,232,0.18)]
                transition
                hover:bg-[#066BCF]
                hover:shadow-[0_16px_35px_rgba(8,120,232,0.22)]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#0878E8]
                focus-visible:ring-offset-2
              "
            >
              Find your area

              <ArrowRight
                size={16}
                className="
                  transition-transform
                  group-hover:translate-x-0.5
                "
              />
            </a>

            <Link
              href="/quote"
              className="
                inline-flex
                min-h-12
                items-center
                justify-center
                rounded-full
                border
                border-slate-200
                bg-white
                px-6
                text-sm
                font-bold
                text-[#062B63]
                transition
                hover:bg-slate-50
              "
            >
              Get a Free Quote
            </Link>
          </div>
        </div>

        {/* =========================
            RIGHT VISUAL
        ========================== */}

        <div
          className="
            relative
            min-h-[320px]
            overflow-hidden
            rounded-[30px]
            border
            border-slate-200
            bg-white
            shadow-[0_20px_60px_rgba(15,23,42,0.08)]
            sm:min-h-[380px]
          "
        >
          {/* Decorative map-like background */}
          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              bg-[linear-gradient(135deg,#EEF6FF_0%,#F8FAFC_48%,#FFFFFF_100%)]
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              -right-16
              -top-16
              h-56
              w-56
              rounded-full
              bg-blue-100/60
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              -bottom-20
              -left-16
              h-56
              w-56
              rounded-full
              bg-slate-100
              blur-3xl
            "
          />

          {/* Abstract coverage lines */}
          <div
            aria-hidden="true"
            className="
              absolute
              left-[12%]
              top-[25%]
              h-px
              w-[72%]
              rotate-[18deg]
              bg-blue-100
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              left-[20%]
              top-[55%]
              h-px
              w-[65%]
              -rotate-[24deg]
              bg-blue-100
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              left-[35%]
              top-[10%]
              h-[80%]
              w-px
              rotate-[18deg]
              bg-slate-200/70
            "
          />

          {/* Main location marker */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              flex
              -translate-x-1/2
              -translate-y-1/2
              flex-col
              items-center
            "
          >
            <div
              className="
                relative
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-[#0878E8]
                text-white
                shadow-[0_15px_35px_rgba(8,120,232,0.28)]
              "
            >
              <span
                className="
                  absolute
                  inset-0
                  animate-ping
                  rounded-full
                  bg-[#0878E8]/20
                "
              />

              <MapPin
                size={27}
                strokeWidth={2}
              />
            </div>

            <div
              className="
                mt-3
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-2.5
                text-center
                shadow-lg
              "
            >
              <p
                className="
                  text-xs
                  font-extrabold
                  text-[#062B63]
                "
              >
                Local coverage
              </p>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  font-medium
                  text-slate-400
                "
              >
                Find your service area
              </p>
            </div>
          </div>

          {/* Small location markers */}
          <div
            className="
              absolute
              left-[18%]
              top-[30%]
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border
              border-blue-100
              bg-white
              text-[#0878E8]
              shadow-sm
            "
          >
            <MapPin size={14} />
          </div>

          <div
            className="
              absolute
              right-[18%]
              top-[24%]
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border
              border-blue-100
              bg-white
              text-[#0878E8]
              shadow-sm
            "
          >
            <MapPin size={14} />
          </div>

          <div
            className="
              absolute
              bottom-[22%]
              left-[24%]
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border
              border-blue-100
              bg-white
              text-[#0878E8]
              shadow-sm
            "
          >
            <MapPin size={14} />
          </div>

          {/* Bottom information card */}
          <div
            className="
              absolute
              bottom-4
              left-4
              right-4
              rounded-2xl
              border
              border-white/70
              bg-white/95
              p-4
              shadow-lg
              backdrop-blur-sm
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  text-[#0878E8]
                "
              >
                <MapPin size={17} />
              </div>

              <div>
                <p
                  className="
                    text-xs
                    font-extrabold
                    text-[#062B63]
                  "
                >
                  Serving local properties
                </p>

                <p
                  className="
                    mt-0.5
                    text-[11px]
                    leading-5
                    text-slate-500
                  "
                >
                  Select an area below to learn
                  more about local coverage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}