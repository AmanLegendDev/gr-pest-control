import mongoose, { Document, Model, Schema } from "mongoose";

export interface IBlogImage {
  url: string;
  publicId: string;
  alt: string;
}

export interface IBlogPost extends Document {
  title: string;
  slug: string;

  excerpt: string;
  content: string;

  category: string;
  tags: string[];

  author: string;

  featuredImage?: IBlogImage;

  seoTitle?: string;
  seoDescription?: string;

  featured: boolean;
  published: boolean;

  publishedAt?: Date;

  sortOrder: number;

  createdAt: Date;
  updatedAt: Date;
}

const BlogImageSchema = new Schema<IBlogImage>(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },

    publicId: {
      type: String,
      required: true,
      trim: true,
    },

    alt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
  },
  {
    _id: false,
  },
);

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 200,
      index: true,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100000,
    },

    category: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
      index: true,
    },

    tags: {
      type: [String],
      default: [],
      validate: {
        validator: (values: string[]) =>
          values.every(
            (value) =>
              typeof value === "string" &&
              value.trim().length > 0 &&
              value.trim().length <= 60,
          ),
        message: "Invalid blog tag.",
      },
    },

    author: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    featuredImage: {
      type: BlogImageSchema,
      required: false,
    },

    seoTitle: {
      type: String,
      trim: true,
      maxlength: 70,
      default: "",
    },

    seoDescription: {
      type: String,
      trim: true,
      maxlength: 160,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
      index: true,
    },

    published: {
      type: Boolean,
      default: false,
      index: true,
    },

    publishedAt: {
      type: Date,
      required: false,
    },

    sortOrder: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Public blog listing:
 * published posts first, then manual order.
 */
BlogPostSchema.index({
  published: 1,
  featured: -1,
  sortOrder: 1,
  publishedAt: -1,
});

/**
 * Category filtering.
 */
BlogPostSchema.index({
  category: 1,
  published: 1,
});

/**
 * Prevent duplicate model compilation
 * during Next.js development/hot reload.
 */
const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

export default BlogPost;