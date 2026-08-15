import {
  CheckCircle2,
  ClipboardCheck,
  Headphones,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface AboutTrustProps {
  businessName: string;
}

const TRUST_ITEMS = [
  {
    icon: ClipboardCheck,
    title: "Clear process",
    description:
      "A straightforward service journey from understanding the issue to planning the right treatment.",
  },
  {
    icon: ShieldCheck,
    title: "Property focused",
    description:
      "Every pest problem is considered in the context of the property, not treated as a one-size-fits-all job.",
  },
  {
    icon: CheckCircle2,
    title: "Practical solutions",
    description:
      "The focus stays on solving the actual pest problem with a service that makes sense for the situation.",
  },
  {
    icon: Headphones,
    title: "Easy communication",
    description:
      "Clear conversations make it easier to explain the issue, choose a service and arrange a suitable time.",
  },
];

export default function AboutTrust({
  businessName,
}: AboutTrustProps) {
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
            mx-auto
            max-w-2xl
            text-center
          "
        >
          <div
            className="
              inline-flex
              items-center
              gap-1.5
              text-[10px]
              font-extrabold
              uppercase
              tracking-[0.16em]
              text-[#0878E8]
            "
          >
            <Sparkles size={12} />

            Why choose us
          </div>

          <h2
            className="
              mt-3
              text-3xl
              font-extrabold
              leading-tight
              tracking-[-0.045em]
              text-[#062B63]
              sm:text-4xl
            "
          >
            What makes the
            service experience different?
          </h2>

          <p
            className="
              mt-4
              text-sm
              leading-7
              text-slate-500
              sm:text-base
            "
          >
            {businessName} keeps the focus on
            the things that matter to a property
            owner: clarity, a sensible process and
            professional service.
          </p>
        </div>

        {/* =========================
            TRUST GRID
        ========================== */}

        <div
          className="
            mt-10
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
            lg:gap-5
          "
        >
          {TRUST_ITEMS.map(
            ({
              icon: Icon,
              title,
              description,
            }) => (
              <div
                key={title}
                className="
                  group
                  rounded-[26px]
                  border
                  border-slate-100
                  bg-white
                  p-5
                  shadow-[0_8px_30px_rgba(15,23,42,0.035)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_18px_45px_rgba(15,23,42,0.07)]
                  sm:p-6
                "
              >
                {/* Icon */}

                <div
                  className="
                    flex
                    h-11
                    w-11
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
                  <Icon size={20} />
                </div>

                {/* Content */}

                <h3
                  className="
                    mt-5
                    text-base
                    font-extrabold
                    tracking-[-0.02em]
                    text-[#062B63]
                  "
                >
                  {title}
                </h3>

                <p
                  className="
                    mt-2
                    text-xs
                    leading-6
                    text-slate-400
                  "
                >
                  {description}
                </p>

                {/* Bottom indicator */}

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      h-1
                      w-5
                      rounded-full
                      bg-[#0878E8]
                      transition-all
                      duration-300
                      group-hover:w-8
                    "
                  />

                  <span
                    className="
                      text-[9px]
                      font-extrabold
                      uppercase
                      tracking-[0.12em]
                      text-slate-300
                    "
                  >
                    Our standard
                  </span>
                </div>
              </div>
            ),
          )}
        </div>

        {/* =========================
            BOTTOM STATEMENT
        ========================== */}

        <div
          className="
            mt-5
            overflow-hidden
            rounded-[26px]
            bg-[#062B63]
            px-6
            py-7
            sm:px-8
            sm:py-8
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <p
                className="
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-[0.16em]
                  text-blue-200
                "
              >
                The standard we aim for
              </p>

              <p
                className="
                  mt-2
                  max-w-2xl
                  text-lg
                  font-extrabold
                  leading-tight
                  tracking-[-0.025em]
                  text-white
                  sm:text-xl
                "
              >
                Make the pest control process
                easier to understand, easier to
                arrange and easier to trust.
              </p>
            </div>

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-white/10
                text-blue-100
              "
            >
              <ShieldCheck size={22} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}