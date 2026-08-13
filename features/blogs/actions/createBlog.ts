"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth-options";
import { connectDB } from "@/lib/db/connect";

import BlogPost from "@/models/BlogPost";

import {
  blogSchema,
  type BlogFormValues,
} from "@/features/blogs/schemas/blog-schema";

interface CreateBlogSuccess {
  success: true;
  blogId: string;
}

interface CreateBlogFailure {
  success: false;
  message: string;
  fieldErrors?: Record<string, string[]>;
}

export type CreateBlogResult =
  | CreateBlogSuccess
  | CreateBlogFailure;

export async function createBlog(
  values: BlogFormValues,
): Promise<CreateBlogResult> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "ADMIN") {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    const parsed = blogSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        message: "Please correct the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    const data = parsed.data;

    await connectDB();

    const normalizedSlug = data.slug
      .trim()
      .toLowerCase();

    const existingBlog = await BlogPost.findOne({
      slug: normalizedSlug,
    })
      .select({
        _id: 1,
      })
      .lean();

    if (existingBlog) {
      return {
        success: false,
        message: "A blog with this slug already exists.",
        fieldErrors: {
          slug: ["This slug is already in use."],
        },
      };
    }

    const now = new Date();

    const blog = await BlogPost.create({
      title: data.title.trim(),

      slug: normalizedSlug,

      excerpt: data.excerpt.trim(),

      content: data.content.trim(),

      category: data.category.trim(),

      tags: data.tags
        .map((tag) => tag.trim())
        .filter(Boolean),

      author: data.author.trim(),

      featuredImage: data.featuredImage
        ? {
            url: data.featuredImage.url,
            publicId: data.featuredImage.publicId,
            alt: data.featuredImage.alt.trim(),
          }
        : undefined,

      seoTitle: data.seoTitle.trim(),

      seoDescription: data.seoDescription.trim(),

      featured: data.featured,

      published: data.published,

      publishedAt: data.published
        ? data.publishedAt ?? now
        : undefined,

      sortOrder: data.sortOrder,
    });

    return {
      success: true,
      blogId: String(blog._id),
    };
  } catch (error) {
    console.error("CREATE_BLOG_ERROR", error);

    return {
      success: false,
      message:
        "Unable to create the blog right now. Please try again.",
    };
  }
}