import type { MetadataRoute } from "next";
import { getSiteUrl, isProduction } from "@/lib/env";

/**
 * Production: Set NEXT_PUBLIC_SITE_URL=https://islandrentalcarts.com in Vercel
 * so isProduction() is true and crawlers are allowed. Otherwise robots disallow all.
 */
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
      disallow: ["/admin", "/api"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
