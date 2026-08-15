import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  ShieldQuestion,
} from "lucide-react";

export default function ServicesHelpCTA() {
  return (
    <section
      className="
        bg-[#F8FAFC]
        px-4
        py-16
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
            bg-white
            shadow-[0_18px_55px_rgba(15,23,42,0.06)]
          "
        >
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-72
              w-72
              rounded-full
              bg-blue-50
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
              h-64
              w-64
              rounded-full
              bg-slate-100
              blur-3xl
            "
          />

          <div
            className="
              relative
              grid
              gap-8
              p-6
              sm:p-8
              lg:grid-cols-[1fr_auto]
              lg:items-center
              lg:gap-12
              lg:p-10
            "
          >
            {/* Content */}
            <div className="max-w-2xl">
              <div
                className="
                  inline-flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-blue-50
                  text-[#0878E8]
                "
              >
                <ShieldQuestion
                  size={22}
                  strokeWidth={1.8}
                />
              </div>

              <p
                className="
                  mt-5
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.16em]
                  text-[#0878E8]
                "
              >
                Not sure what you need?
              </p>

              <h2
                className="
                  mt-2
                  text-2xl
                  font-extrabold
                  tracking-[-0.035em]
                  text-[#062B63]
                  sm:text-3xl
                "
              >
                Tell us what’s happening.
                We’ll help you find the right
                solution.
              </h2>

              <p
                className="
                  mt-3
                  max-w-xl
                  text-sm
                  leading-7
                  text-slate-500
                  sm:text-base
                "
              >
                You don’t need to know the exact
                pest or treatment before getting
                started. Share a few details about
                the problem and our team can guide
                you from there.
              </p>

              {/* Reassurance */}
              <div
                className="
                  mt-5
                  flex
                  flex-col
                  gap-2.5
                  sm:flex-row
                  sm:flex-wrap
                  sm:gap-x-5
                  sm:gap-y-2.5
                "
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-emerald-500"
                  />

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-slate-600
                    "
                  >
                    No need to identify the pest
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-emerald-500"
                  />

                  <span
                    className="
                      text-xs
                      font-semibold
                      text-slate-600
                    "
                  >
                    Simple quote process
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
                sm:flex-row
                lg:w-auto
                lg:flex-col
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
                Get a Free Quote

                <ArrowRight
                  size={15}
                  className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                  "
                />
              </Link>

              <a
                href="tel:+61000000000"
                className="
                  inline-flex
                  min-h-12
                  min-w-[190px]
                  items-center
                  justify-center
                  gap-2
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
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-blue-200
                  focus-visible:ring-offset-2
                "
              >
                <MessageCircle
                  size={16}
                />

                Talk to our team
              </a>

              <p
                className="
                  text-center
                  text-[10px]
                  leading-5
                  text-slate-400
                  lg:text-right
                "
              >
                We’ll help you choose the
                appropriate next step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}