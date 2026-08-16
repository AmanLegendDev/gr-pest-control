"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/require-admin";
import { connectDB } from "@/lib/db/connect";
import BlogPost from "@/models/BlogPost";

export async function deleteBlog(
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

    /*
     * Delete database document.
     *
     * IMPORTANT:
     * Cloudinary image deletion should be
     * handled separately if your project
     * already has a Cloudinary delete helper.
     */
    await BlogPost.deleteOne({
      _id: blogId,
    });

    revalidatePath("/blog");
    revalidatePath(
      `/blog/${blog.slug}`,
    );
    revalidatePath("/admin/blogs");

    return {
      success: true,
      message:
        "Blog deleted successfully.",
    };
  } catch (error) {
    console.error(
      "DELETE_BLOG_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to delete the blog right now.",
    };
  }
}