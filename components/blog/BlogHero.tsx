import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Search,
  ShieldCheck,
} from "lucide-react";

interface BlogHeroProps {
  postCount: number;
  categories: string[];
}

export default function BlogHero({
  postCount,
  categories,
}: BlogHeroProps) {
  return (
   <section
  className="
    overflow-hidden
    bg-[#F8FAFC]
    px-4
    pb-14
    pt-26
    sm:px-6
    sm:pb-18
    sm:pt-26
    lg:px-8
    lg:pb-20
    lg:pt-26
  "
>
      <div
        className="
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-10
          lg:grid-cols-[1.05fr_0.95fr]
          lg:gap-16
        "
      >
        {/* =========================
            LEFT CONTENT
        ========================== */}

        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-100
              bg-white
              px-3.5
              py-2
              shadow-sm
            "
          >
            <span
              className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-blue-50
                text-[#0878E8]
              "
            >
              <BookOpen size={12} />
            </span>

            <span
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.15em]
                text-[#0878E8]
              "
            >
              Pest Control Guide
            </span>
          </div>

          {/* Heading */}
          <h1
            className="
              mt-5
              max-w-2xl
              text-3xl
              font-extrabold
              leading-[1.08]
              tracking-[-0.045em]
              text-[#062B63]
              sm:text-4xl
              lg:text-5xl
            "
          >
            Practical advice for a
            <span className="text-[#0878E8]">
              {" "}pest-free property.
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-5
              max-w-xl
              text-base
              leading-7
              text-slate-500
              sm:text-lg
            "
          >
            Learn how to identify common pest
            problems, prevent infestations and
            make better decisions about protecting
            your home or business.
          </p>

          {/* Stats */}
          <div
            className="
              mt-6
              flex
              flex-wrap
              gap-x-6
              gap-y-3
            "
          >
            <div className="flex items-center gap-2">
              <CheckCircle2
                size={16}
                className="text-emerald-500"
              />

              <span
                className="
                  text-xs
                  font-bold
                  text-slate-600
                "
              >
                {postCount} published{" "}
                {postCount === 1
                  ? "article"
                  : "articles"}
              </span>
            </div>

            {categories.length > 0 && (
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={16}
                  className="text-[#0878E8]"
                />

                <span
                  className="
                    text-xs
                    font-bold
                    text-slate-600
                  "
                >
                  {categories.length}{" "}
                  {categories.length === 1
                    ? "topic"
                    : "topics"}
                </span>
              </div>
            )}
          </div>

          {/* CTA */}
          <div
            className="
              mt-8
              flex
              flex-col
              gap-3
              sm:flex-row
            "
          >
            <a
              href="#blog"
              className="
                group
                inline-flex
                min-h-12
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
              Explore articles

              <ArrowRight
                size={16}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-0.5
                "
              />
            </a>

            <Link
              href="/quote"
              className="
                inline-flex
                min-h-12
                items-center
                justify-center
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
              "
            >
              Get a Free Quote
            </Link>
          </div>
        </div>

        {/* =========================
            RIGHT VISUAL
        ========================== */}

        <div
          className="
            relative
            min-h-[320px]
            overflow-hidden
            rounded-[30px]
            border
            border-slate-200
            bg-white
            shadow-[0_20px_60px_rgba(15,23,42,0.08)]
            sm:min-h-[380px]
          "
        >
          {/* Background */}
          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              bg-[linear-gradient(135deg,#EEF6FF_0%,#F8FAFC_48%,#FFFFFF_100%)]
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              -right-20
              -top-20
              h-64
              w-64
              rounded-full
              bg-blue-100/60
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              -bottom-20
              -left-16
              h-56
              w-56
              rounded-full
              bg-slate-100
              blur-3xl
            "
          />

          {/* Article visual */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              w-[78%]
              max-w-[390px]
              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <div
              className="
                overflow-hidden
                rounded-[24px]
                border
                border-slate-200
                bg-white
                shadow-[0_20px_50px_rgba(15,23,42,0.10)]
              "
            >
              {/* Fake article header */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-slate-100
                  px-5
                  py-4
                "
              >
                <div className="flex items-center gap-2">
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-blue-50
                      text-[#0878E8]
                    "
                  >
                    <BookOpen size={15} />
                  </div>

                  <div>
                    <div className="h-2 w-20 rounded-full bg-slate-200" />
                    <div className="mt-1.5 h-1.5 w-12 rounded-full bg-slate-100" />
                  </div>
                </div>

                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-50
                    text-slate-400
                  "
                >
                  <Search size={14} />
                </div>
              </div>

              {/* Article body */}
              <div className="p-5">
                <div
                  className="
                    h-28
                    rounded-xl
                    bg-[linear-gradient(135deg,#DCEEFF,#F1F7FD)]
                  "
                />

                <div className="mt-5">
                  <div className="h-2.5 w-[82%] rounded-full bg-[#062B63]/10" />
                  <div className="mt-2 h-2.5 w-[65%] rounded-full bg-[#062B63]/10" />
                  <div className="mt-4 h-1.5 w-full rounded-full bg-slate-100" />
                  <div className="mt-2 h-1.5 w-[92%] rounded-full bg-slate-100" />
                  <div className="mt-2 h-1.5 w-[76%] rounded-full bg-slate-100" />
                </div>
              </div>

              {/* Article footer */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-t
                  border-slate-100
                  px-5
                  py-4
                "
              >
                <div className="flex items-center gap-2">
                  <div
                    className="
                      h-7
                      w-7
                      rounded-full
                      bg-[#062B63]
                    "
                  />

                  <div>
                    <div className="h-1.5 w-14 rounded-full bg-slate-200" />
                    <div className="mt-1 h-1.5 w-9 rounded-full bg-slate-100" />
                  </div>
                </div>

                <span
                  className="
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-wide
                    text-[#0878E8]
                  "
                >
                  Expert Guide
                </span>
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div
            className="
              absolute
              bottom-5
              left-5
              rounded-2xl
              border
              border-white/80
              bg-white/95
              px-4
              py-3
              shadow-lg
              backdrop-blur-sm
            "
          >
            <div className="flex items-center gap-2.5">
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  text-[#0878E8]
                "
              >
                <ShieldCheck size={15} />
              </div>

              <div>
                <p
                  className="
                    text-[11px]
                    font-extrabold
                    text-[#062B63]
                  "
                >
                  Helpful & practical
                </p>

                <p
                  className="
                    mt-0.5
                    text-[9px]
                    text-slate-400
                  "
                >
                  Pest control information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}