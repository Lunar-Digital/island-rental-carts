import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/env";
import { sanityFetch } from "@/sanity/lib/client";
import { POST_SLUGS_QUERY } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  // Base pages: omit lastmod so we don't send sitemap-generation date (2026 best practice:
  // lastmod must reflect actual content change; search engines distrust identical lastmod values).
  const base: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/blog`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];

  try {
    const posts = await sanityFetch<
      { slug: string; lastModified?: string | null }[]
    >({
      query: POST_SLUGS_QUERY,
      revalidate: 3600,
    });
    // Blog posts: real lastmod from Sanity (ISO 8601); priority in 0.6–0.8 range for articles (2026).
    // Use explicit null check so we never spread null (GROQ coalesce can return null if both fields missing).
    const postEntries: MetadataRoute.Sitemap = (posts ?? []).map(
      ({ slug, lastModified: updated }) => ({
        url: `${siteUrl}/blog/${slug}`,
        ...(updated != null ? { lastModified: new Date(updated) } : {}),
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })
    );
    return [...base, ...postEntries];
  } catch {
    return base;
  }
}
