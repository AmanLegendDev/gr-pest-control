import {
  Award,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

interface TestimonialStatsProps {
  testimonialCount: number;
  averageRating: number;
  fiveStarCount: number;
}

export default function TestimonialStats({
  testimonialCount,
  averageRating,
  fiveStarCount,
}: TestimonialStatsProps) {
  const safeRating = Math.min(
    5,
    Math.max(
      0,
      Number.isFinite(
        averageRating,
      )
        ? averageRating
        : 0,
    ),
  );

  const fiveStarPercentage =
    testimonialCount > 0
      ? Math.round(
          (fiveStarCount /
            testimonialCount) *
            100,
        )
      : 0;

  const stats = [
    {
      icon: Star,
      value: safeRating.toFixed(1),
      label: "Average rating",
      description:
        "Across all published reviews",
      iconClass:
        "bg-amber-50 text-amber-500",
    },
    {
      icon: Users,
      value: String(
        testimonialCount,
      ),
      label: "Customer stories",
      description:
        "Real experiences shared",
      iconClass:
        "bg-blue-50 text-[#0878E8]",
    },
    {
      icon: Award,
      value: `${fiveStarPercentage}%`,
      label: "Five-star reviews",
      description:
        "Rated five out of five",
      iconClass:
        "bg-emerald-50 text-emerald-500",
    },
    {
      icon: ShieldCheck,
      value: "100%",
      label: "Customer focused",
      description:
        "Professional service mindset",
      iconClass:
        "bg-violet-50 text-violet-500",
    },
  ];

  return (
    <section
      className="
        bg-white
        px-4
        py-10
        sm:px-6
        sm:py-14
        lg:px-8
        lg:py-16
      "
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="
            grid
            overflow-hidden
            rounded-[28px]
            border
            border-slate-100
            bg-white
            shadow-[0_10px_35px_rgba(15,23,42,0.035)]
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {stats.map(
            (stat, index) => {
              const Icon =
                stat.icon;

              return (
                <div
                  key={stat.label}
                  className={`
                    group
                    relative
                    px-5
                    py-6
                    transition-colors
                    duration-300
                    hover:bg-[#F8FAFC]
                    sm:px-6
                    sm:py-7
                    ${
                      index !==
                      stats.length - 1
                        ? "border-b border-slate-100 sm:border-r lg:border-b-0"
                        : ""
                    }
                    ${
                      index === 1
                        ? "sm:border-r-0 lg:border-r"
                        : ""
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
                    <div
                      className={`
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        transition-transform
                        duration-300
                        group-hover:scale-105
                        ${stat.iconClass}
                      `}
                    >
                      <Icon
                        size={18}
                        {...(
                          stat.icon ===
                          Star
                            ? {
                                fill:
                                  "currentColor",
                              }
                            : {}
                        )}
                      />
                    </div>

                    <span
                      className="
                        text-[9px]
                        font-extrabold
                        uppercase
                        tracking-[0.1em]
                        text-slate-300
                      "
                    >
                      0{index + 1}
                    </span>
                  </div>

                  <div className="mt-5">
                    <p
                      className="
                        text-2xl
                        font-extrabold
                        tracking-[-0.04em]
                        text-[#062B63]
                      "
                    >
                      {stat.value}
                    </p>

                    <h3
                      className="
                        mt-1
                        text-xs
                        font-extrabold
                        text-[#062B63]
                      "
                    >
                      {stat.label}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-[10px]
                        leading-5
                        text-slate-400
                      "
                    >
                      {
                        stat.description
                      }
                    </p>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}