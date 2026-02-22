import type { Page } from "@playwright/test";
import { Finding } from "../types";

export async function runLinkChecks(
  page: Page,
  url: string
): Promise<Finding[]> {
  const findings: Finding[] = [];
  const pageHostname = new URL(url).hostname;

  const anchors = await page.locator("a[href]").all();
  const hrefs = new Set<string>();

  for (const a of anchors) {
    const href = await a.getAttribute("href");
    if (!href) continue;

    let resolved: URL;
    try {
      resolved = new URL(href, url);
    } catch {
      continue;
    }

    if (resolved.hostname !== pageHostname) continue;
    if (resolved.protocol !== "http:" && resolved.protocol !== "https:")
      continue;

    const clean = resolved.origin + resolved.pathname;
    hrefs.add(clean);
  }

  const internalLinks = [...hrefs];
  const maxToTest = 50;
  const linksToTest = internalLinks.slice(0, maxToTest);

  let broken = 0;
  const brokenDetails: string[] = [];

  for (const link of linksToTest) {
    try {
      let res = await fetch(link, {
        method: "HEAD",
        redirect: "follow",
        headers: { "User-Agent": "QA-Audit-Bot/1.0" },
        signal: AbortSignal.timeout(8_000),
      });

      if (res.status === 405) {
        res = await fetch(link, {
          method: "GET",
          redirect: "follow",
          headers: { "User-Agent": "QA-Audit-Bot/1.0" },
          signal: AbortSignal.timeout(8_000),
        });
      }

      if (res.status >= 400) {
        broken++;
        brokenDetails.push(`${res.status} → ${link}`);
      }
    } catch {
      broken++;
      brokenDetails.push(`Timeout/Error → ${link}`);
    }
  }

  if (broken > 0) {
    findings.push({
      type: "links",
      severity: "warn",
      url,
      message: `Found ${broken} broken internal link(s) out of ${linksToTest.length} tested`,
      evidence: brokenDetails.slice(0, 5).join("\n"),
    });
  }

  return findings;
}

export async function runGlobalLinkChecks(
  baseUrl: string
): Promise<Finding[]> {
  const findings: Finding[] = [];

  for (const endpoint of ["/robots.txt", "/sitemap.xml"]) {
    const checkUrl = `${baseUrl}${endpoint}`;
    try {
      const res = await fetch(checkUrl, {
        headers: { "User-Agent": "QA-Audit-Bot/1.0" },
        signal: AbortSignal.timeout(8_000),
      });

      if (!res.ok) {
        findings.push({
          type: "links",
          severity: "warn",
          url: checkUrl,
          message: `${endpoint} returned status ${res.status}`,
          evidence: `GET ${checkUrl} → ${res.status}`,
        });
      } else {
        const body = await res.text();
        if (body.trim().length < 10) {
          findings.push({
            type: "links",
            severity: "warn",
            url: checkUrl,
            message: `${endpoint} exists but appears empty or invalid`,
            evidence: `Body length: ${body.trim().length} chars`,
          });
        }
      }
    } catch (err) {
      findings.push({
        type: "links",
        severity: "warn",
        url: checkUrl,
        message: `${endpoint} is unreachable`,
        evidence: `${err}`,
      });
    }
  }

  return findings;
}
