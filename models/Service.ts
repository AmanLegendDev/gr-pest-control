import mongoose, { Document, Model, Schema } from "mongoose";

export interface IServiceImage {
  url: string;
  publicId: string;
  alt: string;
}

export interface IServiceProcessStep {
  title: string;
  description: string;
  sortOrder: number;
}

export interface IServiceFAQ {
  question: string;
  answer: string;
  sortOrder: number;
}

export interface IService extends Document {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;

  heroImage?: IServiceImage;

  icon?: string;

  pestTypes: string[];
  benefits: string[];

  process: IServiceProcessStep[];

  faqs: IServiceFAQ[];

  seoTitle?: string;
  seoDescription?: string;

  featured: boolean;
  active: boolean;
  sortOrder: number;

  createdAt: Date;
  updatedAt: Date;
}

const ServiceImageSchema = new Schema<IServiceImage>(
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
  { _id: false }
);

const ServiceProcessStepSchema = new Schema<IServiceProcessStep>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    sortOrder: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: false }
);

const ServiceFAQSchema = new Schema<IServiceFAQ>(
  {
    question: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    answer: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    sortOrder: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: false }
);

const ServiceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 140,
      index: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
      index: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10000,
    },

    heroImage: {
      type: ServiceImageSchema,
      required: false,
    },

    icon: {
      type: String,
      trim: true,
      maxlength: 80,
      default: "",
    },

    pestTypes: {
      type: [String],
      default: [],
      validate: {
        validator: (values: string[]) =>
          values.every(
            (value) =>
              typeof value === "string" &&
              value.trim().length > 0 &&
              value.trim().length <= 100
          ),
        message: "Invalid pest type.",
      },
    },

    benefits: {
      type: [String],
      default: [],
      validate: {
        validator: (values: string[]) =>
          values.every(
            (value) =>
              typeof value === "string" &&
              value.trim().length > 0 &&
              value.trim().length <= 300
          ),
        message: "Invalid service benefit.",
      },
    },

    process: {
      type: [ServiceProcessStepSchema],
      default: [],
    },

    faqs: {
      type: [ServiceFAQSchema],
      default: [],
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
  }
);

/**
 * Useful public/admin listing query:
 * active services ordered by manual CMS order.
 */
ServiceSchema.index({
  active: 1,
  featured: -1,
  sortOrder: 1,
});

/**
 * Category filtering.
 */
ServiceSchema.index({
  category: 1,
  active: 1,
});

/**
 * Prevent unnecessary model recompilation during Next.js hot reload.
 */
const Service: Model<IService> =
  mongoose.models.Service ||
  mongoose.model<IService>("Service", ServiceSchema);

export default Service;