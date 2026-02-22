import type { Page } from "@playwright/test";
import { Finding } from "../types";

export async function runSeoChecks(
  page: Page,
  url: string
): Promise<Finding[]> {
  const findings: Finding[] = [];

  const title = await page.title();
  if (!title || title.trim().length === 0) {
    findings.push({
      type: "seo",
      severity: "warn",
      url,
      message: "Page title is missing or empty",
      evidence: `<title>${title || ""}</title>`,
    });
  }

  const metaDesc = await page
    .locator('meta[name="description"]')
    .first()
    .getAttribute("content")
    .catch(() => null);
  if (!metaDesc || metaDesc.trim().length === 0) {
    findings.push({
      type: "seo",
      severity: "warn",
      url,
      message: "Meta description is missing or empty",
      evidence: metaDesc === null ? "Tag not found" : `content="${metaDesc}"`,
    });
  }

  const canonical = await page
    .locator('link[rel="canonical"]')
    .first()
    .getAttribute("href")
    .catch(() => null);
  if (!canonical) {
    findings.push({
      type: "seo",
      severity: "warn",
      url,
      message: "Canonical link is missing",
      evidence: "No <link rel='canonical'> found",
    });
  } else if (!canonical.startsWith("http")) {
    findings.push({
      type: "seo",
      severity: "warn",
      url,
      message: "Canonical link is not an absolute URL",
      evidence: `href="${canonical}"`,
    });
  }

  const robotsMeta = await page
    .locator('meta[name="robots"]')
    .first()
    .getAttribute("content")
    .catch(() => null);
  if (robotsMeta && robotsMeta.toLowerCase().includes("noindex")) {
    findings.push({
      type: "seo",
      severity: "warn",
      url,
      message: "Page has noindex robots meta — may be intentional on preview",
      evidence: `content="${robotsMeta}"`,
    });
  }

  const h1Count = await page.locator("h1").count();
  if (h1Count === 0) {
    findings.push({
      type: "seo",
      severity: "warn",
      url,
      message: "No H1 element found on page",
      evidence: "h1 count: 0",
    });
  } else if (h1Count > 1) {
    findings.push({
      type: "seo",
      severity: "warn",
      url,
      message: `Multiple H1 elements found (${h1Count})`,
      evidence: `h1 count: ${h1Count}`,
    });
  }

  return findings;
}
