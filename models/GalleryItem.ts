import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export interface IGalleryImage {
  url: string;
  publicId: string;
  alt: string;
}

export interface IGalleryItem extends Document {
  title: string;
  slug: string;

  description: string;

  category:
    | "home"
    | "workplace"
    | "commercial"
    | "residential"
    | "treatment"
    | "team"
    | "other";

  image: IGalleryImage;

  seoTitle?: string;
  seoDescription?: string;

  featured: boolean;
  active: boolean;

  sortOrder: number;

  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
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

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 180,
      index: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    category: {
      type: String,
      enum: [
        "home",
        "workplace",
        "commercial",
        "residential",
        "treatment",
        "team",
        "other",
      ],
      required: true,
      index: true,
    },

    image: {
      type: GalleryImageSchema,
      required: true,
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

    active: {
      type: Boolean,
      default: true,
      index: true,
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
 * Public gallery ordering.
 */
GalleryItemSchema.index({
  active: 1,
  featured: -1,
  sortOrder: 1,
  createdAt: -1,
});

/**
 * Category filtering.
 */
GalleryItemSchema.index({
  category: 1,
  active: 1,
});

/**
 * Prevent unnecessary model recompilation
 * during Next.js development/hot reload.
 */
const GalleryItem: Model<IGalleryItem> =
  mongoose.models.GalleryItem ||
  mongoose.model<IGalleryItem>(
    "GalleryItem",
    GalleryItemSchema,
  );

export default GalleryItem;