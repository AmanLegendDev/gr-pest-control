import TestimonialCard from "@/components/testimonials/TestimonialCard";

interface FeaturedTestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  location: string;
  image?: {
    url: string;
    alt: string;
  } | null;
  featured: boolean;
}

interface TestimonialFeaturedProps {
  items: FeaturedTestimonialItem[];
}

export default function TestimonialFeatured({
  items,
}: TestimonialFeaturedProps) {
  if (items.length === 0) {
    return null;
  }

  const visibleItems =
    items.slice(0, 3);

  return (
    <section
      className="
        bg-white
        px-4
        py-14
        sm:px-6
        sm:py-18
        lg:px-8
        lg:py-20
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* =========================
            HEADER
        ========================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div className="max-w-2xl">
            <p
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.15em]
                text-[#0878E8]
              "
            >
              What stands out
            </p>

            <h2
              className="
                mt-2
                text-2xl
                font-extrabold
                tracking-[-0.04em]
                text-[#062B63]
                sm:text-3xl
              "
            >
              Experiences worth
              sharing.
            </h2>

            <p
              className="
                mt-3
                max-w-xl
                text-sm
                leading-7
                text-slate-400
              "
            >
              A few of the experiences our
              customers have chosen to highlight.
            </p>
          </div>

          <div
            className="
              hidden
              h-px
              flex-1
              bg-slate-100
              lg:ml-12
              lg:block
            "
          />
        </div>

        {/* =========================
            FEATURED GRID
        ========================== */}

        <div
          className="
            mt-9
            grid
            gap-5
            lg:grid-cols-3
          "
        >
          {visibleItems.map(
            (item) => (
              <TestimonialCard
                key={item.id}
                item={item}
                featured
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}