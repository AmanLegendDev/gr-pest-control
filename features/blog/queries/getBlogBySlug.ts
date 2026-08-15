import BlogPost from "@/models/BlogPost";

export async function getBlogBySlug(
  slug: string,
) {
  const normalizedSlug = slug
    .trim()
    .toLowerCase();

  if (!normalizedSlug) {
    return null;
  }

  const post = await BlogPost.findOne({
    slug: normalizedSlug,

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
    .lean()
    .exec();

  if (!post) {
    return null;
  }

  return {
    id: String(post._id),

    title: post.title,

    slug: post.slug,

    excerpt: post.excerpt,

    content: post.content,

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

    seoTitle:
      post.seoTitle || "",

    seoDescription:
      post.seoDescription || "",

    featured: Boolean(
      post.featured,
    ),

    published: Boolean(
      post.published,
    ),

    publishedAt: post.publishedAt
      ? new Date(
          post.publishedAt,
        ).toISOString()
      : undefined,

    sortOrder:
      post.sortOrder ?? 0,

    createdAt: new Date(
      post.createdAt,
    ).toISOString(),

    updatedAt: new Date(
      post.updatedAt,
    ).toISOString(),
  };
}

export type BlogDetail =
  NonNullable<
    Awaited<
      ReturnType<
        typeof getBlogBySlug
      >
    >
  >;