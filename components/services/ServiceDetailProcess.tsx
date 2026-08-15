import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  ShieldCheck,
} from "lucide-react";

interface ProcessStep {
  title: string;
  description: string;
  sortOrder: number;
}

interface ServiceDetailProcessProps {
  process: ProcessStep[];
}

export default function ServiceDetailProcess({
  process,
}: ServiceDetailProcessProps) {
  const steps = [...process].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  if (steps.length === 0) {
    return null;
  }

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
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="
              text-[10px]
              font-extrabold
              uppercase
              tracking-[0.16em]
              text-[#0878E8]
            "
          >
            How it works
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
            A straightforward process
            from start to finish.
          </h2>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-slate-500
              sm:text-base
              sm:leading-7
            "
          >
            We keep the process simple so you
            know what happens at every stage.
          </p>
        </div>

        {/* Process */}
        <div className="mt-10">
          {steps.map((step, index) => {
            const isLast =
              index === steps.length - 1;

            return (
              <div
                key={`${step.sortOrder}-${step.title}`}
                className="relative"
              >
                {/* Connecting line */}
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      left-[23px]
                      top-14
                      h-[calc(100%-28px)]
                      w-px
                      bg-blue-100
                    "
                  />
                )}

                <div
                  className="
                    relative
                    flex
                    gap-4
                    sm:gap-6
                  "
                >
                  {/* Number */}
                  <div
                    className="
                      relative
                      z-10
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-blue-100
                      bg-white
                      text-sm
                      font-extrabold
                      text-[#0878E8]
                      shadow-sm
                    "
                  >
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={`
                      min-w-0
                      flex-1
                      rounded-[24px]
                      border
                      border-slate-200
                      bg-white
                      p-5
                      shadow-sm
                      sm:p-6
                      ${
                        isLast
                          ? "mb-0"
                          : "mb-5"
                      }
                    `}
                  >
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >
                      <div className="min-w-0">
                        <p
                          className="
                            text-[10px]
                            font-extrabold
                            uppercase
                            tracking-[0.13em]
                            text-slate-400
                          "
                        >
                          Step {index + 1}
                        </p>

                        <h3
                          className="
                            mt-1.5
                            text-base
                            font-extrabold
                            text-[#062B63]
                            sm:text-lg
                          "
                        >
                          {step.title}
                        </h3>
                      </div>

                      <div
                        className="
                          hidden
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-blue-50
                          text-[#0878E8]
                          sm:flex
                        "
                      >
                        {isLast ? (
                          <CheckCircle2
                            size={17}
                          />
                        ) : (
                          <ArrowRight
                            size={17}
                          />
                        )}
                      </div>
                    </div>

                    <p
                      className="
                        mt-3
                        text-sm
                        leading-6
                        text-slate-500
                      "
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom reassurance */}
        <div
          className="
            mt-8
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-emerald-100
            bg-emerald-50/60
            p-4
            sm:p-5
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-white
              text-emerald-600
              shadow-sm
            "
          >
            <ShieldCheck size={18} />
          </div>

          <div>
            <p
              className="
                text-xs
                font-extrabold
                text-[#062B63]
              "
            >
              Clear, professional service
            </p>

            <p
              className="
                mt-1
                text-[11px]
                leading-5
                text-slate-500
              "
            >
              Every service follows a structured
              process designed around the needs of
              your property.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}