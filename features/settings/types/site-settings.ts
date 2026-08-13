import type {
  ISiteLogo,
  ISocialLinks,
  IBusinessHours,
  ISiteSettings,
} from "@/models/SiteSettings";

export type SiteLogo = ISiteLogo;

export type SocialLinks = ISocialLinks;

export type BusinessHours = IBusinessHours;

export interface SiteSettingsViewModel {
  id: string;

  businessName: string;
  shortDescription: string;

  logo?: SiteLogo;

  email: string;
  phone: string;
  whatsapp: string;

  address: string;
  city: string;
  state: string;
  pincode: string;

  socialLinks: SocialLinks;

  primaryCTA: string;
  currency: string;

  businessHours: BusinessHours[];

  siteTitle: string;
  siteDescription: string;

  favicon?: SiteLogo;

  active: boolean;

  createdAt: string;
  updatedAt: string;
}

export type SiteSettingsDocument =
  ISiteSettings;