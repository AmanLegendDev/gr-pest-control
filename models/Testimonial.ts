import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export interface ITestimonialImage {
  url: string;
  publicId: string;
  alt: string;
}

export interface ITestimonial extends Document {
  name: string;
  role?: string;
  company?: string;

  content: string;

  rating: number;

  location?: string;

  image?: ITestimonialImage;

  seoTitle?: string;
  seoDescription?: string;

  featured: boolean;
  active: boolean;

  sortOrder: number;

  createdAt: Date;
  updatedAt: Date;
}

const TestimonialImageSchema =
  new Schema<ITestimonialImage>(
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

const TestimonialSchema =
  new Schema<ITestimonial>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120,
      },

      role: {
        type: String,
        trim: true,
        maxlength: 120,
        default: "",
      },

      company: {
        type: String,
        trim: true,
        maxlength: 160,
        default: "",
      },

      content: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 2000,
      },

      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        default: 5,
      },

      location: {
        type: String,
        trim: true,
        maxlength: 120,
        default: "",
      },

      image: {
        type: TestimonialImageSchema,
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
 * Public testimonial ordering.
 */
TestimonialSchema.index({
  active: 1,
  featured: -1,
  sortOrder: 1,
  createdAt: -1,
});

/**
 * Rating based queries.
 */
TestimonialSchema.index({
  rating: -1,
  active: 1,
});

/**
 * Prevent model recompilation during
 * Next.js development/hot reload.
 */
const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>(
    "Testimonial",
    TestimonialSchema,
  );

export default Testimonial;