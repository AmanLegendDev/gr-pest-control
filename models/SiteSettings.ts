import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export interface ISiteLogo {
  url: string;
  publicId: string;
  alt: string;
}

export interface ISocialLinks {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  googleBusiness?: string;
}

export interface IBusinessHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export interface ISiteSettings extends Document {
  businessName: string;
  shortDescription: string;

  logo?: ISiteLogo;

  email: string;
  phone: string;
  whatsapp: string;

  address: string;
  city: string;
  state: string;
  pincode: string;

  socialLinks: ISocialLinks;

  primaryCTA: string;
  currency: string;

  businessHours: IBusinessHours[];

  siteTitle: string;
  siteDescription: string;

  favicon?: ISiteLogo;

  active: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const SiteLogoSchema = new Schema<ISiteLogo>(
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

const SocialLinksSchema =
  new Schema<ISocialLinks>(
    {
      facebook: {
        type: String,
        trim: true,
        default: "",
      },

      instagram: {
        type: String,
        trim: true,
        default: "",
      },

      youtube: {
        type: String,
        trim: true,
        default: "",
      },

      googleBusiness: {
        type: String,
        trim: true,
        default: "",
      },
    },
    {
      _id: false,
    },
  );

const BusinessHoursSchema =
  new Schema<IBusinessHours>(
    {
      day: {
        type: String,
        required: true,
        trim: true,
      },

      open: {
        type: String,
        trim: true,
        default: "",
      },

      close: {
        type: String,
        trim: true,
        default: "",
      },

      closed: {
        type: Boolean,
        default: false,
      },
    },
    {
      _id: false,
    },
  );

const SiteSettingsSchema =
  new Schema<ISiteSettings>(
    {
      businessName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 160,
      },

      shortDescription: {
        type: String,
        trim: true,
        maxlength: 500,
        default: "",
      },

      logo: {
        type: SiteLogoSchema,
        required: false,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 160,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
      },

      whatsapp: {
        type: String,
        trim: true,
        maxlength: 30,
        default: "",
      },

      address: {
        type: String,
        trim: true,
        maxlength: 300,
        default: "",
      },

      city: {
        type: String,
        trim: true,
        maxlength: 100,
        default: "",
      },

      state: {
        type: String,
        trim: true,
        maxlength: 100,
        default: "",
      },

      pincode: {
        type: String,
        trim: true,
        maxlength: 20,
        default: "",
      },

      socialLinks: {
        type: SocialLinksSchema,
        default: () => ({}),
      },

      primaryCTA: {
        type: String,
        trim: true,
        maxlength: 100,
        default: "Get a Free Quote",
      },

      currency: {
        type: String,
        trim: true,
        maxlength: 10,
        default: "INR",
      },

      businessHours: {
        type: [BusinessHoursSchema],
        default: [],
      },

      siteTitle: {
        type: String,
        trim: true,
        maxlength: 70,
        default: "",
      },

      siteDescription: {
        type: String,
        trim: true,
        maxlength: 160,
        default: "",
      },

      favicon: {
        type: SiteLogoSchema,
        required: false,
      },

      active: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    },
  );

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>(
    "SiteSettings",
    SiteSettingsSchema,
  );

export default SiteSettings;