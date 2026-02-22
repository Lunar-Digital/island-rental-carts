import { chromium, webkit } from "playwright-core";
import { resolveConfig } from "./config";
import { discoverUrls } from "./checks/sitemap";
import { runSeoChecks } from "./checks/seo";
import { runImageChecks } from "./checks/images";
import { runLinkChecks, runGlobalLinkChecks } from "./checks/links";
import { takeScreenshots } from "./checks/screenshots";
import { generateReports } from "./report";
import { publishToNotion } from "./notion";
import { AuditSummary, Finding } from "./types";
import { resolve } from "path";
import { execSync } from "child_process";

async function main() {
  console.log("=== QA Site Audit ===\n");

  const config = resolveConfig();
  console.log(`Environment: ${config.environment}`);
  console.log(`Base URL:    ${config.baseUrl}`);
  console.log(`URL Mode:    ${config.urlMode}`);
  console.log(`Max URLs:    ${config.maxUrls}`);
  console.log();

  console.log("[1/5] Discovering URLs...");
  const urls = await discoverUrls(config);
  console.log(`  Will test ${urls.length} URL(s)\n`);

  console.log("[2/5] Running page checks (SEO, images, links)...");
  const allFindings: Finding[] = [];

  const browser = await chromium.launch({ headless: true });
  try {
    for (const url of urls) {
      console.log(`\n  Checking: ${url}`);
      const context = await browser.newContext();
      const page = await context.newPage();

      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });

        const seoFindings = await runSeoChecks(page, url);
        allFindings.push(...seoFindings);
        console.log(`    SEO: ${seoFindings.length} finding(s)`);

        const imgFindings = await runImageChecks(page, url);
        allFindings.push(...imgFindings);
        console.log(`    Images: ${imgFindings.length} finding(s)`);

        const linkFindings = await runLinkChecks(page, url);
        allFindings.push(...linkFindings);
        console.log(`    Links: ${linkFindings.length} finding(s)`);
      } catch (err) {
        console.error(`    Error on ${url}: ${err}`);
        allFindings.push({
          type: "seo",
          severity: "warn",
          url,
          message: `Page failed to load: ${err}`,
          evidence: "",
        });
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  console.log("\n[3/5] Checking global endpoints (robots.txt, sitemap.xml)...");
  const globalFindings = await runGlobalLinkChecks(config.baseUrl);
  allFindings.push(...globalFindings);
  console.log(`  Global: ${globalFindings.length} finding(s)\n`);

  console.log("[4/5] Taking screenshots...");
  const outputDir = resolve(process.cwd(), "qa-output");
  const screenshotPaths = await takeScreenshots(urls, outputDir);
  console.log(`  ${screenshotPaths.length} screenshots saved\n`);

  console.log("[5/5] Generating reports...");
  const summary = buildSummary(config, urls, allFindings, screenshotPaths);
  generateReports(summary, outputDir);

  console.log("\n[Notion] Publishing...");
  await publishToNotion(outputDir);

  console.log("\n=== Audit Complete ===");
  console.log(`  Warnings: ${summary.totals.warn}`);
  console.log(`  Pass:     ${summary.totals.pass}`);
  console.log(`  Output:   ${outputDir}`);
}

function buildSummary(
  config: ReturnType<typeof resolveConfig>,
  urls: string[],
  findings: Finding[],
  screenshotPaths: string[]
): AuditSummary {
  const totals = {
    pass: 0,
    warn: 0,
    byType: {} as Record<string, { pass: number; warn: number }>,
  };

  for (const f of findings) {
    if (f.severity === "warn") totals.warn++;
    else totals.pass++;

    if (!totals.byType[f.type]) totals.byType[f.type] = { pass: 0, warn: 0 };
    totals.byType[f.type][f.severity]++;
  }

  const warnFindings = findings.filter((f) => f.severity === "warn");
  const topFindings = warnFindings.slice(0, 10);

  let gitSha = "";
  try {
    gitSha = execSync("git rev-parse --short HEAD", { encoding: "utf-8" }).trim();
  } catch {
    /* not in git */
  }

  return {
    meta: {
      timestamp: new Date().toISOString(),
      environment: config.environment,
      baseUrl: config.baseUrl,
      urlMode: config.urlMode,
      urlsTested: urls.length,
      gitSha,
      runId: process.env.GITHUB_RUN_ID || "local",
      runUrl: process.env.GITHUB_RUN_ID
        ? `https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
        : "",
    },
    urlsTested: urls,
    totals,
    findings,
    topFindings,
    screenshotPaths,
  };
}

main().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});
