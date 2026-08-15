import Link from "next/link";
import {
  ArrowUpRight,
  Edit3,
  Eye,
  Image as ImageIcon,
  MoreHorizontal,
  Star,
} from "lucide-react";

interface ServiceImage {
  url: string;
  publicId: string;
  alt: string;
}

interface AdminService {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  heroImage?: ServiceImage;
  icon?: string;
  pestTypes: string[];
  benefits: string[];
  process: {
    title: string;
    description: string;
    sortOrder: number;
  }[];
  faqs: {
    question: string;
    answer: string;
    sortOrder: number;
  }[];
  seoTitle?: string;
  seoDescription?: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface ServiceCardProps {
  service: AdminService;
}

export default function ServiceCard({
  service,
}: ServiceCardProps) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[24px]
        border
        border-slate-100
        bg-white
        shadow-[0_8px_30px_rgba(15,23,42,0.035)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]
      "
    >
      {/* =========================
          IMAGE
      ========================== */}

      <div
        className="
          relative
          aspect-[16/9]
          overflow-hidden
          bg-slate-100
        "
      >
        {service.heroImage?.url ? (
          <img
            src={service.heroImage.url}
            alt={
              service.heroImage.alt ||
              service.title
            }
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              ease-out
              group-hover:scale-[1.035]
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              bg-gradient-to-br
              from-slate-50
              to-slate-100
              text-slate-300
            "
          >
            <ImageIcon size={30} />
          </div>
        )}

        {/* Image overlay */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-24
            bg-gradient-to-t
            from-[#062B63]/55
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
            border-white/20
            bg-[#062B63]/80
            px-3
            py-1.5
            text-[9px]
            font-extrabold
            uppercase
            tracking-[0.1em]
            text-white
            shadow-sm
            backdrop-blur-md
          "
        >
          {service.category}
        </span>

        {/* Featured */}

        {service.featured && (
          <span
            className="
              absolute
              right-4
              top-4
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              border-amber-200/30
              bg-amber-500/90
              px-3
              py-1.5
              text-[9px]
              font-extrabold
              uppercase
              tracking-[0.08em]
              text-white
              shadow-sm
              backdrop-blur-md
            "
          >
            <Star
              size={11}
              fill="currentColor"
            />

            Featured
          </span>
        )}

        {/* Status */}

        <span
          className={`
            absolute
            bottom-4
            left-4
            inline-flex
            items-center
            gap-1.5
            rounded-full
            px-3
            py-1.5
            text-[9px]
            font-extrabold
            uppercase
            tracking-[0.08em]
            shadow-sm
            backdrop-blur-md
            ${
              service.active
                ? "bg-emerald-500/90 text-white"
                : "bg-slate-700/85 text-white"
            }
          `}
        >
          <span
            className={`
              h-1.5
              w-1.5
              rounded-full
              ${
                service.active
                  ? "bg-white"
                  : "bg-slate-300"
              }
            `}
          />

          {service.active
            ? "Active"
            : "Inactive"}
        </span>

        {/* Sort order */}

        <span
          className="
            absolute
            bottom-4
            right-4
            rounded-full
            bg-black/30
            px-2.5
            py-1.5
            text-[9px]
            font-bold
            text-white/80
            backdrop-blur-md
          "
        >
          #{service.sortOrder}
        </span>
      </div>

      {/* =========================
          CONTENT
      ========================== */}

      <div className="p-5">
        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
        >
          <div className="min-w-0">
            <h3
              className="
                truncate
                text-base
                font-extrabold
                tracking-[-0.025em]
                text-[#062B63]
              "
            >
              {service.title}
            </h3>

            <p
              className="
                mt-1
                truncate
                text-[10px]
                font-medium
                text-slate-400
              "
            >
              /services/{service.slug}
            </p>
          </div>

          <span
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-slate-50
              text-slate-400
              transition-colors
              group-hover:bg-blue-50
              group-hover:text-[#0878E8]
            "
          >
            <MoreHorizontal
              size={16}
            />
          </span>
        </div>

        <p
          className="
            mt-4
            line-clamp-2
            min-h-10
            text-xs
            leading-5
            text-slate-500
          "
        >
          {service.shortDescription}
        </p>

        {/* Meta */}

        <div
          className="
            mt-5
            flex
            flex-wrap
            gap-2
          "
        >
          <span
            className="
              rounded-lg
              bg-slate-50
              px-2.5
              py-1.5
              text-[9px]
              font-bold
              text-slate-500
            "
          >
            {service.pestTypes.length}{" "}
            pest types
          </span>

          <span
            className="
              rounded-lg
              bg-slate-50
              px-2.5
              py-1.5
              text-[9px]
              font-bold
              text-slate-500
            "
          >
            {service.process.length}{" "}
            process steps
          </span>

          <span
            className="
              rounded-lg
              bg-slate-50
              px-2.5
              py-1.5
              text-[9px]
              font-bold
              text-slate-500
            "
          >
            {service.faqs.length} FAQs
          </span>
        </div>
      </div>

      {/* =========================
          ACTIONS
      ========================== */}

      <div
        className="
          grid
          grid-cols-3
          border-t
          border-slate-100
          bg-[#FAFBFD]
        "
      >
        <Link
          href={`/admin/services/${service.id}`}
          className="
            inline-flex
            min-h-11
            items-center
            justify-center
            gap-1.5
            border-r
            border-slate-100
            text-[10px]
            font-extrabold
            text-slate-500
            transition-colors
            hover:bg-blue-50
            hover:text-[#0878E8]
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-inset
            focus-visible:ring-[#0878E8]
          "
        >
          <Eye size={13} />

          View
        </Link>

        <Link
          href={`/admin/services/${service.id}/edit`}
          className="
            inline-flex
            min-h-11
            items-center
            justify-center
            gap-1.5
            border-r
            border-slate-100
            text-[10px]
            font-extrabold
            text-slate-500
            transition-colors
            hover:bg-blue-50
            hover:text-[#0878E8]
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-inset
            focus-visible:ring-[#0878E8]
          "
        >
          <Edit3 size={13} />

          Edit
        </Link>

        <Link
          href={`/admin/services/${service.id}`}
          className="
            group/view
            inline-flex
            min-h-11
            items-center
            justify-center
            gap-1.5
            text-[10px]
            font-extrabold
            text-slate-500
            transition-colors
            hover:bg-blue-50
            hover:text-[#0878E8]
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-inset
            focus-visible:ring-[#0878E8]
          "
        >
          Details

          <ArrowUpRight
            size={12}
            className="
              transition-transform
              group-hover/view:translate-x-0.5
            "
          />
        </Link>
      </div>
    </article>
  );
}