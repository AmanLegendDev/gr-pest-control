"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

import {
  Loader2,
  MoreHorizontal,
  Pencil,
  Power,
  Star,
  Trash2,
} from "lucide-react";

import { deleteGalleryItem } from "@/features/gallery/actions/delete-gallery-item";
import { toggleGalleryFeatured } from "@/features/gallery/actions/toggle-gallery-featured";
import { toggleGalleryStatus } from "@/features/gallery/actions/toggle-gallery-status";

interface GalleryActionsProps {
  galleryId: string;
  active: boolean;
  featured: boolean;
}

interface DropdownPosition {
  top: number;
  left: number;
}

const DROPDOWN_WIDTH = 208;
const DROPDOWN_HEIGHT = 220;
const VIEWPORT_PADDING = 12;
const GAP = 8;

export default function GalleryActions({
  galleryId,
  active,
  featured,
}: GalleryActionsProps) {
  const [open, setOpen] = useState(false);

  const [position, setPosition] =
    useState<DropdownPosition | null>(null);

  const [isPending, startTransition] =
    useTransition();

  const triggerRef =
    useRef<HTMLButtonElement | null>(null);

  /*
   * =========================================
   * DROPDOWN POSITION
   * =========================================
   */

  const updatePosition = () => {
    const trigger =
      triggerRef.current;

    if (!trigger) return;

    const rect =
      trigger.getBoundingClientRect();

    const viewportWidth =
      window.innerWidth;

    const viewportHeight =
      window.innerHeight;

    /*
     * Default:
     * Open below the trigger.
     */

    let top =
      rect.bottom + GAP;

    /*
     * If there is not enough room below,
     * open above the trigger.
     */

    const spaceBelow =
      viewportHeight -
      rect.bottom -
      VIEWPORT_PADDING;

    const spaceAbove =
      rect.top -
      VIEWPORT_PADDING;

    if (
      spaceBelow < DROPDOWN_HEIGHT &&
      spaceAbove > DROPDOWN_HEIGHT
    ) {
      top =
        rect.top -
        DROPDOWN_HEIGHT -
        GAP;
    }

    /*
     * Horizontal positioning.
     *
     * Normally align the right side of
     * the menu with the right side of
     * the trigger.
     */

    let left =
      rect.right -
      DROPDOWN_WIDTH;

    /*
     * Keep inside left viewport edge.
     */

    if (
      left <
      VIEWPORT_PADDING
    ) {
      left =
        VIEWPORT_PADDING;
    }

    /*
     * Keep inside right viewport edge.
     */

    const maxLeft =
      viewportWidth -
      DROPDOWN_WIDTH -
      VIEWPORT_PADDING;

    if (left > maxLeft) {
      left = maxLeft;
    }

    /*
     * Final vertical safety.
     */

    const maxTop =
      viewportHeight -
      DROPDOWN_HEIGHT -
      VIEWPORT_PADDING;

    if (top > maxTop) {
      top = maxTop;
    }

    if (
      top <
      VIEWPORT_PADDING
    ) {
      top =
        VIEWPORT_PADDING;
    }

    setPosition({
      top,
      left,
    });
  };

  /*
   * =========================================
   * OPEN / CLOSE
   * =========================================
   */

  const toggleMenu = () => {
    if (open) {
      setOpen(false);
      setPosition(null);
      return;
    }

    updatePosition();
    setOpen(true);
  };

  /*
   * =========================================
   * CLOSE ON SCROLL / RESIZE
   * =========================================
   *
   * Prevents the menu from becoming detached
   * from its trigger while scrolling.
   */

  useEffect(() => {
    if (!open) return;

    const handleScroll = () => {
      setOpen(false);
      setPosition(null);
    };

    const handleResize = () => {
      setOpen(false);
      setPosition(null);
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      true,
    );

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
        true,
      );

      window.removeEventListener(
        "resize",
        handleResize,
      );
    };
  }, [open]);

  /*
   * =========================================
   * STATUS
   * =========================================
   */

  const handleToggleStatus = () => {
    startTransition(async () => {
      const result =
        await toggleGalleryStatus(
          galleryId,
        );

      if (!result.success) {
        window.alert(result.message);
        return;
      }

      setOpen(false);
      setPosition(null);
    });
  };

  /*
   * =========================================
   * FEATURED
   * =========================================
   */

  const handleToggleFeatured = () => {
    startTransition(async () => {
      const result =
        await toggleGalleryFeatured(
          galleryId,
        );

      if (!result.success) {
        window.alert(result.message);
        return;
      }

      setOpen(false);
      setPosition(null);
    });
  };

  /*
   * =========================================
   * DELETE
   * =========================================
   */

  const handleDelete = () => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this gallery item? This action cannot be undone.",
      );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      const result =
        await deleteGalleryItem(
          galleryId,
        );

      if (!result.success) {
        window.alert(result.message);
        return;
      }

      setOpen(false);
      setPosition(null);
    });
  };

  return (
    <div className="relative">
      {/* =================================
          TRIGGER
      ================================== */}

      <button
        ref={triggerRef}
        type="button"
        disabled={isPending}
        onClick={toggleMenu}
        aria-label="Gallery actions"
        aria-expanded={open}
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          border
          border-slate-200
          bg-white
          text-slate-500
          transition

          hover:border-blue-100
          hover:bg-blue-50
          hover:text-[#0878E8]

          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {isPending ? (
          <Loader2
            size={15}
            className="animate-spin"
          />
        ) : (
          <MoreHorizontal size={16} />
        )}
      </button>

      {/* =================================
          DROPDOWN
      ================================== */}

      {open && position && (
        <>
          {/* =================================
              CLICK-AWAY
          ================================== */}

          <button
            type="button"
            aria-label="Close actions"
            onClick={() => {
              setOpen(false);
              setPosition(null);
            }}
            className="
              fixed
              inset-0
              z-[9998]
              cursor-default
              bg-transparent
            "
          />

          {/* =================================
              ACTION MENU

              Fixed = not clipped by table,
              card, mobile container or footer.
          ================================== */}

          <div
            className="
              fixed
              z-[9999]

              w-52

              overflow-hidden

              rounded-xl

              border
              border-slate-200

              bg-white

              p-1.5

              shadow-[0_15px_45px_rgba(15,23,42,0.16)]
            "
            style={{
              top: position.top,
              left: position.left,
            }}
          >
            {/* =================================
                EDIT
            ================================== */}

            <Link
              href={`/admin/gallery/${galleryId}/edit`}
              onClick={() => {
                setOpen(false);
                setPosition(null);
              }}
              className="
                flex
                w-full
                items-center
                gap-3

                rounded-lg

                px-3
                py-2.5

                text-xs
                font-bold
                text-slate-600

                transition

                hover:bg-blue-50
                hover:text-[#0878E8]
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-blue-50
                  text-[#0878E8]
                "
              >
                <Pencil size={14} />
              </span>

              <span>
                Edit Gallery Item
              </span>
            </Link>

            {/* =================================
                ACTIVE
            ================================== */}

            <button
              type="button"
              disabled={isPending}
              onClick={
                handleToggleStatus
              }
              className="
                flex
                w-full
                items-center
                gap-3

                rounded-lg

                px-3
                py-2.5

                text-left

                text-xs
                font-bold
                text-slate-600

                transition

                hover:bg-slate-50

                disabled:opacity-50
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-emerald-50
                  text-emerald-600
                "
              >
                <Power size={14} />
              </span>

              <span>
                {active
                  ? "Deactivate"
                  : "Activate"}
              </span>
            </button>

            {/* =================================
                FEATURED
            ================================== */}

            <button
              type="button"
              disabled={isPending}
              onClick={
                handleToggleFeatured
              }
              className="
                flex
                w-full
                items-center
                gap-3

                rounded-lg

                px-3
                py-2.5

                text-left

                text-xs
                font-bold
                text-slate-600

                transition

                hover:bg-slate-50

                disabled:opacity-50
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-amber-50
                  text-amber-500
                "
              >
                <Star
                  size={14}
                  className={
                    featured
                      ? "fill-current"
                      : ""
                  }
                />
              </span>

              <span>
                {featured
                  ? "Remove Featured"
                  : "Mark Featured"}
              </span>
            </button>

            {/* =================================
                DIVIDER
            ================================== */}

            <div
              className="
                my-1
                border-t
                border-slate-100
              "
            />

            {/* =================================
                DELETE
            ================================== */}

            <button
              type="button"
              disabled={isPending}
              onClick={handleDelete}
              className="
                flex
                w-full
                items-center
                gap-3

                rounded-lg

                px-3
                py-2.5

                text-left

                text-xs
                font-bold
                text-red-500

                transition

                hover:bg-red-50

                disabled:opacity-50
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-red-50
                  text-red-500
                "
              >
                <Trash2 size={14} />
              </span>

              <span>
                Delete Gallery Item
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}