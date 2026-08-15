import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

export default function GalleryHelpCTA() {
  return (
    <section
      className="
        bg-white
        px-4
        py-14
        sm:px-6
        sm:py-20
        lg:px-8
        lg:py-24
      "
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-blue-100
            bg-[#EEF6FF]
            px-6
            py-10
            sm:px-10
            sm:py-12
            lg:px-14
            lg:py-14
          "
        >
          {/* =========================
              DECORATIVE BACKGROUND
          ========================== */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-24
              -top-28
              h-72
              w-72
              rounded-full
              bg-blue-200/50
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-28
              -left-20
              h-64
              w-64
              rounded-full
              bg-white/80
              blur-3xl
            "
          />

          {/* =========================
              CONTENT
          ========================== */}

          <div
            className="
              relative
              grid
              items-center
              gap-9
              lg:grid-cols-[1fr_auto]
              lg:gap-14
            "
          >
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white
                  bg-white/80
                  px-3.5
                  py-2
                  shadow-sm
                  backdrop-blur
                "
              >
                <MessageCircle
                  size={14}
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
                  Your Property Could Be Next
                </span>
              </div>

              {/* Heading */}
              <h2
                className="
                  mt-5
                  text-2xl
                  font-extrabold
                  leading-[1.1]
                  tracking-[-0.045em]
                  text-[#062B63]
                  sm:text-3xl
                  lg:text-4xl
                "
              >
                Like what you see?
                <br className="hidden sm:block" />
                {" "}Let's take care of your property.
              </h2>

              {/* Description */}
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
                Tell us what you're dealing with,
                where you're located and when you'd
                prefer the service. We'll take it from
                there.
              </p>

              {/* =========================
                  TRUST POINTS
              ========================== */}

              <div
                className="
                  mt-6
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
                      text-slate-600
                    "
                  >
                    Simple request process
                  </span>
                </div>

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
                      text-slate-600
                    "
                  >
                    Choose your preferred time
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
                      text-slate-600
                    "
                  >
                    Professional service
                  </span>
                </div>
              </div>
            </div>

            {/* =========================
                ACTIONS
            ========================== */}

            <div
              className="
                flex
                flex-col
                items-stretch
                gap-2
                sm:flex-row
                sm:items-center
                lg:flex-col
                lg:items-stretch
              "
            >
              <Link
                href="/quote"
                className="
                  group
                  inline-flex
                  min-h-13
                  min-w-[210px]
                  items-center
                  justify-center
                  gap-2.5
                  rounded-full
                  bg-[#0878E8]
                  px-7
                  text-sm
                  font-extrabold
                  text-white
                  shadow-[0_14px_32px_rgba(8,120,232,0.18)]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#066BCF]
                  hover:shadow-[0_18px_38px_rgba(8,120,232,0.22)]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#0878E8]
                  focus-visible:ring-offset-2
                "
              >
                Request a Free Quote

                <ArrowRight
                  size={16}
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
                  min-h-10
                  items-center
                  justify-center
                  gap-1.5
                  rounded-full
                  px-4
                  text-xs
                  font-bold
                  text-[#062B63]
                  transition-colors
                  hover:text-[#0878E8]
                "
              >
                Explore our services

                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}