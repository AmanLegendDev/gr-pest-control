import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

export default function BlogHelpCTA() {
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
            rounded-[30px]
            border
            border-blue-100
            bg-[#EEF6FF]
            px-6
            py-9
            sm:px-10
            sm:py-11
            lg:px-14
            lg:py-12
          "
        >
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-20
              -top-24
              h-64
              w-64
              rounded-full
              bg-blue-200/40
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
              h-56
              w-56
              rounded-full
              bg-white/70
              blur-3xl
            "
          />

          <div
            className="
              relative
              grid
              items-center
              gap-8
              lg:grid-cols-[1fr_auto]
              lg:gap-12
            "
          >
            {/* =========================
                CONTENT
            ========================== */}

            <div className="max-w-2xl">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white
                  bg-white/80
                  px-3
                  py-1.5
                  shadow-sm
                "
              >
                <MessageCircle
                  size={13}
                  className="text-[#0878E8]"
                />

                <span
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.14em]
                    text-[#0878E8]
                  "
                >
                  Need Personal Advice?
                </span>
              </div>

              <h2
                className="
                  mt-4
                  text-2xl
                  font-extrabold
                  leading-[1.12]
                  tracking-[-0.04em]
                  text-[#062B63]
                  sm:text-3xl
                "
              >
                Still dealing with a pest
                problem?
              </h2>

              <p
                className="
                  mt-3
                  max-w-xl
                  text-sm
                  leading-6
                  text-slate-500
                  sm:text-base
                  sm:leading-7
                "
              >
                Articles can help you understand
                the problem, but every property is
                different. Tell us what you're
                dealing with and request a free
                quote from our team.
              </p>

              {/* Trust points */}
              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  gap-x-5
                  gap-y-2.5
                "
              >
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

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <ShieldCheck
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
                    Local coverage
                  </span>
                </div>
              </div>
            </div>

            {/* =========================
                CTA
            ========================== */}

            <div
              className="
                flex
                flex-col
                items-start
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
                  min-h-12
                  min-w-[190px]
                  items-center
                  justify-center
                  gap-2.5
                  rounded-full
                  bg-[#0878E8]
                  px-6
                  text-sm
                  font-extrabold
                  text-white
                  shadow-[0_12px_28px_rgba(8,120,232,0.18)]
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
                Get a Free Quote

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
                  transition
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