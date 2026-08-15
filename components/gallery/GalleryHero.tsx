import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Camera,
  Images,
} from "lucide-react";

interface GalleryHeroProps {
  itemCount: number;
  categoryCount: number;
}

export default function GalleryHero({
  itemCount,
  categoryCount,
}: GalleryHeroProps) {
  return (
   <section
  className="
    relative
    overflow-hidden
    bg-[#F8FAFC]
    px-4
    pb-14
    pt-26
    sm:px-6
    sm:pb-18
    sm:pt-26
    lg:px-8
    lg:pb-20
    lg:pt-26
  "
>
      {/* =========================
          BACKGROUND DETAILS
      ========================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-80
          w-80
          rounded-full
          bg-blue-100/60
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-32
          h-96
          w-96
          rounded-full
          bg-slate-100
          blur-3xl
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-7xl
        "
      >
        <div
          className="
            grid
            items-center
            gap-10
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-16
          "
        >
          {/* =========================
              LEFT CONTENT
          ========================== */}

          <div className="max-w-xl">
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
                <Camera size={12} />
              </span>

              <span
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.16em]
                  text-[#0878E8]
                "
              >
                Our Gallery
              </span>
            </div>

            {/* Heading */}
            <h1
              className="
                mt-5
                text-4xl
                font-extrabold
                leading-[1.04]
                tracking-[-0.055em]
                text-[#062B63]
                sm:text-5xl
                lg:text-[3.7rem]
              "
            >
              See the work.
              <br />

              <span className="text-[#0878E8]">
                See the difference.
              </span>
            </h1>

            {/* Description */}
            <p
              className="
                mt-5
                max-w-lg
                text-base
                leading-7
                text-slate-500
                sm:text-lg
                sm:leading-8
              "
            >
              Explore our pest control work,
              treatment environments and the
              people behind the service.
            </p>

            {/* Stats */}
            <div
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-x-6
                gap-y-3
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <Images
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
                  {itemCount}{" "}
                  {itemCount === 1
                    ? "photo"
                    : "photos"}
                </span>
              </div>

              <div
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-slate-300
                "
              />

              <span
                className="
                  text-xs
                  font-bold
                  text-slate-500
                "
              >
                {categoryCount}{" "}
                {categoryCount === 1
                  ? "category"
                  : "categories"}
              </span>
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
                href="#gallery"
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
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#066BCF]
                  hover:shadow-[0_16px_35px_rgba(8,120,232,0.22)]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#0878E8]
                  focus-visible:ring-offset-2
                "
              >
                Explore gallery

                <ArrowRight
                  size={16}
                  className="
                    transition-transform
                    duration-200
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
                  hover:border-blue-100
                  hover:bg-blue-50
                  hover:text-[#0878E8]
                "
              >
                Get a Free Quote
              </Link>
            </div>
          </div>

          {/* =========================
              VISUAL COLLAGE
          ========================== */}

          <div
            className="
              relative
              min-h-[360px]
              sm:min-h-[440px]
            "
          >
            {/* Main frame */}
            <div
              className="
                absolute
                right-0
                top-0
                h-[78%]
                w-[76%]
                overflow-hidden
                rounded-[28px]
                border
                border-slate-200
                bg-white
                p-2
                shadow-[0_25px_70px_rgba(15,23,42,0.10)]
                sm:rounded-[32px]
              "
            >
              <div
                className="
                  flex
                  h-full
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-[23px]
                  bg-[linear-gradient(135deg,#DCEEFF,#F7FAFC)]
                  sm:rounded-[27px]
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
                    bg-white/90
                    text-[#0878E8]
                    shadow-sm
                    backdrop-blur
                  "
                >
                  <Camera
                    size={28}
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>

            {/* Secondary frame */}
            <div
              className="
                absolute
                bottom-0
                left-0
                h-[55%]
                w-[55%]
                overflow-hidden
                rounded-[25px]
                border
                border-white
                bg-white
                p-2
                shadow-[0_20px_55px_rgba(15,23,42,0.12)]
                sm:rounded-[30px]
              "
            >
              <div
                className="
                  flex
                  h-full
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-[20px]
                  bg-[linear-gradient(135deg,#EEF6FF,#E5EDF5)]
                  sm:rounded-[25px]
                "
              >
                <div
                  className="
                    h-20
                    w-20
                    rounded-full
                    border-[10px]
                    border-white/70
                  "
                />
              </div>
            </div>

            {/* Small frame */}
            <div
              className="
                absolute
                bottom-[12%]
                right-[4%]
                h-[35%]
                w-[34%]
                overflow-hidden
                rounded-[22px]
                border
                border-white
                bg-white
                p-1.5
                shadow-[0_16px_45px_rgba(15,23,42,0.12)]
              "
            >
              <div
                className="
                  flex
                  h-full
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-[17px]
                  bg-[#062B63]
                "
              >
                <span
                  className="
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-[0.14em]
                    text-blue-100
                  "
                >
                  GR Pest Control
                </span>
              </div>
            </div>

            {/* Floating label */}
            <div
              className="
                absolute
                left-[7%]
                top-[12%]
                inline-flex
                items-center
                gap-2.5
                rounded-2xl
                border
                border-white
                bg-white/95
                px-4
                py-3
                shadow-[0_12px_35px_rgba(15,23,42,0.10)]
                backdrop-blur
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  text-[#0878E8]
                "
              >
                <Images size={15} />
              </span>

              <div>
                <p
                  className="
                    text-[11px]
                    font-extrabold
                    text-[#062B63]
                  "
                >
                  Real work
                </p>

                <p
                  className="
                    mt-0.5
                    text-[9px]
                    font-semibold
                    text-slate-400
                  "
                >
                  Real results
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="
            mt-8
            flex
            items-center
            justify-center
            gap-2
            text-[10px]
            font-extrabold
            uppercase
            tracking-[0.14em]
            text-slate-300
          "
        >
          <span>Explore below</span>

          <ArrowDown
            size={13}
            className="text-[#0878E8]"
          />
        </div>
      </div>
    </section>
  );
}