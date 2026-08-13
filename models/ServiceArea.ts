import mongoose, { Document, Model, Schema } from "mongoose";

export interface IServiceAreaImage {
  url: string;
  publicId: string;
  alt: string;
}

export interface IServiceAreaFAQ {
  question: string;
  answer: string;
  sortOrder: number;
}

export interface IServiceArea extends Document {
  name: string;
  slug: string;

  shortDescription: string;
  description: string;

  image?: IServiceAreaImage;

  highlights: string[];
  nearbyAreas: string[];

  faqs: IServiceAreaFAQ[];

  seoTitle?: string;
  seoDescription?: string;

  featured: boolean;
  active: boolean;
  sortOrder: number;

  createdAt: Date;
  updatedAt: Date;
}

const ServiceAreaImageSchema = new Schema<IServiceAreaImage>(
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
  { _id: false },
);

const ServiceAreaFAQSchema = new Schema<IServiceAreaFAQ>(
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
  { _id: false },
);

const ServiceAreaSchema = new Schema<IServiceArea>(
  {
    name: {
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

    image: {
      type: ServiceAreaImageSchema,
      required: false,
    },

    highlights: {
      type: [String],
      default: [],
      validate: {
        validator: (values: string[]) =>
          values.every(
            (value) =>
              typeof value === "string" &&
              value.trim().length > 0 &&
              value.trim().length <= 200,
          ),
        message: "Invalid service area highlight.",
      },
    },

    nearbyAreas: {
      type: [String],
      default: [],
      validate: {
        validator: (values: string[]) =>
          values.every(
            (value) =>
              typeof value === "string" &&
              value.trim().length > 0 &&
              value.trim().length <= 120,
          ),
        message: "Invalid nearby area.",
      },
    },

    faqs: {
      type: [ServiceAreaFAQSchema],
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
  },
);

ServiceAreaSchema.index({
  active: 1,
  featured: -1,
  sortOrder: 1,
});

const ServiceArea: Model<IServiceArea> =
  mongoose.models.ServiceArea ||
  mongoose.model<IServiceArea>("ServiceArea", ServiceAreaSchema);

export default ServiceArea;