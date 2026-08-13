import { connectDB } from "@/lib/db/connect";
import BlogPost from "@/models/BlogPost";

import type {
  BlogAdminViewModel,
  BlogPublicViewModel,
} from "@/features/blogs/types/blog";

export async function getPublishedBlogs(
  limit?: number,
): Promise<BlogPublicViewModel[]> {
  await connectDB();

  const query = BlogPost.find({
    published: true,
  })
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
      featured: 1,
      publishedAt: 1,
    })
    .sort({
      featured: -1,
      publishedAt: -1,
      sortOrder: 1,
    });

  if (typeof limit === "number" && limit > 0) {
    query.limit(Math.min(limit, 100));
  }

  const blogs = await query.lean();

  return blogs.map((blog) => ({
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
          alt: blog.featuredImage.alt,
        }
      : undefined,
    featured: blog.featured,
    publishedAt: blog.publishedAt
      ? new Date(blog.publishedAt).toISOString()
      : undefined,
  }));
}

export async function getAdminBlogs(
  limit = 50,
): Promise<BlogAdminViewModel[]> {
  await connectDB();

  const safeLimit = Math.min(Math.max(limit, 1), 100);

  const blogs = await BlogPost.find({})
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
    .sort({
      createdAt: -1,
    })
    .limit(safeLimit)
    .lean();

  return blogs.map((blog) => ({
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
    seoDescription: blog.seoDescription ?? "",
    featured: blog.featured,
    published: blog.published,
    publishedAt: blog.publishedAt
      ? new Date(blog.publishedAt).toISOString()
      : undefined,
    sortOrder: blog.sortOrder,
    createdAt: new Date(blog.createdAt).toISOString(),
    updatedAt: new Date(blog.updatedAt).toISOString(),
  }));
}