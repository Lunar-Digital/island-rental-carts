import type { Browser, BrowserType } from "@playwright/test";
import { mkdirSync } from "fs";
import { resolve } from "path";

const BREAKPOINTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

const BROWSERS: { name: string; type: () => BrowserType }[] = [
  {
    name: "chromium",
    type: () => require("playwright-core").chromium as BrowserType,
  },
  {
    name: "webkit",
    type: () => require("playwright-core").webkit as BrowserType,
  },
];

export async function takeScreenshots(
  urls: string[],
  outputDir: string
): Promise<string[]> {
  const screenshotPaths: string[] = [];

  for (const browserDef of BROWSERS) {
    let browser: Browser | null = null;
    try {
      browser = await browserDef.type().launch({ headless: true });

      for (const bp of BREAKPOINTS) {
        for (const url of urls) {
          const slug = urlToSlug(url);
          const dir = resolve(
            outputDir,
            "screenshots",
            browserDef.name,
            bp.name
          );
          mkdirSync(dir, { recursive: true });

          const filePath = resolve(dir, `${slug}.png`);

          const context = await browser.newContext({
            viewport: { width: bp.width, height: bp.height },
          });
          const page = await context.newPage();

          try {
            await page.goto(url, {
              waitUntil: "networkidle",
              timeout: 30_000,
            });
            await page.screenshot({ path: filePath, fullPage: true });
            screenshotPaths.push(filePath);
            console.log(
              `    Screenshot: ${browserDef.name}/${bp.name}/${slug}.png`
            );
          } catch (err) {
            console.warn(
              `    Failed screenshot ${browserDef.name}/${bp.name}/${slug}: ${err}`
            );
          } finally {
            await context.close();
          }
        }
      }
    } finally {
      if (browser) await browser.close();
    }
  }

  return screenshotPaths;
}

function urlToSlug(url: string): string {
  try {
    const u = new URL(url);
    const path = u.pathname === "/" ? "index" : u.pathname.replace(/^\//, "");
    return path.replace(/\//g, "_").replace(/[^a-zA-Z0-9_-]/g, "");
  } catch {
    return "unknown";
  }
}
