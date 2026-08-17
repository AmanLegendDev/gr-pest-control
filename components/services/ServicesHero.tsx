import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function ServicesHero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        px-4
        pb-16
        pt-32
        sm:px-6
        sm:pb-20
        sm:pt-36
        lg:px-8
        lg:pb-24
        lg:pt-40
      "
    >
      {/* =========================
          SOFT BACKGROUND DETAIL
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
          bg-blue-50/70
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-40
          h-96
          w-96
          rounded-full
          bg-slate-100/70
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-7xl">
        <div
          className="
            grid
            items-center
            gap-12
            lg:grid-cols-[1.05fr_0.95fr]
            lg:gap-16
          "
        >
          {/* =========================
              CONTENT
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
                bg-blue-50/70
                px-3.5
                py-2
              "
            >
              <Sparkles
                size={13}
                className="text-[#0878E8]"
                aria-hidden="true"
              />

              <span
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.16em]
                  text-[#0878E8]
                "
              >
                Professional Pest Control
              </span>
            </div>

            {/* Heading */}
            <h1
              className="
                mt-6
                max-w-xl
                text-4xl
                font-extrabold
                tracking-[-0.045em]
                text-[#062B63]
                sm:text-5xl
                sm:leading-[1.05]
                lg:text-[3.65rem]
                lg:leading-[1.04]
              "
            >
              The right solution
              <span className="text-[#0878E8]">
                {" "}for every pest problem.
              </span>
            </h1>

            {/* Description */}
            <p
              className="
                mt-5
                max-w-xl
                text-sm
                leading-7
                text-slate-500
                sm:text-base
                sm:leading-8
              "
            >
              From everyday pest problems to more
              persistent infestations, choose a
              professional treatment designed around
              your property and your situation.
            </p>

            {/* CTA */}
            <div
              className="
                mt-7
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
              "
            >
              <Link
                href="/quote"
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
                  shadow-[0_14px_35px_rgba(8,120,232,0.18)]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#066BCF]
                  hover:shadow-[0_18px_40px_rgba(8,120,232,0.24)]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-blue-200
                  focus-visible:ring-offset-2
                "
              >
                Get a Free Quote

                <span
                  className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-white/15
                  "
                >
                  <ArrowRight
                    size={14}
                    className="
                      transition-transform
                      duration-200
                      group-hover:translate-x-0.5
                    "
                  />
                </span>
              </Link>

              <a
                href="#services"
                className="
                  inline-flex
                  min-h-12
                  items-center
                  justify-center
                  rounded-full
                  px-5
                  text-sm
                  font-bold
                  text-[#062B63]
                  transition
                  hover:bg-slate-50
                "
              >
                Explore services
              </a>
            </div>

            {/* Trust points */}
            <div
              className="
                mt-8
                flex
                flex-col
                gap-3
                border-t
                border-slate-100
                pt-6
                sm:flex-row
                sm:gap-6
              "
            >
              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={16}
                  className="shrink-0 text-emerald-500"
                />

                <span
                  className="
                    text-xs
                    font-semibold
                    text-slate-600
                  "
                >
                  Professional service
                </span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={16}
                  className="shrink-0 text-emerald-500"
                />

                <span
                  className="
                    text-xs
                    font-semibold
                    text-slate-600
                  "
                >
                  Tailored treatment
                </span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={16}
                  className="shrink-0 text-emerald-500"
                />

                <span
                  className="
                    text-xs
                    font-semibold
                    text-slate-600
                  "
                >
                  Easy quote process
                </span>
              </div>
            </div>
          </div>

          {/* =========================
              VISUAL PANEL
          ========================== */}

          {/* =========================
    PEST SHOWCASE
========================== */}

<div
  className="
    relative
    flex
    min-h-[330px]
    items-center
    justify-center
    overflow-hidden
    rounded-[24px]
    bg-white
    
    px-5
    py-8
    sm:min-h-[390px]
    sm:px-8
    sm:py-10
  "
>
  {/* Soft center glow */}
  <div
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      left-1/2
      top-1/2
      h-64
      w-64
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      bg-blue-50
      blur-3xl
    "
  />

  <div
    className="
      relative
      grid
      w-full
      max-w-[430px]
      grid-cols-2
      items-center
      justify-items-center
      gap-x-6
      gap-y-8
      sm:gap-x-10
      sm:gap-y-10
      lg:grid-cols-3
      lg:gap-x-7
      lg:gap-y-8
    "
  >
    {[
      {
        src: "/images/pests/cockroach.png",
        alt: "Cockroach",
      },
      {
        src: "/images/pests/ant.png",
        alt: "Ant",
      },
      {
        src: "/images/pests/termite.png",
        alt: "Termite",
      },
      {
        src: "/images/pests/bed-bug.png",
        alt: "Bed bug",
      },
      {
        src: "/images/pests/mosquito.png",
        alt: "Mosquito",
      },
      {
        src: "/images/pests/spider.png",
        alt: "Spider",
      },
    ].map((pest) => (
      <div
        key={pest.src}
        className="
          flex
          h-24
          w-24
          items-center
          justify-center
          sm:h-28
          sm:w-28
          lg:h-32
          lg:w-32
        "
      >
        <img
          src={pest.src}
          alt={pest.alt}
          className="
            h-full
            w-full
            object-contain
            drop-shadow-[0_12px_18px_rgba(15,23,42,0.14)]
          "
        />
      </div>
    ))}
  </div>
</div>
        </div>
      </div>
    </section>
  );
}