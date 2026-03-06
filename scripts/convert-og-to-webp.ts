/**
 * One-off: convert the default OG image to WebP for PageSpeed/SEO.
 * Run: npx tsx scripts/convert-og-to-webp.ts
 */
import sharp from "sharp";
import path from "path";
import fs from "fs";

const publicDir = path.join(process.cwd(), "public", "images");
const src = path.join(publicDir, "daufuskie-island-golf-cart-rentals-og.jpg");
const dest = path.join(publicDir, "daufuskie-island-golf-cart-rentals-og.webp");

if (!fs.existsSync(src)) {
  console.error("Source image not found:", src);
  process.exit(1);
}

sharp(src)
  .webp({ quality: 85 })
  .toFile(dest)
  .then((info) => {
    console.log("Created:", dest);
    console.log("Size:", info.size, "bytes");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
