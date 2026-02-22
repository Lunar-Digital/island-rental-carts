import { QAConfig } from "../config";

export async function discoverUrls(config: QAConfig): Promise<string[]> {
  if (config.oneUrl) {
    const url = config.oneUrl.startsWith("http")
      ? config.oneUrl
      : `${config.baseUrl}${config.oneUrl.startsWith("/") ? "" : "/"}${config.oneUrl}`;
    console.log(`  One-URL mode: testing ${url}`);
    return [url];
  }

  if (config.urlMode === "single") {
    console.log(`  Single mode: testing ${config.baseUrl}`);
    return [config.baseUrl];
  }

  const sitemapUrl = `${config.baseUrl}/sitemap.xml`;
  console.log(`  Fetching sitemap: ${sitemapUrl}`);

  try {
    const res = await fetch(sitemapUrl, {
      headers: { "User-Agent": "QA-Audit-Bot/1.0" },
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.warn(
        `  Sitemap returned ${res.status}, falling back to baseUrl + criticalPaths`
      );
      return buildFallbackUrls(config);
    }

    const xml = await res.text();
    const urls = parseSitemapUrls(xml, config.baseUrl);

    if (urls.length === 0) {
      console.warn("  No URLs found in sitemap, using fallback");
      return buildFallbackUrls(config);
    }

    const capped = urls.slice(0, config.maxUrls);
    console.log(
      `  Found ${urls.length} URLs in sitemap, testing ${capped.length}`
    );
    return capped;
  } catch (err) {
    console.warn(`  Sitemap fetch failed: ${err}, using fallback`);
    return buildFallbackUrls(config);
  }
}

function parseSitemapUrls(xml: string, baseUrl: string): string[] {
  const urls: string[] = [];
  const locRegex = /<loc>\s*(.*?)\s*<\/loc>/gi;
  let match: RegExpExecArray | null;

  while ((match = locRegex.exec(xml)) !== null) {
    const url = match[1].trim();
    if (url) urls.push(url);
  }

  const hostname = new URL(baseUrl).hostname;
  const deduped = [...new Set(urls)].filter((u) => {
    try {
      return new URL(u).hostname === hostname;
    } catch {
      return false;
    }
  });

  return deduped;
}

function buildFallbackUrls(config: QAConfig): string[] {
  const paths = config.criticalPaths.length > 0 ? config.criticalPaths : ["/"];
  const urls = paths.map((p) => `${config.baseUrl}${p}`);
  console.log(`  Fallback: ${urls.length} critical paths`);
  return urls.slice(0, config.maxUrls);
}
