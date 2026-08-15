import SiteSettings from "@/models/SiteSettings";

export async function getSiteSettings() {
  const settings =
    await SiteSettings.findOne({
      active: true,
    })
      .select({
        _id: 1,
        businessName: 1,
        shortDescription: 1,
        logo: 1,

        email: 1,
        phone: 1,
        whatsapp: 1,

        address: 1,
        city: 1,
        state: 1,
        pincode: 1,

        socialLinks: 1,

        primaryCTA: 1,
        currency: 1,

        businessHours: 1,

        siteTitle: 1,
        siteDescription: 1,

        favicon: 1,

        active: 1,

        createdAt: 1,
        updatedAt: 1,
      })
      .lean()
      .exec();

  if (!settings) {
    return null;
  }

  return {
    id: String(settings._id),

    businessName:
      settings.businessName,

    shortDescription:
      settings.shortDescription ?? "",

    logo: settings.logo
      ? {
          url: settings.logo.url,
          publicId:
            settings.logo.publicId,
          alt: settings.logo.alt,
        }
      : undefined,

    email:
      settings.email,

    phone:
      settings.phone,

    whatsapp:
      settings.whatsapp ?? "",

    address:
      settings.address ?? "",

    city:
      settings.city ?? "",

    state:
      settings.state ?? "",

    pincode:
      settings.pincode ?? "",

    socialLinks: {
      facebook:
        settings.socialLinks?.facebook ??
        "",

      instagram:
        settings.socialLinks?.instagram ??
        "",

      youtube:
        settings.socialLinks?.youtube ??
        "",

      googleBusiness:
        settings.socialLinks?.googleBusiness ??
        "",
    },

    primaryCTA:
      settings.primaryCTA ||
      "Get a Free Quote",

    currency:
      settings.currency || "INR",

    businessHours:
      settings.businessHours?.map(
        (hour) => ({
          day: hour.day,
          open: hour.open,
          close: hour.close,
          closed: hour.closed,
        }),
      ) ?? [],

    siteTitle:
      settings.siteTitle ?? "",

    siteDescription:
      settings.siteDescription ?? "",

    favicon: settings.favicon
      ? {
          url: settings.favicon.url,
          publicId:
            settings.favicon.publicId,
          alt: settings.favicon.alt,
        }
      : undefined,

    active:
      Boolean(settings.active),

    createdAt: new Date(
      settings.createdAt,
    ).toISOString(),

    updatedAt: new Date(
      settings.updatedAt,
    ).toISOString(),
  };
}

export type AboutSiteSettings =
  NonNullable<
    Awaited<
      ReturnType<
        typeof getSiteSettings
      >
    >
  >;