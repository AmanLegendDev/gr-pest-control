import { getSiteSettings } from "@/features/settings/queries/getSiteSettings";

import Navbar from "./Navbar";

export default async function Navigation() {
  const settings = await getSiteSettings();

  if (!settings) {
    return null;
  }

  return <Navbar settings={settings} />;
}