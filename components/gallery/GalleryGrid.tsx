import GalleryCard from "@/components/gallery/GalleryCard";

interface GalleryGridItem {
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

interface GalleryGridProps {
  items: GalleryGridItem[];
  onOpen: (index: number) => void;
}

export default function GalleryGrid({
  items,
  onOpen,
}: GalleryGridProps) {
  return (
    <section
      id="gallery"
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
            gap-3
            sm:mb-10
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.16em]
                text-[#0878E8]
              "
            >
              The Gallery
            </p>

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
              Work worth looking closer at
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
              Browse treatments, properties,
              workplaces and the people behind
              our work.
            </p>
          </div>

          {items.length > 0 && (
            <div
              className="
                flex
                shrink-0
                items-center
                gap-2
                text-xs
                font-bold
                text-slate-400
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

              {items.length}{" "}
              {items.length === 1
                ? "photo"
                : "photos"}
            </div>
          )}
        </div>

        {/* =========================
            EMPTY STATE
        ========================== */}

        {items.length === 0 ? (
          <div
            className="
              rounded-[28px]
              border
              border-dashed
              border-slate-200
              bg-white
              px-6
              py-20
              text-center
            "
          >
            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-[22px]
                bg-blue-50
                text-[#0878E8]
              "
            >
              <span className="text-2xl">
                📷
              </span>
            </div>

            <h3
              className="
                mt-5
                text-lg
                font-extrabold
                text-[#062B63]
              "
            >
              Nothing to show yet
            </h3>

            <p
              className="
                mx-auto
                mt-2
                max-w-md
                text-sm
                leading-6
                text-slate-500
              "
            >
              We're adding more examples of
              our work. Check back soon.
            </p>
          </div>
        ) : (
          /* =========================
              MASONRY-STYLE LAYOUT
          ========================== */

          <div
            className="
              columns-1
              gap-5
              sm:columns-2
              lg:columns-3
            "
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                className="
                  mb-5
                  break-inside-avoid
                "
              >
                <GalleryCard
                  item={item}
                  index={index}
                  onOpen={onOpen}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}