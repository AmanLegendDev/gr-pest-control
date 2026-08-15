import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface AboutHeroProps {
  businessName: string;
  shortDescription: string;
  city: string;
  state: string;
  primaryCTA: string;
}

export default function AboutHero({
  businessName,
  shortDescription,
  city,
  state,
  primaryCTA,
}: AboutHeroProps) {
  const location =
    [city, state]
      .filter(Boolean)
      .join(", ");

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F8FAFC]
        px-4
        pb-16
        pt-10
        sm:px-6
        sm:pb-20
        sm:pt-14
        lg:px-8
        lg:pb-24
        lg:pt-16
      "
    >
      {/* =========================
          BACKGROUND ACCENTS
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
          bg-blue-100/70
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
          h-80
          w-80
          rounded-full
          bg-white
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
                shadow-[0_6px_20px_rgba(15,23,42,0.04)]
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
                About {businessName}
              </span>
            </div>

            {/* Heading */}

            <h1
              className="
                mt-6
                text-4xl
                font-extrabold
                leading-[1.02]
                tracking-[-0.055em]
                text-[#062B63]
                sm:text-5xl
                lg:text-[4rem]
              "
            >
              Pest control that
              <span className="text-[#0878E8]">
                {" "}puts your property first.
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
              {shortDescription ||
                `${businessName} provides professional pest control services designed around the needs of homes, workplaces and commercial properties.`}
            </p>

            {/* Location */}

            {location && (
              <div
                className="
                  mt-4
                  flex
                  items-center
                  gap-2
                  text-xs
                  font-bold
                  text-slate-400
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-emerald-400
                  "
                />

                Serving {location}
              </div>
            )}

            {/* =========================
                ACTIONS
            ========================== */}

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
                {primaryCTA ||
                  "Get a Free Quote"}

                <ArrowRight
                  size={15}
                  className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                  "
                />
              </Link>

              <Link
                href="/services"
                className="
                  inline-flex
                  min-h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  px-6
                  text-sm
                  font-extrabold
                  text-[#062B63]
                  transition-all
                  duration-200
                  hover:border-blue-100
                  hover:bg-blue-50
                  hover:text-[#0878E8]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#0878E8]
                  focus-visible:ring-offset-2
                "
              >
                Explore Services
              </Link>
            </div>

            {/* =========================
                TRUST POINTS
            ========================== */}

            <div
              className="
                mt-8
                flex
                flex-wrap
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
                <CheckCircle2
                  size={15}
                  className="text-emerald-500"
                />

                <span
                  className="
                    text-xs
                    font-bold
                    text-slate-500
                  "
                >
                  Professional service
                </span>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <ShieldCheck
                  size={15}
                  className="text-[#0878E8]"
                />

                <span
                  className="
                    text-xs
                    font-bold
                    text-slate-500
                  "
                >
                  Property-focused solutions
                </span>
              </div>
            </div>
          </div>

          {/* =========================
              RIGHT VISUAL
          ========================== */}

          <div
            className="
              relative
              mx-auto
              w-full
              max-w-xl
              lg:ml-auto
            "
          >
            <div
              className="
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-white
                bg-[#062B63]
                p-2
                shadow-[0_25px_70px_rgba(6,43,99,0.14)]
                sm:rounded-[38px]
              "
            >
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[26px]
                  bg-gradient-to-br
                  from-[#0878E8]
                  via-[#075FBA]
                  to-[#062B63]
                  px-6
                  py-8
                  sm:rounded-[31px]
                  sm:px-8
                  sm:py-10
                "
              >
                {/* Decorative circles */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    -right-20
                    -top-20
                    h-52
                    w-52
                    rounded-full
                    border
                    border-white/10
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    -bottom-28
                    -left-20
                    h-60
                    w-60
                    rounded-full
                    border
                    border-white/10
                  "
                />

                {/* Shield */}

                <div
                  className="
                    relative
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-[22px]
                    bg-white/15
                    text-white
                    backdrop-blur-sm
                  "
                >
                  <ShieldCheck size={30} />
                </div>

                <p
                  className="
                    relative
                    mt-8
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.17em]
                    text-blue-100
                  "
                >
                  Built around your property
                </p>

                <h2
                  className="
                    relative
                    mt-3
                    max-w-md
                    text-2xl
                    font-extrabold
                    leading-tight
                    tracking-[-0.035em]
                    text-white
                    sm:text-3xl
                  "
                >
                  Good pest control starts
                  with understanding the
                  problem.
                </h2>

                <p
                  className="
                    relative
                    mt-4
                    max-w-md
                    text-sm
                    leading-6
                    text-blue-100/75
                  "
                >
                  From identifying the issue to
                  choosing the right treatment,
                  every service should have a
                  clear reason behind it.
                </p>

                {/* Bottom status */}

                <div
                  className="
                    relative
                    mt-8
                    flex
                    items-center
                    justify-between
                    gap-4
                    border-t
                    border-white/10
                    pt-5
                  "
                >
                  <div>
                    <p
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.12em]
                        text-blue-200/70
                      "
                    >
                      Our approach
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        font-extrabold
                        text-white
                      "
                    >
                      Assess → Treat → Protect
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-white/10
                      text-white
                    "
                  >
                    <ArrowRight size={17} />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating trust badge */}

            <div
              className="
                absolute
                -bottom-5
                left-5
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-slate-100
                bg-white
                px-4
                py-3
                shadow-[0_15px_40px_rgba(15,23,42,0.10)]
                sm:left-8
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
                  bg-emerald-50
                  text-emerald-500
                "
              >
                <CheckCircle2 size={17} />
              </div>

              <div>
                <p
                  className="
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-[0.1em]
                    text-slate-400
                  "
                >
                  Our promise
                </p>

                <p
                  className="
                    mt-0.5
                    text-xs
                    font-extrabold
                    text-[#062B63]
                  "
                >
                  Professional. Practical. Clear.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}