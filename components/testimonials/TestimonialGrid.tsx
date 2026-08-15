import TestimonialCard from "@/components/testimonials/TestimonialCard";

interface TestimonialGridItem {
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

interface TestimonialGridProps {
  items: TestimonialGridItem[];
}

export default function TestimonialGrid({
  items,
}: TestimonialGridProps) {
  return (
    <section
      className="
        bg-[#F8FAFC]
        px-4
        pb-16
        pt-4
        sm:px-6
        sm:pb-20
        sm:pt-6
        lg:px-8
        lg:pb-24
        lg:pt-8
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
            gap-3
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
                tracking-[0.15em]
                text-[#0878E8]
              "
            >
              Customer stories
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
              What our customers say
            </h2>
          </div>

          <p
            className="
              max-w-md
              text-xs
              leading-6
              text-slate-400
              sm:text-right
            "
          >
            Honest experiences from people who
            have worked with us.
          </p>
        </div>

        {/* =========================
            EMPTY STATE
        ========================== */}

        {items.length === 0 ? (
          <div
            className="
              mt-8
              rounded-[28px]
              border
              border-slate-100
              bg-white
              px-6
              py-14
              text-center
              shadow-[0_8px_30px_rgba(15,23,42,0.035)]
            "
          >
            <p
              className="
                text-sm
                font-extrabold
                text-[#062B63]
              "
            >
              No customer reviews yet.
            </p>

            <p
              className="
                mt-2
                text-xs
                leading-6
                text-slate-400
              "
            >
              Customer experiences will appear
              here as they are published.
            </p>
          </div>
        ) : (
          /* =========================
             GRID
          ========================== */

          <div
            className="
              mt-8
              grid
              gap-4
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {items.map(
              (item) => (
                <TestimonialCard
                  key={item.id}
                  item={item}
                />
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}