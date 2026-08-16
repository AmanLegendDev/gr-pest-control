"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/require-admin";
import { connectDB } from "@/lib/db/connect";

import BlogPost from "@/models/BlogPost";

import {
  updateBlogSchema,
  type UpdateBlogInput,
} from "@/features/blogs/schemas/blog-schema";

export async function updateBlog(
  input: UpdateBlogInput,
) {
  try {
    await requireAdmin();

    const parsed =
      updateBlogSchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        message:
          parsed.error.issues[0]?.message ??
          "Invalid blog data.",
      };
    }

    const data = parsed.data;

    if (
      !mongoose.Types.ObjectId.isValid(data.id)
    ) {
      return {
        success: false,
        message: "Invalid blog ID.",
      };
    }

    await connectDB();

    const existing =
      await BlogPost.findById(data.id);

    if (!existing) {
      return {
        success: false,
        message: "Blog not found.",
      };
    }

    const normalizedSlug =
      data.slug.trim().toLowerCase();

    const duplicate =
      await BlogPost.findOne({
        _id: { $ne: data.id },
        slug: normalizedSlug,
      })
        .select("_id")
        .lean();

    if (duplicate) {
      return {
        success: false,
        message:
          "Another blog already uses this slug.",
        fieldErrors: {
          slug: [
            "This slug is already in use.",
          ],
        },
      };
    }

    const oldSlug = existing.slug;
    const wasPublished = existing.published;

    existing.title =
      data.title.trim();

    existing.slug =
      normalizedSlug;

    existing.excerpt =
      data.excerpt.trim();

    existing.content =
      data.content.trim();

    existing.category =
      data.category.trim();

    existing.tags =
      data.tags
        .map((tag) => tag.trim())
        .filter(Boolean);

    existing.author =
      data.author.trim();

    existing.featuredImage =
      data.featuredImage
        ? {
            url: data.featuredImage.url,
            publicId:
              data.featuredImage.publicId,
            alt:
              data.featuredImage.alt.trim(),
          }
        : undefined;

    existing.seoTitle =
      data.seoTitle.trim();

    existing.seoDescription =
      data.seoDescription.trim();

    existing.featured =
      data.featured;

    existing.published =
      data.published;

    /*
     * Publication date handling:
     *
     * Draft → Published:
     * create publishedAt now.
     *
     * Already Published:
     * preserve existing publishedAt.
     *
     * Published → Draft:
     * remove publishedAt.
     */
    if (data.published) {
      existing.publishedAt =
        wasPublished && existing.publishedAt
          ? existing.publishedAt
          : data.publishedAt ??
            new Date();
    } else {
      existing.publishedAt =
        undefined;
    }

    existing.sortOrder =
      data.sortOrder;

    await existing.save();

    revalidatePath("/blog");

    revalidatePath(
      `/blog/${oldSlug}`,
    );

    revalidatePath(
      `/blog/${existing.slug}`,
    );

    revalidatePath("/admin/blogs");

    return {
      success: true,
      message:
        "Blog updated successfully.",
    };
  } catch (error) {
    console.error(
      "UPDATE_BLOG_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to update the blog right now. Please try again.",
    };
  }
}