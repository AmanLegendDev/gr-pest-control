import {
  ArrowUpRight,
  Images,
  Sparkles,
} from "lucide-react";

interface FeaturedGalleryItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  image: {
    url: string;
    alt: string;
  };
  featured: boolean;
}

interface FeaturedGalleryProps {
  items: FeaturedGalleryItem[];
  onOpen: (index: number) => void;
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

export default function FeaturedGallery({
  items,
  onOpen,
}: FeaturedGalleryProps) {
  const featuredItems = items
    .filter((item) => item.featured)
    .slice(0, 3);

  if (featuredItems.length === 0) {
    return null;
  }

  return (
    <section
      className="
        bg-white
        px-4
        py-14
        sm:px-6
        sm:py-20
        lg:px-8
        lg:py-24
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* =========================
            SECTION HEADER
        ========================== */}

        <div
          className="
            mb-8
            flex
            flex-col
            gap-4
            sm:mb-10
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
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
              Featured Work
            </div>

            <h2
              className="
                mt-2
                text-2xl
                font-extrabold
                tracking-[-0.045em]
                text-[#062B63]
                sm:text-3xl
                lg:text-4xl
              "
            >
              A closer look at our work
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
              Explore selected moments from our
              work, treatments and team.
            </p>
          </div>

          <div
            className="
              hidden
              items-center
              gap-2
              text-xs
              font-bold
              text-slate-400
              sm:flex
            "
          >
            <Images size={14} />
            Tap any image to explore
          </div>
        </div>

        {/* =========================
            CINEMATIC GRID
        ========================== */}

        <div
          className="
            grid
            gap-4
            lg:grid-cols-[1.35fr_0.65fr]
          "
        >
          {/* =========================
              FEATURED HERO
          ========================== */}

          {featuredItems[0] && (
            <button
              type="button"
              onClick={() => onOpen(0)}
              className="
                group
                relative
                min-h-[390px]
                overflow-hidden
                rounded-[28px]
                bg-slate-100
                text-left
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#0878E8]
                focus-visible:ring-offset-4
                sm:min-h-[500px]
                lg:min-h-[570px]
              "
            >
              <img
                src={
                  featuredItems[0].image.url
                }
                alt={
                  featuredItems[0].image.alt ||
                  featuredItems[0].title
                }
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-[1.035]
                "
              />

              {/* Overlay */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#041B3D]/85
                  via-[#041B3D]/10
                  to-transparent
                "
              />

              {/* Top badge */}
              <div
                className="
                  absolute
                  left-5
                  top-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/20
                  bg-black/20
                  px-3.5
                  py-2
                  backdrop-blur-md
                "
              >
                <Sparkles
                  size={13}
                  className="text-white"
                />

                <span
                  className="
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-[0.14em]
                    text-white
                  "
                >
                  Featured
                </span>
              </div>

              {/* Open icon */}
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
                  border-white/20
                  bg-black/20
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-300
                  group-hover:scale-110
                  group-hover:bg-white
                  group-hover:text-[#062B63]
                "
              >
                <ArrowUpRight size={17} />
              </div>

              {/* Content */}
              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  p-6
                  sm:p-8
                "
              >
                <span
                  className="
                    inline-flex
                    rounded-full
                    bg-white/15
                    px-3
                    py-1.5
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-[0.12em]
                    text-white
                    backdrop-blur-md
                  "
                >
                  {CATEGORY_LABELS[
                    featuredItems[0]
                      .category
                  ] ??
                    featuredItems[0]
                      .category}
                </span>

                <h3
                  className="
                    mt-3
                    max-w-2xl
                    text-2xl
                    font-extrabold
                    leading-tight
                    tracking-[-0.035em]
                    text-white
                    sm:text-3xl
                  "
                >
                  {featuredItems[0].title}
                </h3>

                <p
                  className="
                    mt-2
                    max-w-xl
                    line-clamp-2
                    text-sm
                    leading-6
                    text-white/70
                  "
                >
                  {
                    featuredItems[0]
                      .description
                  }
                </p>
              </div>
            </button>
          )}

          {/* =========================
              SUPPORTING IMAGES
          ========================== */}

          <div
            className="
              grid
              gap-4
              sm:grid-cols-2
              lg:grid-cols-1
            "
          >
            {featuredItems
              .slice(1, 3)
              .map((item, index) => {
                const viewerIndex =
                  index + 1;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      onOpen(
                        viewerIndex,
                      )
                    }
                    className="
                      group
                      relative
                      min-h-[250px]
                      overflow-hidden
                      rounded-[24px]
                      bg-slate-100
                      text-left
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#0878E8]
                      focus-visible:ring-offset-4
                      sm:min-h-[300px]
                      lg:min-h-0
                    "
                  >
                    <img
                      src={item.image.url}
                      alt={
                        item.image.alt ||
                        item.title
                      }
                      className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.04]
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#041B3D]/75
                        via-transparent
                        to-transparent
                      "
                    />

                    {/* Arrow */}
                    <div
                      className="
                        absolute
                        right-4
                        top-4
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-black/20
                        text-white
                        backdrop-blur-md
                        transition-all
                        group-hover:bg-white
                        group-hover:text-[#062B63]
                      "
                    >
                      <ArrowUpRight
                        size={15}
                      />
                    </div>

                    {/* Content */}
                    <div
                      className="
                        absolute
                        inset-x-0
                        bottom-0
                        p-5
                      "
                    >
                      <span
                        className="
                          text-[9px]
                          font-extrabold
                          uppercase
                          tracking-[0.12em]
                          text-blue-100
                        "
                      >
                        {
                          CATEGORY_LABELS[
                            item.category
                          ] ??
                            item.category
                        }
                      </span>

                      <h3
                        className="
                          mt-1.5
                          line-clamp-2
                          text-lg
                          font-extrabold
                          leading-tight
                          text-white
                        "
                      >
                        {item.title}
                      </h3>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}