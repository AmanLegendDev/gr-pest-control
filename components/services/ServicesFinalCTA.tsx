import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Phone,
} from "lucide-react";

export default function ServicesFinalCTA() {
  return (
    <section
      className="
        bg-white
        px-4
        pb-20
        pt-8
        sm:px-6
        sm:pb-24
        sm:pt-12
        lg:px-8
        lg:pb-28
        lg:pt-16
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
            py-12
            shadow-[0_25px_70px_rgba(6,43,99,0.16)]
            sm:px-10
            sm:py-14
            lg:px-16
            lg:py-16
          "
        >
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-24
              -top-28
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
            {/* Content */}
            <div className="max-w-2xl">
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
                <ShieldCheck
                  size={14}
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
                  Get started today
                </span>
              </div>

              <h2
                className="
                  mt-5
                  text-3xl
                  font-extrabold
                  leading-tight
                  tracking-[-0.04em]
                  text-white
                  sm:text-4xl
                  lg:text-[2.7rem]
                  lg:leading-[1.08]
                "
              >
                Ready to deal with
                the pest problem?
              </h2>

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
                Tell us what you’re dealing with,
                where you need help and when you’d
                prefer service. We’ll review your
                request and get in touch with you.
              </p>

              {/* Trust points */}
              <div
                className="
                  mt-6
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                  sm:flex-wrap
                  sm:gap-x-6
                "
              >
                <div className="flex items-center gap-2">
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
                    Free quote request
                  </span>
                </div>

                <div className="flex items-center gap-2">
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
                    Simple online process
                  </span>
                </div>

                <div className="flex items-center gap-2">
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
                    No obligation to book
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div
              className="
                flex
                w-full
                flex-col
                gap-3
                sm:w-auto
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
                "
              >
                Get a Free Quote

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

              <a
                href="tel:+61000000000"
                className="
                  inline-flex
                  min-h-12
                  min-w-[210px]
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  border-white/15
                  bg-white/5
                  px-6
                  text-sm
                  font-bold
                  text-white
                  backdrop-blur-sm
                  transition
                  hover:bg-white/10
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white/50
                "
              >
                <Phone size={15} />

                Call our team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}