import {
  ArrowUpRight,
  Camera,
  Sparkles,
} from "lucide-react";

import Image from "next/image";

interface GalleryDetailHeroProps {
  title: string;
  description: string;
  category: string;
  image: {
    url: string;
    alt: string;
  };
}

const CATEGORY_LABELS: Record<
  string,
  string
> = {
  home: "Home",
  workplace: "Workplace",
  commercial: "Commercial",
  residential: "Residential",
  treatment: "Treatment",
  team: "Our Team",
  other: "Other",
};

export default function GalleryDetailHero({
  title,
  description,
  category,
  image,
}: GalleryDetailHeroProps) {
  const categoryLabel =
    CATEGORY_LABELS[
      category.toLowerCase()
    ] ?? category;

  return (
    <section
      className="
        bg-[#F8FAFC]
        px-4
        pb-14
        pt-6
        sm:px-6
        sm:pb-20
        sm:pt-8
        lg:px-8
        lg:pb-24
        lg:pt-10
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* =========================
            IMAGE FRAME
        ========================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[28px]
            bg-slate-100
            shadow-[0_25px_80px_rgba(15,23,42,0.10)]
            sm:rounded-[34px]
            lg:rounded-[40px]
          "
        >
          <div
            className="
              relative
              aspect-[16/10]
              min-h-[340px]
              w-full
              sm:aspect-[16/9]
              sm:min-h-[450px]
              lg:min-h-[560px]
            "
          >
        <Image
  src={image.url}
  alt={image.alt || title}
  fill
  priority
  sizes="100vw"
  className="
    object-cover
  "
/>

            {/* Image overlay */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#031A38]/90
                via-[#031A38]/20
                to-transparent
              "
            />

            {/* =========================
                TOP BADGES
            ========================== */}

            <div
              className="
                absolute
                left-5
                top-5
                flex
                items-center
                gap-2
                sm:left-7
                sm:top-7
              "
            >
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/15
                  bg-black/20
                  px-3.5
                  py-2
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-[0.14em]
                  text-white
                  backdrop-blur-md
                "
              >
                <Camera size={12} />

                {categoryLabel}
              </span>

              <span
                className="
                  hidden
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-white/15
                  bg-black/20
                  px-3.5
                  py-2
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-[0.14em]
                  text-white/80
                  backdrop-blur-md
                  sm:inline-flex
                "
              >
                <Sparkles size={11} />

                Our Work
              </span>
            </div>

            {/* =========================
                VIEW IMAGE AFFORDANCE
            ========================== */}

            <div
              className="
                absolute
                right-5
                top-5
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-white/15
                bg-black/20
                text-white
                backdrop-blur-md
                sm:right-7
                sm:top-7
                sm:h-11
                sm:w-11
              "
              aria-hidden="true"
            >
              <ArrowUpRight size={17} />
            </div>

            {/* =========================
                TEXT
            ========================== */}

            <div
              className="
                absolute
                inset-x-0
                bottom-0
                px-5
                pb-6
                sm:px-8
                sm:pb-9
                lg:px-12
                lg:pb-11
              "
            >
              <div className="max-w-4xl">
                <p
                  className="
                    mb-2
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-[0.16em]
                    text-blue-200
                  "
                >
                  GR Pest Control
                </p>

                <h1
                  className="
                    max-w-4xl
                    text-3xl
                    font-extrabold
                    leading-[1.05]
                    tracking-[-0.045em]
                    text-white
                    sm:text-4xl
                    lg:text-5xl
                    xl:text-[3.5rem]
                  "
                >
                  {title}
                </h1>

                <p
                  className="
                    mt-3
                    max-w-2xl
                    text-sm
                    leading-6
                    text-white/70
                    sm:text-base
                    sm:leading-7
                  "
                >
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            SMALL INFO STRIP
        ========================== */}

        <div
          className="
            mt-4
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
            px-1
            sm:mt-5
            sm:px-2
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-emerald-400
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.1em]
                text-slate-400
              "
            >
              Professional pest control work
            </span>
          </div>

          <span
            className="
              text-[10px]
              font-semibold
              text-slate-300
            "
          >
            {categoryLabel}
          </span>
        </div>
      </div>
    </section>
  );
}