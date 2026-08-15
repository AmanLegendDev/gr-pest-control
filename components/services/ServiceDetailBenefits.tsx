import {
  CheckCircle2,
  Bug,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface ServiceDetailBenefitsProps {
  pestTypes: string[];
  benefits: string[];
}

export default function ServiceDetailBenefits({
  pestTypes,
  benefits,
}: ServiceDetailBenefitsProps) {
  return (
    <section
      className="
        bg-white
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
            grid
            gap-6
            lg:grid-cols-[0.85fr_1.15fr]
            lg:gap-8
          "
        >
          {/* =========================
              PEST TYPES
          ========================== */}

          <div
            className="
              rounded-[28px]
              border
              border-slate-200
              bg-[#F8FAFC]
              p-6
              sm:p-8
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                bg-white
                text-[#0878E8]
                shadow-sm
              "
            >
              <Bug
                size={21}
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
              What we treat
            </p>

            <h2
              className="
                mt-2
                text-xl
                font-extrabold
                tracking-[-0.035em]
                text-[#062B63]
                sm:text-2xl
              "
            >
              Problems this service
              can help with.
            </h2>

            <p
              className="
                mt-3
                text-sm
                leading-6
                text-slate-500
              "
            >
              This service is designed to
              address the following pest
              problems.
            </p>

            {pestTypes.length > 0 ? (
              <div className="mt-6 space-y-2.5">
                {pestTypes.map(
                  (pest) => (
                    <div
                      key={pest}
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-3.5
                        py-3
                      "
                    >
                      <span
                        className="
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-blue-50
                          text-[#0878E8]
                        "
                      >
                        <CheckCircle2
                          size={15}
                        />
                      </span>

                      <span
                        className="
                          text-sm
                          font-semibold
                          text-[#062B63]
                        "
                      >
                        {pest}
                      </span>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <div
                className="
                  mt-6
                  rounded-xl
                  border
                  border-dashed
                  border-slate-200
                  bg-white
                  p-4
                  text-sm
                  text-slate-500
                "
              >
                Contact our team to discuss
                the pest problem at your
                property.
              </div>
            )}
          </div>

          {/* =========================
              BENEFITS
          ========================== */}

          <div
            className="
              rounded-[28px]
              border
              border-blue-100
              bg-[#EEF6FF]
              p-6
              sm:p-8
            "
          >
            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >
              <div>
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white
                    text-[#0878E8]
                    shadow-sm
                  "
                >
                  <Sparkles
                    size={21}
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
                  Why this service
                </p>

                <h2
                  className="
                    mt-2
                    text-xl
                    font-extrabold
                    tracking-[-0.035em]
                    text-[#062B63]
                    sm:text-2xl
                  "
                >
                  Built around the problem,
                  not a one-size-fits-all
                  approach.
                </h2>
              </div>

              <ShieldCheck
                size={24}
                className="
                  hidden
                  shrink-0
                  text-[#0878E8]/40
                  sm:block
                "
              />
            </div>

            {benefits.length > 0 ? (
              <div
                className="
                  mt-7
                  grid
                  gap-3
                  sm:grid-cols-2
                "
              >
                {benefits.map(
                  (benefit) => (
                    <div
                      key={benefit}
                      className="
                        rounded-2xl
                        border
                        border-white
                        bg-white/80
                        p-4
                        shadow-sm
                      "
                    >
                      <div
                        className="
                          flex
                          items-start
                          gap-3
                        "
                      >
                        <div
                          className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-emerald-50
                            text-emerald-600
                          "
                        >
                          <CheckCircle2
                            size={16}
                          />
                        </div>

                        <p
                          className="
                            pt-1
                            text-sm
                            font-semibold
                            leading-6
                            text-[#062B63]
                          "
                        >
                          {benefit}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <div
                className="
                  mt-7
                  rounded-2xl
                  border
                  border-white
                  bg-white/80
                  p-5
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Our team will assess your
                property and recommend the
                appropriate treatment for your
                situation.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}