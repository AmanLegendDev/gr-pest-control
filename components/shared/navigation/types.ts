import type { ISiteSettings } from "@/models/SiteSettings";
import type { SiteSettingsViewModel } from "@/features/settings/types/site-settings";
export type NavigationItem = {
  label: string;
  href: string;
};

export type NavbarProps = {
  settings: SiteSettingsViewModel;
};

export type MobileNavProps = {
  settings: SiteSettingsViewModel;
  open: boolean;
  onClose: () => void;
};

export type PageTransitionProps = {
  children: React.ReactNode;
};

export type NavigationLinkProps = {
  item: NavigationItem;
  onNavigate?: () => void;
};