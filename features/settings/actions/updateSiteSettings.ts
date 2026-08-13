"use server";

import { getServerSession } from "next-auth";

import {
  authOptions,
} from "@/lib/auth/auth-options";

import { connectDB } from "@/lib/db/connect";

import SiteSettings from "@/models/SiteSettings";

import {
  siteSettingsSchema,
  type SiteSettingsFormValues,
} from "@/features/settings/schemas/site-settings-schema";

interface UpdateSiteSettingsSuccess {
  success: true;
  settingsId: string;
}

interface UpdateSiteSettingsFailure {
  success: false;
  message: string;
  fieldErrors?: Record<
    string,
    string[]
  >;
}

export type UpdateSiteSettingsResult =
  | UpdateSiteSettingsSuccess
  | UpdateSiteSettingsFailure;

export async function updateSiteSettings(
  values: SiteSettingsFormValues,
): Promise<UpdateSiteSettingsResult> {
  try {
    /* -----------------------------
       Admin Authentication
    ----------------------------- */

    const session =
      await getServerSession(
        authOptions,
      );

    if (
      !session?.user ||
      session.user.role !== "ADMIN"
    ) {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    /* -----------------------------
       Server Validation
    ----------------------------- */

    const parsed =
      siteSettingsSchema.safeParse(
        values,
      );

    if (!parsed.success) {
      return {
        success: false,
        message:
          "Please correct the highlighted fields.",
        fieldErrors:
          parsed.error.flatten()
            .fieldErrors,
      };
    }

    const data = parsed.data;

    /* -----------------------------
       Database
    ----------------------------- */

    await connectDB();

    /* -----------------------------
       Singleton Settings
    ----------------------------- */

    const existingSettings =
      await SiteSettings.findOne({});

    const settingsData = {
      businessName:
        data.businessName.trim(),

      shortDescription:
        data.shortDescription.trim(),

      logo: data.logo
        ? {
            url: data.logo.url,
            publicId:
              data.logo.publicId,
            alt:
              data.logo.alt.trim(),
          }
        : undefined,

      email:
        data.email.trim().toLowerCase(),

      phone:
        data.phone.trim(),

      whatsapp:
        data.whatsapp.trim(),

      address:
        data.address.trim(),

      city:
        data.city.trim(),

      state:
        data.state.trim(),

      pincode:
        data.pincode.trim(),

      socialLinks: {
        facebook:
          data.socialLinks.facebook?.trim() ??
          "",

        instagram:
          data.socialLinks.instagram?.trim() ??
          "",

        youtube:
          data.socialLinks.youtube?.trim() ??
          "",

        googleBusiness:
          data.socialLinks.googleBusiness?.trim() ??
          "",
      },

      primaryCTA:
        data.primaryCTA.trim(),

      currency:
        data.currency.trim(),

      businessHours:
        data.businessHours.map(
          (hours) => ({
            day: hours.day.trim(),
            open: hours.open.trim(),
            close: hours.close.trim(),
            closed: hours.closed,
          }),
        ),

      siteTitle:
        data.siteTitle.trim(),

      siteDescription:
        data.siteDescription.trim(),

      favicon: data.favicon
        ? {
            url: data.favicon.url,
            publicId:
              data.favicon.publicId,
            alt:
              data.favicon.alt.trim(),
          }
        : undefined,

      active: data.active,
    };

    /* -----------------------------
       Update Existing Settings
    ----------------------------- */

    if (existingSettings) {
      await SiteSettings.findByIdAndUpdate(
        existingSettings._id,
        settingsData,
        {
          new: true,
          runValidators: true,
        },
      );

      return {
        success: true,
        settingsId: String(
          existingSettings._id,
        ),
      };
    }

    /* -----------------------------
       Create First Settings Document
    ----------------------------- */

    const createdSettings =
      await SiteSettings.create(
        settingsData,
      );

    return {
      success: true,
      settingsId: String(
        createdSettings._id,
      ),
    };
  } catch (error) {
    console.error(
      "UPDATE_SITE_SETTINGS_ERROR",
      error,
    );

    return {
      success: false,
      message:
        "Unable to save site settings right now. Please try again.",
    };
  }
}