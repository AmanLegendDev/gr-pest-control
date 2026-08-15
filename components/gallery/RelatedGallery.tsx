import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Images,
} from "lucide-react";

interface RelatedGalleryItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  image: {
    url: string;
    alt: string;
  };
}

interface RelatedGalleryProps {
  items: RelatedGalleryItem[];
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

export default function RelatedGallery({
  items,
}: RelatedGalleryProps) {
  if (items.length === 0) {
    return null;
  }

  const visibleItems =
    items.slice(0, 3);

  return (
    <section
      className="
        bg-[#F8FAFC]
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
            HEADER
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
              <Images size={12} />

              More from the gallery
            </div>

            <h2
              className="
                mt-2
                text-2xl
                font-extrabold
                tracking-[-0.045em]
                text-[#062B63]
                sm:text-3xl
              "
            >
              More work worth seeing
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
              Explore more of our work and
              the different properties we
              help protect.
            </p>
          </div>

          <Link
            href="/gallery"
            className="
              group
              inline-flex
              shrink-0
              items-center
              gap-2
              text-xs
              font-extrabold
              text-[#062B63]
              transition-colors
              hover:text-[#0878E8]
            "
          >
            View all gallery

            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-white
                text-slate-400
                shadow-sm
                transition-all
                group-hover:bg-blue-50
                group-hover:text-[#0878E8]
              "
            >
              <ArrowRight size={13} />
            </span>
          </Link>
        </div>

        {/* =========================
            RELATED GRID
        ========================== */}

        <div
          className="
            grid
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {visibleItems.map(
            (item) => (
              <Link
                key={item.id}
                href={`/gallery/${item.slug}`}
                className="
                  group
                  overflow-hidden
                  rounded-[26px]
                  border
                  border-slate-100
                  bg-white
                  shadow-[0_10px_35px_rgba(15,23,42,0.04)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_20px_50px_rgba(15,23,42,0.09)]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#0878E8]
                  focus-visible:ring-offset-4
                "
              >
                {/* Image */}
                <div
                  className="
                    relative
                    aspect-[4/3]
                    overflow-hidden
                    bg-slate-100
                  "
                >
                  <img
                    src={item.image.url}
                    alt={
                      item.image.alt ||
                      item.title
                    }
                    loading="lazy"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-[1.045]
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-[#041B3D]/65
                      via-transparent
                      to-transparent
                    "
                  />

                  {/* Category */}
                  <span
                    className="
                      absolute
                      left-4
                      top-4
                      rounded-full
                      border
                      border-white/15
                      bg-black/20
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
                      item.category
                    ] ??
                      item.category}
                  </span>

                  {/* Open */}
                  <span
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
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3
                    className="
                      line-clamp-2
                      text-base
                      font-extrabold
                      leading-tight
                      tracking-[-0.02em]
                      text-[#062B63]
                      transition-colors
                      group-hover:text-[#0878E8]
                    "
                  >
                    {item.title}
                  </h3>

                  {item.description && (
                    <p
                      className="
                        mt-2
                        line-clamp-2
                        text-xs
                        leading-5
                        text-slate-400
                      "
                    >
                      {item.description}
                    </p>
                  )}

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      justify-between
                      border-t
                      border-slate-100
                      pt-3
                    "
                  >
                    <span
                      className="
                        text-[10px]
                        font-bold
                        text-slate-300
                      "
                    >
                      Explore project
                    </span>

                    <span
                      className="
                        flex
                        h-6
                        w-6
                        items-center
                        justify-center
                        rounded-full
                        bg-slate-50
                        text-slate-400
                        transition-all
                        group-hover:bg-blue-50
                        group-hover:text-[#0878E8]
                      "
                    >
                      <ArrowRight
                        size={12}
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
}