import { connectDB } from "@/lib/db/connect";
import SiteSettings from "@/models/SiteSettings";

import type {
  SiteSettingsViewModel,
} from "@/features/settings/types/site-settings";

function mapSiteSettings(
  settings: any,
): SiteSettingsViewModel {
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

    email: settings.email,

    phone: settings.phone,

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
      settings.primaryCTA ??
      "Get a Free Quote",

    currency:
      settings.currency ?? "INR",

    businessHours:
      settings.businessHours?.map(
        (hours: {
          day: string;
          open?: string;
          close?: string;
          closed?: boolean;
        }) => ({
          day: hours.day,
          open: hours.open ?? "",
          close: hours.close ?? "",
          closed:
            hours.closed ?? false,
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

    active: settings.active,

    createdAt:
      new Date(
        settings.createdAt,
      ).toISOString(),

    updatedAt:
      new Date(
        settings.updatedAt,
      ).toISOString(),
  };
}

/**
 * Get the single global website settings document.
 */
export async function getSiteSettings(): Promise<
  SiteSettingsViewModel | null
> {
  await connectDB();

  const settings =
    await SiteSettings.findOne({
      active: true,
    })
      .lean();

  if (!settings) {
    return null;
  }

  return mapSiteSettings(settings);
}