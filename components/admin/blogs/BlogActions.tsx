"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import {
  Check,
  Eye,
  MoreHorizontal,
  Pencil,
  Star,
  Trash2,
  X,
} from "lucide-react";

import { useRouter } from "next/navigation";

import {
  toggleBlogPublished,
} from "@/features/blogs/actions/toggle-blog-published";

import {
  toggleBlogFeatured,
} from "@/features/blogs/actions/toggle-blog-featured";

import {
  deleteBlog,
} from "@/features/blogs/actions/delete-blog";

interface BlogActionsProps {
  blogId: string;
  slug: string;
  published: boolean;
  featured: boolean;
}

interface DropdownPosition {
  top: number;
  left: number;
}

const DROPDOWN_WIDTH = 224;
const DROPDOWN_HEIGHT = 280;
const VIEWPORT_PADDING = 12;
const GAP = 8;

export default function BlogActions({
  blogId,
  slug,
  published,
  featured,
}: BlogActionsProps) {
  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [position, setPosition] =
    useState<DropdownPosition | null>(
      null,
    );

  const triggerRef =
    useRef<HTMLButtonElement | null>(
      null,
    );

  /*
   * ========================================
   * DROPDOWN POSITION
   * ========================================
   */

  function updatePosition() {
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
     * Open below trigger.
     */

    let top =
      rect.bottom + GAP;

    /*
     * Available viewport space.
     */

    const spaceBelow =
      viewportHeight -
      rect.bottom -
      VIEWPORT_PADDING;

    const spaceAbove =
      rect.top -
      VIEWPORT_PADDING;

    /*
     * If bottom doesn't have enough
     * room, open upward.
     */

    if (
      spaceBelow <
        DROPDOWN_HEIGHT &&
      spaceAbove >
        DROPDOWN_HEIGHT
    ) {
      top =
        rect.top -
        DROPDOWN_HEIGHT -
        GAP;
    }

    /*
     * Right align with trigger.
     */

    let left =
      rect.right -
      DROPDOWN_WIDTH;

    /*
     * Prevent left overflow.
     */

    if (
      left <
      VIEWPORT_PADDING
    ) {
      left =
        VIEWPORT_PADDING;
    }

    /*
     * Prevent right overflow.
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
  }

  /*
   * ========================================
   * MENU TOGGLE
   * ========================================
   */

  function handleMenuToggle() {
    if (open) {
      setOpen(false);
      setPosition(null);
      return;
    }

    setError(null);

    updatePosition();
    setOpen(true);
  }

  /*
   * ========================================
   * CLOSE ON SCROLL / RESIZE
   * ========================================
   */

  useEffect(() => {
    if (!open) return;

    function handleScroll() {
      setOpen(false);
      setPosition(null);
    }

    function handleResize() {
      setOpen(false);
      setPosition(null);
    }

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
   * ========================================
   * TOGGLE PUBLISHED
   * ========================================
   */

  async function handleTogglePublished() {
    setLoading(true);
    setError(null);

    try {
      const result =
        await toggleBlogPublished(
          blogId,
        );

      if (!result.success) {
        setError(result.message);
        return;
      }

      setOpen(false);
      setPosition(null);

      router.refresh();
    } catch (error) {
      console.error(
        "BLOG_PUBLISH_TOGGLE_ERROR",
        error,
      );

      setError(
        "Unable to update publishing status.",
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * ========================================
   * TOGGLE FEATURED
   * ========================================
   */

  async function handleToggleFeatured() {
    setLoading(true);
    setError(null);

    try {
      const result =
        await toggleBlogFeatured(
          blogId,
        );

      if (!result.success) {
        setError(result.message);
        return;
      }

      setOpen(false);
      setPosition(null);

      router.refresh();
    } catch (error) {
      console.error(
        "BLOG_FEATURED_TOGGLE_ERROR",
        error,
      );

      setError(
        "Unable to update featured status.",
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * ========================================
   * DELETE BLOG
   * ========================================
   */

  async function handleDelete() {
    setLoading(true);
    setError(null);

    try {
      const result =
        await deleteBlog(blogId);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setDeleteOpen(false);
      setOpen(false);
      setPosition(null);

      router.refresh();
    } catch (error) {
      console.error(
        "DELETE_BLOG_ERROR",
        error,
      );

      setError(
        "Unable to delete the blog.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* =====================================
          ACTION MENU
      ====================================== */}

      <div className="relative inline-block text-left">
        <button
          ref={triggerRef}
          type="button"
          onClick={
            handleMenuToggle
          }
          disabled={loading}
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

            hover:border-slate-300
            hover:bg-slate-50
            hover:text-[#062B63]

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          aria-label="Open blog actions"
          aria-expanded={open}
        >
          <MoreHorizontal
            size={18}
          />
        </button>

        {open && position && (
          <>
            {/* =================================
                CLICK AWAY
            ================================== */}

            <button
              type="button"
              aria-label="Close blog actions"
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
                FIXED DROPDOWN
            ================================== */}

            <div
              className="
                fixed
                z-[9999]

                w-56

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
                  VIEW
              ================================== */}

              {published ? (
                <Link
                  href={`/admin/blogs/${blogId}`}
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

                    text-sm
                    font-medium
                    text-slate-600

                    transition

                    hover:bg-slate-50
                    hover:text-[#062B63]
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
                    <Eye size={15} />
                  </span>

                  <span>
                    View Details
                  </span>
                </Link>
              ) : (
                <div
                  title="
                    Publish the blog before
                    viewing it publicly.
                  "
                  className="
                    flex
                    w-full
                    cursor-not-allowed
                    items-center
                    gap-3

                    rounded-lg

                    px-3
                    py-2.5

                    text-sm
                    font-medium
                    text-slate-300
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

                      bg-slate-50
                      text-slate-300
                    "
                  >
                    <Eye size={15} />
                  </span>

                  <span>
                    View Blog
                  </span>
                </div>
              )}

              {/* =================================
                  EDIT
              ================================== */}

              <Link
                href={`/admin/blogs/${blogId}/edit`}
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

                  text-sm
                  font-medium
                  text-slate-600

                  transition

                  hover:bg-slate-50
                  hover:text-[#062B63]
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
                  <Pencil size={15} />
                </span>

                <span>
                  Edit
                </span>
              </Link>

              {/* =================================
                  PUBLISH
              ================================== */}

              <button
                type="button"
                disabled={loading}
                onClick={
                  handleTogglePublished
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

                  text-sm
                  font-medium
                  text-slate-600

                  transition

                  hover:bg-slate-50

                  disabled:cursor-not-allowed
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
                  {published ? (
                    <X size={15} />
                  ) : (
                    <Check size={15} />
                  )}
                </span>

                <span>
                  {published
                    ? "Unpublish"
                    : "Publish"}
                </span>
              </button>

              {/* =================================
                  FEATURED
              ================================== */}

              <button
                type="button"
                disabled={loading}
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

                  text-sm
                  font-medium
                  text-slate-600

                  transition

                  hover:bg-slate-50

                  disabled:cursor-not-allowed
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
                    size={15}
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

              {/* Divider */}

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
                disabled={loading}
                onClick={() => {
                  setOpen(false);
                  setPosition(null);
                  setDeleteOpen(true);
                }}
                className="
                  flex
                  w-full
                  items-center
                  gap-3

                  rounded-lg

                  px-3
                  py-2.5

                  text-left

                  text-sm
                  font-semibold
                  text-red-600

                  transition

                  hover:bg-red-50

                  disabled:cursor-not-allowed
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
                    text-red-600
                  "
                >
                  <Trash2 size={15} />
                </span>

                <span>
                  Delete
                </span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* =====================================
          ERROR TOAST
      ====================================== */}

      {error && (
        <div
          className="
            fixed
            bottom-5
            right-5
            z-[10000]

            max-w-sm

            rounded-xl

            border
            border-red-200

            bg-red-50

            px-4
            py-3

            text-xs
            font-semibold
            text-red-700

            shadow-xl
          "
        >
          {error}
        </div>
      )}

      {/* =====================================
          DELETE CONFIRMATION
      ====================================== */}

      {deleteOpen && (
        <div
          className="
            fixed
            inset-0
            z-[11000]

            flex
            items-center
            justify-center

            bg-slate-950/40

            px-4

            backdrop-blur-sm
          "
        >
          <div
            className="
              w-full
              max-w-md

              rounded-2xl

              bg-white

              p-6

              shadow-2xl
            "
          >
            {/* Icon */}

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center

                rounded-xl

                bg-red-50
                text-red-600
              "
            >
              <Trash2 size={20} />
            </div>

            {/* Heading */}

            <h2
              className="
                mt-4

                text-lg
                font-bold
                text-[#062B63]
              "
            >
              Delete this blog?
            </h2>

            {/* Description */}

            <p
              className="
                mt-2

                text-sm
                leading-6
                text-slate-500
              "
            >
              This blog post will be
              permanently removed from
              the database. This action
              cannot be undone.
            </p>

            {/* Actions */}

            <div
              className="
                mt-6

                flex
                flex-col-reverse
                gap-3

                sm:flex-row
                sm:justify-end
              "
            >
              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  setDeleteOpen(false)
                }
                className="
                  h-10

                  rounded-lg

                  border
                  border-slate-200

                  bg-white

                  px-4

                  text-sm
                  font-semibold
                  text-slate-600

                  transition

                  hover:bg-slate-50

                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={
                  handleDelete
                }
                className="
                  inline-flex
                  h-10
                  items-center
                  justify-center
                  gap-2

                  rounded-lg

                  bg-red-600

                  px-4

                  text-sm
                  font-semibold
                  text-white

                  transition

                  hover:bg-red-700

                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loading ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4
                        animate-spin

                        rounded-full

                        border-2
                        border-white/40
                        border-t-white
                      "
                    />

                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={15} />

                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}