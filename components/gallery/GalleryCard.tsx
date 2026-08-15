import {
  ArrowUpRight,
  Maximize2,
} from "lucide-react";
import Link from "next/link";

interface GalleryCardItem {
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

interface GalleryCardProps {
  item: GalleryCardItem;
  index: number;
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

export default function GalleryCard({
  item,
  index,
  onOpen,
}: GalleryCardProps) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[24px]
        bg-slate-100
        shadow-[0_10px_35px_rgba(15,23,42,0.045)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)]
      "
    >
      {/* =========================
          IMAGE / PREVIEW TRIGGER
      ========================== */}

      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Open ${item.title}`}
        className="
          relative
          block
          aspect-[4/3]
          w-full
          cursor-zoom-in
          overflow-hidden
          text-left
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#0878E8]
          focus-visible:ring-inset
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

        {/* =========================
            OVERLAY
        ========================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-[#041B3D]/80
            via-[#041B3D]/10
            to-transparent
            opacity-90
            transition-opacity
            duration-300
            group-hover:from-[#041B3D]/90
          "
        />

        {/* =========================
            CATEGORY
        ========================== */}

        <span
          className="
            absolute
            left-4
            top-4
            rounded-full
            border
            border-white/20
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
          ] ?? item.category}
        </span>

        {/* =========================
            FULLSCREEN ICON
        ========================== */}

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
            border
            border-white/20
            bg-black/20
            text-white
            opacity-90
            backdrop-blur-md
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:bg-white
            group-hover:text-[#062B63]
          "
        >
          <Maximize2 size={14} />
        </span>

        {/* =========================
            IMAGE CONTENT
        ========================== */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            p-5
          "
        >
          <h3
            className="
              line-clamp-2
              max-w-[90%]
              text-lg
              font-extrabold
              leading-[1.2]
              tracking-[-0.02em]
              text-white
            "
          >
            {item.title}
          </h3>

          {item.description && (
            <p
              className="
                mt-1.5
                line-clamp-2
                max-w-[95%]
                text-xs
                leading-5
                text-white/65
              "
            >
              {item.description}
            </p>
          )}
        </div>
      </button>

      {/* =========================
          BOTTOM BAR
      ========================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-3
          border-t
          border-white/10
          bg-white
          px-4
          py-3
        "
      >
        <span
          className="
            truncate
            text-[10px]
            font-bold
            text-slate-400
          "
        >
          {CATEGORY_LABELS[
            item.category
          ] ?? item.category}
        </span>

       <Link
  href={`/gallery/${item.slug}`}
  className="
    inline-flex
    shrink-0
    items-center
    gap-1.5
    text-[10px]
    font-extrabold
    text-[#062B63]
    transition-colors
    hover:text-[#0878E8]
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-[#0878E8]
    focus-visible:ring-offset-2
  "
>
  View Details

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
    <ArrowUpRight size={12} />
  </span>
</Link>
      </div>
    </article>
  );
}