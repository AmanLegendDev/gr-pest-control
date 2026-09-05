import type { MetadataRoute } from "next";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.grpestscontrol.com.au/"
).replace(/\/+$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/*?utm_",
          "/*?fbclid=",
          "/*?gclid=",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}