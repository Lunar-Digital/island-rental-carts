/**
 * Verify islandrentalcarts.com is running as production (robots allow, sitemap points to live).
 * Run: npx tsx scripts/verify-production.ts
 */
const PRODUCTION_URL = "https://islandrentalcarts.com";

async function main() {
  console.log("Checking", PRODUCTION_URL, "...\n");

  try {
    const res = await fetch(`${PRODUCTION_URL}/robots.txt`, {
      headers: { "User-Agent": "VerifyProduction/1.0" },
    });
    const text = await res.text();

    if (!res.ok) {
      console.error("❌ robots.txt returned status", res.status);
      process.exit(1);
    }

    const hasAllow = text.includes("Allow: /");
    const hasSitemap = text.includes("Sitemap: " + PRODUCTION_URL);
    const hasDisallowAdmin = text.includes("Disallow: /admin");
    const blocksAll = /Disallow:\s*\/\s*$/m.test(text) && !hasAllow;

    if (blocksAll) {
      console.error("❌ PRODUCTION MODE: NO");
      console.error("   robots.txt is blocking all crawlers (Disallow: /).");
      console.error("   Set NEXT_PUBLIC_SITE_URL=https://islandrentalcarts.com in Vercel Production env.\n");
      console.error("Current robots.txt:\n" + text);
      process.exit(1);
    }

    if (!hasSitemap) {
      console.warn("⚠️  Sitemap line missing or pointing elsewhere. Check sitemap in robots.txt.");
    }

    console.log("✅ PRODUCTION MODE: YES");
    console.log("   - Crawlers allowed (Allow: / or no full Disallow)");
    console.log("   - Sitemap:", hasSitemap ? PRODUCTION_URL + "/sitemap.xml" : "not found in output");
    console.log("   - /admin disallowed:", hasDisallowAdmin ? "yes" : "not in output");
    console.log("\nrobots.txt content:\n" + text);
  } catch (err) {
    console.error("❌ Request failed:", err);
    process.exit(1);
  }
}

main();
