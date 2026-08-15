import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function GalleryFinalCTA() {
  return (
    <section
      className="
        bg-white
        px-4
        pb-20
        pt-6
        sm:px-6
        sm:pb-24
        sm:pt-10
        lg:px-8
        lg:pb-28
        lg:pt-14
      "
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            bg-[#062B63]
            px-6
            py-11
            shadow-[0_25px_70px_rgba(6,43,99,0.16)]
            sm:px-10
            sm:py-14
            lg:px-16
            lg:py-16
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
              -right-28
              -top-32
              h-80
              w-80
              rounded-full
              bg-[#0878E8]/25
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-32
              -left-24
              h-72
              w-72
              rounded-full
              bg-white/5
              blur-3xl
            "
          />

          <div
            className="
              relative
              grid
              items-center
              gap-10
              lg:grid-cols-[1fr_auto]
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
                  border-white/10
                  bg-white/10
                  px-3.5
                  py-2
                  backdrop-blur-sm
                "
              >
                <Sparkles
                  size={13}
                  className="text-blue-200"
                />

                <span
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.16em]
                    text-blue-100
                  "
                >
                  Your Property. Our Expertise.
                </span>
              </div>

              {/* Heading */}

              <h2
                className="
                  mt-5
                  text-3xl
                  font-extrabold
                  leading-[1.08]
                  tracking-[-0.045em]
                  text-white
                  sm:text-4xl
                  lg:text-[2.7rem]
                "
              >
                See something familiar?
                <br className="hidden sm:block" />
                {" "}Let's solve it properly.
              </h2>

              {/* Description */}

              <p
                className="
                  mt-4
                  max-w-xl
                  text-sm
                  leading-7
                  text-blue-100/75
                  sm:text-base
                "
              >
                Whether it's your home, workplace
                or commercial property, tell us what
                you're dealing with and request a
                quote from our team.
              </p>

              {/* =========================
                  TRUST POINTS
              ========================== */}

              <div
                className="
                  mt-7
                  grid
                  gap-3
                  sm:grid-cols-2
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                  "
                >
                  <CheckCircle2
                    size={16}
                    className="text-emerald-300"
                  />

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-blue-100
                    "
                  >
                    Simple quote request
                  </span>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                  "
                >
                  <CheckCircle2
                    size={16}
                    className="text-emerald-300"
                  />

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-blue-100
                    "
                  >
                    Choose your preferred time
                  </span>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                  "
                >
                  <CheckCircle2
                    size={16}
                    className="text-emerald-300"
                  />

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-blue-100
                    "
                  >
                    Professional service
                  </span>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                  "
                >
                  <ShieldCheck
                    size={16}
                    className="text-blue-200"
                  />

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-blue-100
                    "
                  >
                    Service tailored to your property
                  </span>
                </div>
              </div>
            </div>

            {/* =========================
                ACTION
            ========================== */}

            <div
              className="
                flex
                w-full
                flex-col
                items-center
                gap-3
                lg:w-auto
              "
            >
              <Link
                href="/quote"
                className="
                  group
                  inline-flex
                  min-h-13
                  w-full
                  min-w-[220px]
                  items-center
                  justify-center
                  gap-2.5
                  rounded-full
                  bg-white
                  px-7
                  text-sm
                  font-extrabold
                  text-[#062B63]
                  shadow-[0_12px_30px_rgba(0,0,0,0.12)]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-slate-50
                  hover:shadow-[0_16px_35px_rgba(0,0,0,0.16)]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#062B63]
                  sm:w-auto
                "
              >
                Request a Free Quote

                <span
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-[#0878E8]
                    text-white
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

              <Link
                href="/gallery"
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  text-xs
                  font-bold
                  text-blue-100/60
                  transition
                  hover:text-white
                "
              >
                Back to gallery
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}