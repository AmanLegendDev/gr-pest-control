import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Tag,
  UserRound,
} from "lucide-react";

interface BlogDetailSidebarProps {
  category: string;
  author: string;
  publishedAt?: string;
  tags: string[];
}

export default function BlogDetailSidebar({
  category,
  author,
  publishedAt,
  tags,
}: BlogDetailSidebarProps) {
  const formattedDate = publishedAt
    ? new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(publishedAt))
    : null;

  return (
    <aside
      className="
        space-y-5
        lg:sticky
        lg:top-24
      "
    >
      {/* =========================
          QUOTE CARD
      ========================== */}

      <div
        className="
          overflow-hidden
          rounded-[24px]
          bg-[#062B63]
          p-6
          shadow-[0_18px_50px_rgba(6,43,99,0.14)]
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-white/10
            text-blue-200
          "
        >
          <ShieldCheck size={19} />
        </div>

        <h2
          className="
            mt-5
            text-xl
            font-extrabold
            leading-tight
            tracking-[-0.025em]
            text-white
          "
        >
          Need help with a pest problem?
        </h2>

        <p
          className="
            mt-3
            text-sm
            leading-6
            text-blue-100/70
          "
        >
          Tell us what you're dealing with and
          request a quote for your property.
        </p>

        <div
          className="
            mt-5
            space-y-2.5
          "
        >
          <div className="flex items-center gap-2">
            <CheckCircle2
              size={14}
              className="text-emerald-300"
            />

            <span
              className="
                text-xs
                font-semibold
                text-blue-100
              "
            >
              Simple quote request
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2
              size={14}
              className="text-emerald-300"
            />

            <span
              className="
                text-xs
                font-semibold
                text-blue-100
              "
            >
              Preferred date & time
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2
              size={14}
              className="text-emerald-300"
            />

            <span
              className="
                text-xs
                font-semibold
                text-blue-100
              "
            >
              Local service coverage
            </span>
          </div>
        </div>

        <Link
          href="/quote"
          className="
            group
            mt-6
            flex
            min-h-12
            items-center
            justify-center
            gap-2
            rounded-full
            bg-white
            px-5
            text-sm
            font-extrabold
            text-[#062B63]
            transition-all
            hover:-translate-y-0.5
            hover:bg-slate-50
          "
        >
          Get a Free Quote

          <ArrowRight
            size={15}
            className="
              transition-transform
              group-hover:translate-x-0.5
            "
          />
        </Link>
      </div>

      {/* =========================
          ARTICLE INFO
      ========================== */}

      <div
        className="
          rounded-[24px]
          border
          border-slate-200
          bg-white
          p-5
          shadow-[0_10px_35px_rgba(15,23,42,0.04)]
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            border-b
            border-slate-100
            pb-4
          "
        >
          <FileText
            size={16}
            className="text-[#0878E8]"
          />

          <h3
            className="
              text-sm
              font-extrabold
              text-[#062B63]
            "
          >
            Article details
          </h3>
        </div>

        <div className="space-y-4 pt-4">
          {/* Category */}
          {category && (
            <div
              className="
                flex
                items-start
                gap-3
              "
            >
              <Tag
                size={15}
                className="
                  mt-0.5
                  shrink-0
                  text-slate-400
                "
              />

              <div>
                <p
                  className="
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-wide
                    text-slate-400
                  "
                >
                  Category
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    font-bold
                    text-[#062B63]
                  "
                >
                  {category}
                </p>
              </div>
            </div>
          )}

          {/* Author */}
          <div
            className="
              flex
              items-start
              gap-3
            "
          >
            <UserRound
              size={15}
              className="
                mt-0.5
                shrink-0
                text-slate-400
              "
            />

            <div>
              <p
                className="
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                Author
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  font-bold
                  text-[#062B63]
                "
              >
                {author}
              </p>
            </div>
          </div>

          {/* Published */}
          {formattedDate && (
            <div
              className="
                flex
                items-start
                gap-3
              "
            >
              <CalendarDays
                size={15}
                className="
                  mt-0.5
                  shrink-0
                  text-slate-400
                "
              />

              <div>
                <p
                  className="
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-wide
                    text-slate-400
                  "
                >
                  Published
                </p>

                <time
                  dateTime={publishedAt}
                  className="
                    mt-1
                    block
                    text-xs
                    font-bold
                    text-[#062B63]
                  "
                >
                  {formattedDate}
                </time>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================
          TAGS
      ========================== */}

      {tags.length > 0 && (
        <div
          className="
            rounded-[24px]
            border
            border-slate-200
            bg-white
            p-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <Tag
              size={15}
              className="text-[#0878E8]"
            />

            <h3
              className="
                text-sm
                font-extrabold
                text-[#062B63]
              "
            >
              Topics
            </h3>
          </div>

          <div
            className="
              mt-4
              flex
              flex-wrap
              gap-2
            "
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="
                  rounded-full
                  border
                  border-slate-200
                  bg-[#F8FAFC]
                  px-3
                  py-1.5
                  text-[10px]
                  font-bold
                  text-slate-500
                "
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}