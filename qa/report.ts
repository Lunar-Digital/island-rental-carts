import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";
import { AuditSummary, Finding } from "./types";

export function generateReports(
  summary: AuditSummary,
  outputDir: string
): void {
  mkdirSync(outputDir, { recursive: true });

  writeFileSync(
    resolve(outputDir, "audit-summary.json"),
    JSON.stringify(summary, null, 2)
  );
  console.log("  Wrote audit-summary.json");

  const html = buildHtmlReport(summary);
  writeFileSync(resolve(outputDir, "report.html"), html);
  console.log("  Wrote report.html");
}

function buildHtmlReport(summary: AuditSummary): string {
  const { meta, totals, findings, screenshotPaths } = summary;

  const findingsByUrl = new Map<string, Finding[]>();
  for (const f of findings) {
    const list = findingsByUrl.get(f.url) || [];
    list.push(f);
    findingsByUrl.set(f.url, list);
  }

  const typeColors: Record<string, string> = {
    seo: "#e67e22",
    images: "#9b59b6",
    links: "#e74c3c",
    visual: "#3498db",
  };

  const urlSections = summary.urlsTested
    .map((url) => {
      const urlFindings = findingsByUrl.get(url) || [];
      const rows = urlFindings
        .map(
          (f) => `
        <tr>
          <td><span style="background:${typeColors[f.type] || "#999"};color:#fff;padding:2px 8px;border-radius:4px;font-size:12px">${f.type}</span></td>
          <td><span style="background:${f.severity === "warn" ? "#f39c12" : "#27ae60"};color:#fff;padding:2px 8px;border-radius:4px;font-size:12px">${f.severity}</span></td>
          <td>${esc(f.message)}</td>
          <td style="font-size:12px;color:#666;max-width:300px;overflow:hidden;text-overflow:ellipsis">${esc(f.evidence)}</td>
        </tr>`
        )
        .join("\n");

      const screenshotsForUrl = screenshotPaths
        .filter((p) => {
          const slug = urlToSlug(url);
          return p.includes(slug);
        })
        .map(
          (p) =>
            `<a href="${p}" style="margin-right:8px;font-size:12px">${p.split("/screenshots/")[1] || p}</a>`
        )
        .join("\n");

      return `
      <div style="margin-bottom:32px">
        <h3 style="border-bottom:2px solid #eee;padding-bottom:8px">${esc(url)}</h3>
        ${urlFindings.length === 0 ? '<p style="color:#27ae60">No issues found</p>' : `
        <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
          <thead><tr style="text-align:left;border-bottom:2px solid #ddd">
            <th style="padding:8px">Type</th>
            <th style="padding:8px">Severity</th>
            <th style="padding:8px">Message</th>
            <th style="padding:8px">Evidence</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>`}
        ${screenshotsForUrl ? `<details><summary>Screenshots</summary><div style="padding:8px">${screenshotsForUrl}</div></details>` : ""}
      </div>`;
    })
    .join("\n");

  const byTypeRows = Object.entries(totals.byType)
    .map(
      ([type, counts]) => `
      <tr>
        <td style="padding:6px 12px"><span style="background:${typeColors[type] || "#999"};color:#fff;padding:2px 8px;border-radius:4px">${type}</span></td>
        <td style="padding:6px 12px;text-align:center">${counts.warn}</td>
        <td style="padding:6px 12px;text-align:center">${counts.pass}</td>
      </tr>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>QA Audit Report — ${esc(meta.baseUrl)}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 960px; margin: 0 auto; padding: 24px; color: #333; }
    h1 { font-size: 24px; }
    h2 { font-size: 20px; margin-top: 32px; }
    table { font-size: 14px; }
    th, td { padding: 8px; text-align: left; border-bottom: 1px solid #eee; }
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 14px; margin-bottom: 24px; }
    .meta-grid dt { font-weight: 600; color: #666; }
    .meta-grid dd { margin: 0; }
    details { margin-top: 8px; }
    summary { cursor: pointer; font-size: 13px; color: #555; }
  </style>
</head>
<body>
  <h1>QA Audit Report</h1>
  <dl class="meta-grid">
    <dt>Timestamp</dt><dd>${esc(meta.timestamp)}</dd>
    <dt>Environment</dt><dd>${esc(meta.environment)}</dd>
    <dt>Base URL</dt><dd><a href="${esc(meta.baseUrl)}">${esc(meta.baseUrl)}</a></dd>
    <dt>URL Mode</dt><dd>${esc(meta.urlMode)}</dd>
    <dt>URLs Tested</dt><dd>${meta.urlsTested}</dd>
    <dt>Git SHA</dt><dd><code>${esc(meta.gitSha)}</code></dd>
    ${meta.runUrl ? `<dt>Actions Run</dt><dd><a href="${esc(meta.runUrl)}">View Run</a></dd>` : ""}
  </dl>

  <h2>Summary</h2>
  <table style="width:auto;margin-bottom:24px">
    <thead><tr style="border-bottom:2px solid #ddd"><th style="padding:6px 12px">Type</th><th style="padding:6px 12px">Warnings</th><th style="padding:6px 12px">Pass</th></tr></thead>
    <tbody>${byTypeRows}</tbody>
    <tfoot><tr style="border-top:2px solid #333;font-weight:bold">
      <td style="padding:6px 12px">Total</td>
      <td style="padding:6px 12px;text-align:center">${totals.warn}</td>
      <td style="padding:6px 12px;text-align:center">${totals.pass}</td>
    </tr></tfoot>
  </table>

  <h2>Findings by URL</h2>
  ${urlSections}
</body>
</html>`;
}

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
