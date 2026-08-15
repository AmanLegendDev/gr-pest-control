import Link from "next/link";
import {
  ArrowRight,
  HelpCircle,
  MapPin,
  MessageCircle,
} from "lucide-react";

export default function ServiceAreasHelpCTA() {
  return (
    <section
      className="
        bg-white
        px-4
        py-14
        sm:px-6
        sm:py-18
        lg:px-8
        lg:py-20
      "
    >
      <div className="mx-auto max-w-5xl">
        <div
          className="
            relative
            overflow-hidden
            rounded-[30px]
            border
            border-blue-100
            bg-[#EEF6FF]
            px-6
            py-8
            sm:px-8
            sm:py-10
            lg:px-10
          "
        >
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-56
              w-56
              rounded-full
              bg-blue-200/40
              blur-3xl
            "
          />

          <div
            className="
              relative
              grid
              items-center
              gap-7
              lg:grid-cols-[1fr_auto]
              lg:gap-12
            "
          >
            {/* Content */}
            <div className="flex gap-4">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white
                  text-[#0878E8]
                  shadow-sm
                "
              >
                <HelpCircle
                  size={21}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <p
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.15em]
                    text-[#0878E8]
                  "
                >
                  Can't find your area?
                </p>

                <h2
                  className="
                    mt-1.5
                    text-xl
                    font-extrabold
                    tracking-[-0.03em]
                    text-[#062B63]
                    sm:text-2xl
                  "
                >
                  Your location isn't listed?
                </h2>

                <p
                  className="
                    mt-2
                    max-w-xl
                    text-sm
                    leading-6
                    text-slate-500
                  "
                >
                  Coverage can change depending on
                  the location and service required.
                  Send us your details and our team
                  can check whether we can help.
                </p>

                <div
                  className="
                    mt-4
                    flex
                    flex-wrap
                    gap-x-5
                    gap-y-2
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-1.5
                      text-[11px]
                      font-bold
                      text-slate-500
                    "
                  >
                    <MapPin
                      size={14}
                      className="text-[#0878E8]"
                    />

                    Tell us your location
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-1.5
                      text-[11px]
                      font-bold
                      text-slate-500
                    "
                  >
                    <MessageCircle
                      size={14}
                      className="text-[#0878E8]"
                    />

                    We'll guide you
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="shrink-0">
              <Link
                href="/quote"
                className="
                  group
                  inline-flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[#0878E8]
                  px-6
                  text-sm
                  font-extrabold
                  text-white
                  shadow-[0_10px_25px_rgba(8,120,232,0.18)]
                  transition-all
                  duration-200
                  hover:bg-[#066BCF]
                  hover:shadow-[0_14px_30px_rgba(8,120,232,0.22)]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#0878E8]
                  focus-visible:ring-offset-2
                  lg:w-auto
                "
              >
                Check Availability

                <ArrowRight
                  size={16}
                  className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                  "
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}