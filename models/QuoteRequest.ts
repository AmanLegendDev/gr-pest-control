import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export type QuoteRequestStatus =
  | "new"
  | "contacted"
  | "quoted"
  | "confirmed"
  | "completed"
  | "cancelled";

export type QuotePropertyType =
  | "residential"
  | "commercial";

export interface IQuoteServiceSnapshot {
  id: string;
  title: string;
  slug: string;
}

export interface IQuoteRequest
  extends Document {
    requestNumber: number;
  referenceNumber: string;

  customer: {
    name: string;
    phone: string;
    email: string;
  };

  service: IQuoteServiceSnapshot;

  propertyType: QuotePropertyType;

  location: {
    suburb: string;
    address: string;
  };

  pestProblem: string;

  preferredDate: string;
  preferredTime: string;

  status: QuoteRequestStatus;

  createdAt: Date;
  updatedAt: Date;
}

const QuoteServiceSnapshotSchema =
  new Schema<IQuoteServiceSnapshot>(
    {
      id: {
        type: String,
        required: true,
        trim: true,
      },

      title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120,
      },

      slug: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 140,
      },
    },
    {
      _id: false,
    },
  );

const QuoteRequestSchema =
  new Schema<IQuoteRequest>(
    {


        requestNumber: {
  type: Number,
  required: true,
  unique: true,
  index: true,
  min: 1,
},
      referenceNumber: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        uppercase: true,
        maxlength: 40,
      },

      customer: {
        name: {
          type: String,
          required: true,
          trim: true,
          maxlength: 120,
        },

        phone: {
          type: String,
          required: true,
          trim: true,
          maxlength: 30,
        },

        email: {
          type: String,
          trim: true,
          lowercase: true,
          maxlength: 160,
          default: "",
        },
      },

      service: {
        type: QuoteServiceSnapshotSchema,
        required: true,
      },

      propertyType: {
        type: String,
        enum: [
          "residential",
          "commercial",
        ],
        required: true,
      },

      location: {
        suburb: {
          type: String,
          required: true,
          trim: true,
          maxlength: 120,
        },

        address: {
          type: String,
          required: true,
          trim: true,
          maxlength: 300,
        },
      },

      pestProblem: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000,
      },

      preferredDate: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20,
      },

      preferredTime: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
      },

      status: {
        type: String,
        enum: [
          "new",
          "contacted",
          "quoted",
          "confirmed",
          "completed",
          "cancelled",
        ],
        default: "new",
        index: true,
      },
    },
    {
      timestamps: true,
    },
  );

/*
 * Admin listing.
 */
QuoteRequestSchema.index({
  status: 1,
  createdAt: -1,
});

/*
 * Recent requests.
 */
QuoteRequestSchema.index({
  createdAt: -1,
});

const QuoteRequest: Model<IQuoteRequest> =
  mongoose.models.QuoteRequest ||
  mongoose.model<IQuoteRequest>(
    "QuoteRequest",
    QuoteRequestSchema,
  );

export default QuoteRequest;