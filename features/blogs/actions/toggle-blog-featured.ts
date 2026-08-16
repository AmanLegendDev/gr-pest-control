"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/require-admin";
import { connectDB } from "@/lib/db/connect";
import BlogPost from "@/models/BlogPost";

export async function toggleBlogFeatured(
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

    blog.featured =
      !blog.featured;

    await blog.save();

    revalidatePath("/blog");
    revalidatePath("/admin/blogs");

    return {
      success: true,
      featured: blog.featured,
      message: blog.featured
        ? "Blog marked as featured."
        : "Blog removed from featured.",
    };
  } catch (error) {
    console.error(
      "TOGGLE_BLOG_FEATURED_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to update featured status.",
    };
  }
}