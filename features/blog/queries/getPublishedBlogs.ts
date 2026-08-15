import BlogPost from "@/models/BlogPost";

export async function getPublishedBlogs() {
  const posts = await BlogPost.find({
    published: true,
    publishedAt: {
      $lte: new Date(),
    },
  })
    .select({
      _id: 1,
      title: 1,
      slug: 1,
      excerpt: 1,
      category: 1,
      tags: 1,
      author: 1,
      featuredImage: 1,
      featured: 1,
      publishedAt: 1,
      sortOrder: 1,
    })
    .sort({
      featured: -1,
      sortOrder: 1,
      publishedAt: -1,
    })
    .lean()
    .exec();

  return posts.map((post) => ({
    id: String(post._id),

    title: post.title,

    slug: post.slug,

    excerpt: post.excerpt,

    category: post.category,

    tags: post.tags ?? [],

    author: post.author,

    featuredImage: post.featuredImage
      ? {
          url: post.featuredImage.url,
          publicId:
            post.featuredImage.publicId,
          alt: post.featuredImage.alt,
        }
      : undefined,

    featured: Boolean(post.featured),

    publishedAt: post.publishedAt
      ? new Date(
          post.publishedAt,
        ).toISOString()
      : undefined,

    sortOrder:
      post.sortOrder ?? 0,
  }));
}

export type PublishedBlog =
  Awaited<
    ReturnType<
      typeof getPublishedBlogs
    >
  >[number];