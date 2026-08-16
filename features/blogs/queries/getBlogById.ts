import mongoose from "mongoose";

import { connectDB } from "@/lib/db/connect";
import BlogPost from "@/models/BlogPost";

import type { BlogAdminViewModel } from "@/features/blogs/types/blog";

export async function getBlogById(
  id: string,
): Promise<BlogAdminViewModel | null> {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  await connectDB();

  const blog = await BlogPost.findById(id)
    .select({
      _id: 1,
      title: 1,
      slug: 1,
      excerpt: 1,
      content: 1,
      category: 1,
      tags: 1,
      author: 1,
      featuredImage: 1,
      seoTitle: 1,
      seoDescription: 1,
      featured: 1,
      published: 1,
      publishedAt: 1,
      sortOrder: 1,
      createdAt: 1,
      updatedAt: 1,
    })
    .lean();

  if (!blog) {
    return null;
  }

  return {
    id: String(blog._id),

    title: blog.title,

    slug: blog.slug,

    excerpt: blog.excerpt,

    content: blog.content,

    category: blog.category ?? "",

    tags: blog.tags ?? [],

    author: blog.author,

    featuredImage: blog.featuredImage
      ? {
          url: blog.featuredImage.url,
          publicId: blog.featuredImage.publicId,
          alt: blog.featuredImage.alt,
        }
      : undefined,

    seoTitle: blog.seoTitle ?? "",

    seoDescription:
      blog.seoDescription ?? "",

    featured: blog.featured,

    published: blog.published,

    publishedAt: blog.publishedAt
      ? new Date(blog.publishedAt).toISOString()
      : undefined,

    sortOrder: blog.sortOrder,

    createdAt: new Date(
      blog.createdAt,
    ).toISOString(),

    updatedAt: new Date(
      blog.updatedAt,
    ).toISOString(),
  };
}