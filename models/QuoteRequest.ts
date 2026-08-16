import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

/* =========================================================
   TYPES
========================================================= */

export type QuoteRequestStatus =
  | "pending"
  | "in-progress"
  | "completed"
  | "cancelled";

export type QuotePropertyType =
  | "residential"
  | "commercial";

/* =========================================================
   SERVICE SNAPSHOT
========================================================= */

export interface IQuoteServiceSnapshot {
  id: string;
  title: string;
  slug: string;
}

/* =========================================================
   QUOTE REQUEST
========================================================= */

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

  /**
   * Archived requests remain in the database
   * but are hidden from the normal admin listing.
   */
  archived: boolean;

  createdAt: Date;
  updatedAt: Date;
}

/* =========================================================
   SERVICE SNAPSHOT SCHEMA
========================================================= */

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

/* =========================================================
   MAIN SCHEMA
========================================================= */

const QuoteRequestSchema =
  new Schema<IQuoteRequest>(
    {
      /* -----------------------------------------------------
         Request Number
      ----------------------------------------------------- */

      requestNumber: {
        type: Number,
        required: true,
        unique: true,
        index: true,
        min: 1,
      },

      /* -----------------------------------------------------
         Public Reference Number
      ----------------------------------------------------- */

      referenceNumber: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        uppercase: true,
        maxlength: 40,
      },

      /* -----------------------------------------------------
         Customer
      ----------------------------------------------------- */

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

      /* -----------------------------------------------------
         Service Snapshot
      ----------------------------------------------------- */

      service: {
        type: QuoteServiceSnapshotSchema,
        required: true,
      },

      /* -----------------------------------------------------
         Property
      ----------------------------------------------------- */

      propertyType: {
        type: String,
        enum: [
          "residential",
          "commercial",
        ],
        required: true,
      },

      /* -----------------------------------------------------
         Location
      ----------------------------------------------------- */

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

      /* -----------------------------------------------------
         Pest Problem
      ----------------------------------------------------- */

      pestProblem: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000,
      },

      /* -----------------------------------------------------
         Preferred Schedule
      ----------------------------------------------------- */

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

      /* -----------------------------------------------------
         Status
      ----------------------------------------------------- */

      status: {
        type: String,
        enum: [
          "pending",
          "in-progress",
          "completed",
          "cancelled",
        ],
        default: "pending",
        index: true,
      },

      /* -----------------------------------------------------
         Archive
      ----------------------------------------------------- */

      archived: {
        type: Boolean,
        default: false,
        index: true,
      },
    },
    {
      timestamps: true,
    },
  );

/* =========================================================
   INDEXES
========================================================= */

/**
 * Main admin listing.
 *
 * Example:
 * active requests
 * → newest first
 */
QuoteRequestSchema.index({
  archived: 1,
  createdAt: -1,
});

/**
 * Status dashboard filtering.
 *
 * Example:
 * pending requests
 * completed requests
 * cancelled requests
 */
QuoteRequestSchema.index({
  status: 1,
  archived: 1,
  createdAt: -1,
});

/**
 * Recent requests.
 */
QuoteRequestSchema.index({
  createdAt: -1,
});

/**
 * Customer search support.
 */
QuoteRequestSchema.index({
  "customer.name": 1,
  "customer.phone": 1,
});

/* =========================================================
   DEVELOPMENT / HOT RELOAD SAFE MODEL
========================================================= */

const QuoteRequest: Model<IQuoteRequest> =
  mongoose.models.QuoteRequest ||
  mongoose.model<IQuoteRequest>(
    "QuoteRequest",
    QuoteRequestSchema,
  );

export default QuoteRequest;