"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/require-admin";
import { connectDB } from "@/lib/db/connect";
import BlogPost from "@/models/BlogPost";

export async function toggleBlogPublished(
  blogId: string,
) {
  try {
    await requireAdmin();

    if (
      !mongoose.Types.ObjectId.isValid(
        blogId,
      )
    ) {
      return {
        success: false,
        message: "Invalid blog ID.",
      };
    }

    await connectDB();

    const blog =
      await BlogPost.findById(blogId);

    if (!blog) {
      return {
        success: false,
        message: "Blog not found.",
      };
    }

    if (blog.published) {
      blog.published = false;
      blog.publishedAt = undefined;
    } else {
      blog.published = true;
      blog.publishedAt =
        new Date();
    }

    await blog.save();

    revalidatePath("/blog");
    revalidatePath(
      `/blog/${blog.slug}`,
    );
    revalidatePath("/admin/blogs");

    return {
      success: true,
      published: blog.published,
      message: blog.published
        ? "Blog published successfully."
        : "Blog unpublished successfully.",
    };
  } catch (error) {
    console.error(
      "TOGGLE_BLOG_PUBLISHED_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to update blog publishing status.",
    };
  }
}