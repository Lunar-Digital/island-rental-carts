import type { Page } from "@playwright/test";
import { Finding } from "../types";

export async function runImageChecks(
  page: Page,
  url: string
): Promise<Finding[]> {
  const findings: Finding[] = [];

  const images = await page.locator("img").all();

  for (const img of images) {
    const src = (await img.getAttribute("src")) || "(no src)";
    const alt = await img.getAttribute("alt");
    const role = await img.getAttribute("role");
    const ariaHidden = await img.getAttribute("aria-hidden");

    const isDecorativeByRole =
      role === "presentation" || role === "none" || ariaHidden === "true";
    const hasEmptyAltIntentionally = alt === "";

    if (alt === null && !isDecorativeByRole) {
      findings.push({
        type: "images",
        severity: "warn",
        url,
        message: "Image missing alt attribute",
        evidence: truncateSrc(src),
      });
    } else if (
      hasEmptyAltIntentionally &&
      !isDecorativeByRole
    ) {
      findings.push({
        type: "images",
        severity: "warn",
        url,
        message:
          'Image has empty alt="" but no role="presentation" — is it decorative?',
        evidence: truncateSrc(src),
      });
    }

    const box = await img.boundingBox().catch(() => null);
    if (box && box.width > 0 && box.height > 0) {
      const naturalWidth = await img.evaluate(
        (el) => (el as HTMLImageElement).naturalWidth
      );
      const naturalHeight = await img.evaluate(
        (el) => (el as HTMLImageElement).naturalHeight
      );

      if (naturalWidth > 0 && naturalHeight > 0) {
        const renderedPixels = box.width * box.height;
        const naturalPixels = naturalWidth * naturalHeight;
        if (naturalPixels > renderedPixels * 4) {
          findings.push({
            type: "images",
            severity: "warn",
            url,
            message: `Image is significantly oversized: natural ${naturalWidth}x${naturalHeight} displayed at ${Math.round(box.width)}x${Math.round(box.height)}`,
            evidence: truncateSrc(src),
          });
        }
      }
    }

    const htmlWidth = await img.getAttribute("width");
    const htmlHeight = await img.getAttribute("height");
    const style = await img.getAttribute("style");
    const hasDimensions =
      (htmlWidth && htmlHeight) ||
      (style && style.includes("width") && style.includes("height"));
    if (!hasDimensions) {
      const isNextImage = await img.evaluate((el) =>
        el.closest("[data-nimg]") !== null
      );
      if (!isNextImage) {
        findings.push({
          type: "images",
          severity: "warn",
          url,
          message:
            "Image missing explicit width/height — may cause layout shift (CLS)",
          evidence: truncateSrc(src),
        });
      }
    }

    const hasDataNimg = await img.evaluate(
      (el) => el.getAttribute("data-nimg") !== null
    );
    if (hasDataNimg) {
      const sizes = await img.getAttribute("sizes");
      if (!sizes) {
        findings.push({
          type: "images",
          severity: "warn",
          url,
          message:
            "Next.js Image component missing 'sizes' attribute — may send oversized images",
          evidence: truncateSrc(src),
        });
      }
    }
  }

  return findings;
}

function truncateSrc(src: string): string {
  return src.length > 120 ? src.slice(0, 120) + "…" : src;
}
