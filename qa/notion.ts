import { readFileSync } from "fs";
import { resolve } from "path";
import { AuditSummary } from "./types";

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

export async function publishToNotion(outputDir: string): Promise<void> {
  const token = process.env.NOTION_TOKEN;
  const pageId = process.env.NOTION_PAGE_ID;

  if (!token || !pageId) {
    console.warn(
      "  Skipping Notion publish: NOTION_TOKEN or NOTION_PAGE_ID not set"
    );
    return;
  }

  const summaryPath = resolve(outputDir, "audit-summary.json");
  const summary: AuditSummary = JSON.parse(
    readFileSync(summaryPath, "utf-8")
  );

  const blocks = buildNotionBlocks(summary);

  const res = await fetch(`${NOTION_API}/blocks/${pageId}/children`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ children: blocks }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`  Notion API error ${res.status}: ${body}`);
    return;
  }

  console.log("  Published results to Notion");
}

function buildNotionBlocks(summary: AuditSummary): NotionBlock[] {
  const { meta, totals, topFindings } = summary;
  const blocks: NotionBlock[] = [];

  blocks.push(divider());
  blocks.push(
    heading2(
      `QA Audit — ${meta.environment} — ${new Date(meta.timestamp).toLocaleString()}`
    )
  );

  blocks.push(
    paragraph([
      bold("Base URL: "),
      text(meta.baseUrl),
      text("  |  "),
      bold("Mode: "),
      text(meta.urlMode),
      text("  |  "),
      bold("URLs tested: "),
      text(String(meta.urlsTested)),
    ])
  );

  blocks.push(
    paragraph([
      bold("Warnings: "),
      text(String(totals.warn)),
      text("  |  "),
      bold("Pass: "),
      text(String(totals.pass)),
    ])
  );

  if (meta.runUrl) {
    blocks.push(
      paragraph([bold("Actions run: "), link(meta.runUrl, "View on GitHub")])
    );
  }

  const byType = Object.entries(totals.byType);
  if (byType.length > 0) {
    blocks.push(heading3("By category"));
    for (const [type, counts] of byType) {
      blocks.push(
        bullet(`${type}: ${counts.warn} warning(s), ${counts.pass} pass`)
      );
    }
  }

  if (topFindings.length > 0) {
    blocks.push(heading3("Top findings"));
    for (const f of topFindings.slice(0, 10)) {
      blocks.push(
        bullet(`[${f.type}] ${f.message} — ${truncate(f.evidence, 100)}`)
      );
    }
  }

  return blocks;
}

type NotionBlock = Record<string, unknown>;
type RichText = Record<string, unknown>;

function heading2(content: string): NotionBlock {
  return {
    object: "block",
    type: "heading_2",
    heading_2: { rich_text: [text(content)] },
  };
}

function heading3(content: string): NotionBlock {
  return {
    object: "block",
    type: "heading_3",
    heading_3: { rich_text: [text(content)] },
  };
}

function paragraph(parts: RichText[]): NotionBlock {
  return {
    object: "block",
    type: "paragraph",
    paragraph: { rich_text: parts },
  };
}

function bullet(content: string): NotionBlock {
  return {
    object: "block",
    type: "bulleted_list_item",
    bulleted_list_item: { rich_text: [text(content)] },
  };
}

function divider(): NotionBlock {
  return { object: "block", type: "divider", divider: {} };
}

function text(content: string): RichText {
  return { type: "text", text: { content } };
}

function bold(content: string): RichText {
  return {
    type: "text",
    text: { content },
    annotations: { bold: true },
  };
}

function link(url: string, content: string): RichText {
  return { type: "text", text: { content, link: { url } } };
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + "…" : str;
}
