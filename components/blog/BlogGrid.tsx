import BlogCard from "@/components/blog/BlogCard";

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  featuredImage?: {
    url: string;
    alt: string;
  };
  featured: boolean;
  publishedAt?: string;
}

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({
  posts,
}: BlogGridProps) {
  return (
    <section
      id="blog"
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
              Latest Articles
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
              Explore our latest guides
            </h2>
          </div>

          {posts.length > 0 && (
            <p
              className="
                text-xs
                font-semibold
                text-slate-400
              "
            >
              {posts.length}{" "}
              {posts.length === 1
                ? "article"
                : "articles"}
            </p>
          )}
        </div>

        {/* =========================
            EMPTY STATE
        ========================== */}

        {posts.length === 0 ? (
          <div
            className="
              rounded-[28px]
              border
              border-dashed
              border-slate-200
              bg-white
              px-6
              py-16
              text-center
            "
          >
            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-blue-50
                text-[#0878E8]
              "
            >
              <span className="text-xl">
                📚
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
              No articles found
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
              We couldn't find any published
              articles for this category yet.
              Check another topic or come back
              soon.
            </p>
          </div>
        ) : (
          /* =========================
              GRID
          ========================== */

          <div
            className="
              grid
              gap-5
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                post={post}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}