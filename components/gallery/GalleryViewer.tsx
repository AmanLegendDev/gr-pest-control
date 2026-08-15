"use client";

import {
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";

interface GalleryViewerItem {
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

interface GalleryViewerProps {
  items: GalleryViewerItem[];
  activeIndex: number | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
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

export default function GalleryViewer({
  items,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
}: GalleryViewerProps) {
  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  const isOpen =
    activeIndex !== null &&
    activeIndex >= 0 &&
    activeIndex < items.length;

  const activeItem = isOpen
    ? items[activeIndex]
    : null;

  /*
   * =========================
   * KEYBOARD CONTROLS
   * =========================
   */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrevious();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    isOpen,
    onClose,
    onPrevious,
    onNext,
  ]);

  /*
   * =========================
   * LOCK BODY SCROLL
   * =========================
   */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [isOpen]);

  /*
   * =========================
   * FOCUS CLOSE BUTTON
   * =========================
   */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timeout = window.setTimeout(
      () => {
        closeButtonRef.current?.focus();
      },
      50,
    );

    return () =>
      window.clearTimeout(timeout);
  }, [isOpen]);

  /*
   * =========================
   * PREVENT BACKDROP EVENTS
   * =========================
   */

  const handleContentClick =
    useCallback(
      (
        event: React.MouseEvent<HTMLDivElement>,
      ) => {
        event.stopPropagation();
      },
      [],
    );

  if (!isOpen || !activeItem) {
    return null;
  }

  const isFirst =
    activeIndex === 0;

  const isLast =
    activeIndex ===
    items.length - 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image viewer"
      className="
        fixed
        inset-0
        z-[100]
        flex
        h-[100dvh]
        w-full
        items-center
        justify-center
        bg-[#020817]/95
        p-3
        backdrop-blur-xl
        sm:p-5
        lg:p-8
      "
      onClick={onClose}
    >
      {/* =========================
          TOP BAR
      ========================== */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          z-20
          flex
          items-center
          justify-between
          px-4
          py-4
          sm:px-6
          sm:py-5
          lg:px-8
        "
      >
        {/* Counter */}
        <div
          className="
            rounded-full
            border
            border-white/10
            bg-white/10
            px-3.5
            py-2
            text-[10px]
            font-extrabold
            tracking-[0.12em]
            text-white/80
            backdrop-blur-md
          "
        >
          {String(
            activeIndex + 1,
          ).padStart(2, "0")}{" "}
          <span className="text-white/30">
            /
          </span>{" "}
          {String(
            items.length,
          ).padStart(2, "0")}
        </div>

        {/* Close */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery viewer"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/10
            text-white
            backdrop-blur-md
            transition-all
            duration-200
            hover:scale-105
            hover:bg-white
            hover:text-[#062B63]
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-white
          "
        >
          <X size={20} />
        </button>
      </div>

      {/* =========================
          MAIN CONTENT
      ========================== */}

      <div
        className="
          relative
          flex
          h-full
          w-full
          max-w-[1500px]
          items-center
          justify-center
        "
        onClick={handleContentClick}
      >
        {/* =========================
            PREVIOUS
        ========================== */}

        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirst}
          aria-label="Previous image"
          className="
            absolute
            left-0
            top-1/2
            z-20
            flex
            h-11
            w-11
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-black/30
            text-white
            backdrop-blur-md
            transition-all
            duration-200
            hover:bg-white
            hover:text-[#062B63]
            disabled:pointer-events-none
            disabled:opacity-20
            sm:left-2
            sm:h-12
            sm:w-12
            lg:left-5
          "
        >
          <ChevronLeft size={22} />
        </button>

        {/* =========================
            IMAGE
        ========================== */}

        <div
          className="
            flex
            h-full
            w-full
            items-center
            justify-center
            px-10
            pb-32
            pt-20
            sm:px-16
            sm:pb-36
            lg:px-24
          "
        >
          <div
            className="
              relative
              flex
              max-h-full
              max-w-full
              items-center
              justify-center
            "
          >
            <img
              src={activeItem.image.url}
              alt={
                activeItem.image.alt ||
                activeItem.title
              }
              className="
                max-h-[calc(100dvh-220px)]
                max-w-full
                rounded-[18px]
                object-contain
                shadow-[0_30px_100px_rgba(0,0,0,0.45)]
                sm:max-h-[calc(100dvh-200px)]
                sm:rounded-[24px]
              "
              draggable={false}
            />

            {/* Image type indicator */}
            <div
              className="
                pointer-events-none
                absolute
                bottom-3
                right-3
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-black/35
                text-white/80
                backdrop-blur-md
              "
            >
              <Maximize2 size={13} />
            </div>
          </div>
        </div>

        {/* =========================
            NEXT
        ========================== */}

        <button
          type="button"
          onClick={onNext}
          disabled={isLast}
          aria-label="Next image"
          className="
            absolute
            right-0
            top-1/2
            z-20
            flex
            h-11
            w-11
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-black/30
            text-white
            backdrop-blur-md
            transition-all
            duration-200
            hover:bg-white
            hover:text-[#062B63]
            disabled:pointer-events-none
            disabled:opacity-20
            sm:right-2
            sm:h-12
            sm:w-12
            lg:right-5
          "
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* =========================
          BOTTOM INFO
      ========================== */}

      <div
        className="
          absolute
          inset-x-3
          bottom-3
          z-20
          mx-auto
          max-w-3xl
          rounded-[20px]
          border
          border-white/10
          bg-black/35
          px-4
          py-4
          backdrop-blur-xl
          sm:bottom-5
          sm:px-6
          sm:py-5
        "
        onClick={handleContentClick}
      >
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div className="min-w-0">
            {/* Category */}
            <span
              className="
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.14em]
                text-blue-200
              "
            >
              {CATEGORY_LABELS[
                activeItem.category
              ] ??
                activeItem.category}
            </span>

            {/* Title */}
            <h2
              className="
                mt-1
                line-clamp-2
                text-base
                font-extrabold
                leading-tight
                text-white
                sm:text-lg
              "
            >
              {activeItem.title}
            </h2>

            {/* Description */}
            {activeItem.description && (
              <p
                className="
                  mt-1.5
                  line-clamp-1
                  text-xs
                  leading-5
                  text-white/55
                  sm:text-sm
                "
              >
                {activeItem.description}
              </p>
            )}
          </div>

          {/* Keyboard hint */}
          <div
            className="
              hidden
              shrink-0
              items-center
              gap-1.5
              text-[9px]
              font-bold
              text-white/35
              sm:flex
            "
          >
            <kbd
              className="
                rounded
                border
                border-white/10
                px-1.5
                py-1
              "
            >
              ←
            </kbd>

            <kbd
              className="
                rounded
                border
                border-white/10
                px-1.5
                py-1
              "
            >
              →
            </kbd>

            <span>navigate</span>
          </div>
        </div>
      </div>
    </div>
  );
}