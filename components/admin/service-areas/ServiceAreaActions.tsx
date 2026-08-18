"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

import {
  MoreHorizontal,
  Star,
  Power,
  Trash2,
  Loader2,
} from "lucide-react";

import { toggleServiceAreaStatus } from "@/features/service-areas/actions/toggle-service-area-status";
import { toggleServiceAreaFeatured } from "@/features/service-areas/actions/toggle-service-area-featured";
import { deleteServiceArea } from "@/features/service-areas/actions/delete-service-area";

interface ServiceAreaActionsProps {
  serviceAreaId: string;
  active: boolean;
  featured: boolean;
}

interface DropdownPosition {
  top: number;
  left: number;
}

const DROPDOWN_WIDTH = 208;
const DROPDOWN_HEIGHT = 170;
const VIEWPORT_PADDING = 12;
const GAP = 8;

export default function ServiceAreaActions({
  serviceAreaId,
  active,
  featured,
}: ServiceAreaActionsProps) {
  const [open, setOpen] = useState(false);

  const [position, setPosition] =
    useState<DropdownPosition | null>(null);

  const [isPending, startTransition] =
    useTransition();

  const triggerRef =
    useRef<HTMLButtonElement | null>(null);

  /*
   * =========================================
   * CALCULATE DROPDOWN POSITION
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
     * Default: open below trigger.
     */

    let top =
      rect.bottom + GAP;

    /*
     * If there isn't enough room below,
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
     * Keep dropdown inside viewport
     * horizontally.
     */

    let left =
      rect.right -
      DROPDOWN_WIDTH;

    if (
      left <
      VIEWPORT_PADDING
    ) {
      left =
        VIEWPORT_PADDING;
    }

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
      top = VIEWPORT_PADDING;
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
   * This prevents the menu from becoming
   * detached from its trigger while scrolling.
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

  const handleStatusToggle = () => {
    startTransition(async () => {
      const result =
        await toggleServiceAreaStatus(
          serviceAreaId,
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

  const handleFeaturedToggle = () => {
    startTransition(async () => {
      const result =
        await toggleServiceAreaFeatured(
          serviceAreaId,
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
        "Are you sure you want to delete this service area? This action cannot be undone.",
      );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      const result =
        await deleteServiceArea(
          serviceAreaId,
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
        title="More actions"
        aria-label="More service area actions"
        aria-expanded={open}
        disabled={isPending}
        onClick={toggleMenu}
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
              CLICK-AWAY LAYER
          ================================== */}

          <button
            type="button"
            aria-label="Close actions"
            className="
              fixed
              inset-0
              z-[9998]
              cursor-default
              bg-transparent
            "
            onClick={() => {
              setOpen(false);
              setPosition(null);
            }}
          />

          {/* =================================
              ACTION MENU

              Fixed positioning means this menu
              is NOT trapped inside the service
              area card/table.
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
                STATUS
            ================================== */}

            <button
              type="button"
              onClick={
                handleStatusToggle
              }
              disabled={isPending}
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
                hover:text-[#062B63]

                disabled:opacity-50
              "
            >
              <span
                className={`
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg

                  ${
                    active
                      ? "bg-amber-50 text-amber-500"
                      : "bg-emerald-50 text-emerald-600"
                  }
                `}
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
              onClick={
                handleFeaturedToggle
              }
              disabled={isPending}
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
                hover:text-[#062B63]

                disabled:opacity-50
              "
            >
              <span
                className={`
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg

                  ${
                    featured
                      ? "bg-slate-50 text-slate-400"
                      : "bg-amber-50 text-amber-500"
                  }
                `}
              >
                <Star
                  size={14}
                  className={
                    featured
                      ? ""
                      : "fill-current"
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

            <div className="my-1 border-t border-slate-100" />

            {/* =================================
                DELETE
            ================================== */}

            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
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
                Delete Service Area
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}