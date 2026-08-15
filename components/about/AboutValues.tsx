import {
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Target,
} from "lucide-react";

const VALUES = [
  {
    icon: ShieldCheck,
    number: "01",
    title: "Responsibility",
    description:
      "We treat every property with care and take the service process seriously from the first conversation to completion.",
  },
  {
    icon: Target,
    number: "02",
    title: "Precision",
    description:
      "We focus on understanding the actual pest concern so the service is based on the situation, not assumptions.",
  },
  {
    icon: HeartHandshake,
    number: "03",
    title: "Trust",
    description:
      "Clear communication and honest recommendations should always be part of a professional service experience.",
  },
  {
    icon: Leaf,
    number: "04",
    title: "Care",
    description:
      "The goal is not simply to treat a problem, but to help customers feel more confident about their property.",
  },
];

export default function AboutValues() {
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
        {/* =========================
            HEADER
        ========================== */}

        <div
          className="
            grid
            gap-6
            lg:grid-cols-[0.8fr_1.2fr]
            lg:items-end
          "
        >
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.16em]
                text-[#0878E8]
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#0878E8]
                "
              />

              What we stand for
            </div>

            <h2
              className="
                mt-3
                text-3xl
                font-extrabold
                leading-[1.08]
                tracking-[-0.045em]
                text-[#062B63]
                sm:text-4xl
              "
            >
              The principles behind
              the service.
            </h2>
          </div>

          <p
            className="
              max-w-xl
              text-sm
              leading-7
              text-slate-500
              lg:ml-auto
            "
          >
            A professional service is built on
            more than what happens during a
            treatment. These principles shape
            how we approach the customer,
            property and problem.
          </p>
        </div>

        {/* =========================
            VALUE GRID
        ========================== */}

        <div
          className="
            mt-10
            grid
            gap-4
            md:grid-cols-2
          "
        >
          {VALUES.map(
            ({
              icon: Icon,
              number,
              title,
              description,
            }) => (
              <article
                key={number}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-slate-100
                  bg-white
                  p-6
                  shadow-[0_8px_30px_rgba(15,23,42,0.035)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_20px_50px_rgba(15,23,42,0.075)]
                  sm:p-7
                "
              >
                {/* Decorative number */}

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    right-6
                    top-5
                    text-5xl
                    font-black
                    tracking-[-0.06em]
                    text-slate-100
                    transition-colors
                    duration-300
                    group-hover:text-blue-50
                  "
                >
                  {number}
                </span>

                {/* Icon */}

                <div
                  className="
                    relative
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-50
                    text-[#0878E8]
                    transition-all
                    duration-300
                    group-hover:bg-[#0878E8]
                    group-hover:text-white
                  "
                >
                  <Icon size={21} />
                </div>

                {/* Content */}

                <div className="relative mt-7">
                  <h3
                    className="
                      text-xl
                      font-extrabold
                      tracking-[-0.03em]
                      text-[#062B63]
                    "
                  >
                    {title}
                  </h3>

                  <p
                    className="
                      mt-3
                      max-w-lg
                      text-sm
                      leading-7
                      text-slate-400
                    "
                  >
                    {description}
                  </p>
                </div>

                {/* Bottom accent */}

                <div
                  className="
                    relative
                    mt-7
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      h-1
                      w-6
                      rounded-full
                      bg-[#0878E8]
                      transition-all
                      duration-300
                      group-hover:w-10
                    "
                  />

                  <span
                    className="
                      text-[9px]
                      font-extrabold
                      uppercase
                      tracking-[0.13em]
                      text-slate-300
                    "
                  >
                    Core value
                  </span>
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}