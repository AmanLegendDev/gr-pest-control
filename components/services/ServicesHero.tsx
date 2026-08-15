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

          <div className="relative mx-auto w-full max-w-xl">
            <div
              className="
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-slate-200
                bg-[#F8FAFC]
                p-2
                shadow-[0_30px_90px_rgba(15,23,42,0.10)]
              "
            >
              {/* Main visual */}
              <div
                className="
                  relative
                  flex
                  min-h-[330px]
                  items-end
                  overflow-hidden
                  rounded-[24px]
                  bg-[#062B63]
                  p-6
                  sm:min-h-[390px]
                  sm:p-8
                "
              >
                {/* Decorative shapes */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    -right-20
                    -top-20
                    h-64
                    w-64
                    rounded-full
                    bg-[#0878E8]/30
                    blur-2xl
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    bottom-[-90px]
                    left-[-70px]
                    h-56
                    w-56
                    rounded-full
                    bg-white/10
                    blur-2xl
                  "
                />

                {/* Shield */}
                <div
                  className="
                    absolute
                    right-7
                    top-7
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/10
                    text-white
                    backdrop-blur-sm
                    sm:right-9
                    sm:top-9
                  "
                >
                  <ShieldCheck
                    size={27}
                    strokeWidth={1.7}
                  />
                </div>

                {/* Visual copy */}
                <div className="relative max-w-sm">
                  <p
                    className="
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.18em]
                      text-blue-200
                    "
                  >
                    Pest solutions
                  </p>

                  <h2
                    className="
                      mt-3
                      text-2xl
                      font-extrabold
                      leading-tight
                      tracking-[-0.03em]
                      text-white
                      sm:text-3xl
                    "
                  >
                    Protection built
                    around your property.
                  </h2>

                  <p
                    className="
                      mt-4
                      text-sm
                      leading-6
                      text-blue-100/75
                    "
                  >
                    Tell us what you’re dealing with
                    and we’ll help you choose the right
                    service.
                  </p>
                </div>

                {/* Floating service indicator */}
                <div
                  className="
                    absolute
                    bottom-6
                    right-6
                    hidden
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/10
                    px-4
                    py-3
                    backdrop-blur-md
                    sm:flex
                  "
                >
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-white
                      text-[#0878E8]
                    "
                  >
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <p
                      className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.12em]
                        text-blue-100/60
                      "
                    >
                      Need help?
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-xs
                        font-bold
                        text-white
                      "
                    >
                      Start with a free quote
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Small floating badge */}
            <div
              className="
                absolute
                -bottom-4
                left-5
                flex
                items-center
                gap-2.5
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                shadow-[0_15px_35px_rgba(15,23,42,0.10)]
                sm:left-8
              "
            >
              <div
                className="
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-emerald-500
                "
              />

              <span
                className="
                  text-xs
                  font-bold
                  text-[#062B63]
                "
              >
                Solutions for homes & businesses
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}