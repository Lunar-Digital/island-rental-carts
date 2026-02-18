import type { MetadataRoute } from "next";
import { getSiteUrl, isProduction } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  if (!isProduction()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
