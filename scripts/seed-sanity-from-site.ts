/**
 * Populates Sanity with the content currently on the site (homepage, about, contact)
 * so you can edit it in the Content Editor instead of only in code.
 *
 * Prerequisites:
 * 1. Create a token at https://www.sanity.io/manage → your project → API → Tokens.
 *    Use "Editor" or "Administrator" so it can create/replace documents.
 * 2. Add to .env.local:
 *    SANITY_API_TOKEN=your_token_here
 *    NEXT_PUBLIC_SANITY_PROJECT_ID=oe6l4tp6
 *    NEXT_PUBLIC_SANITY_DATASET=production
 *    NEXT_PUBLIC_SITE_URL=https://yoursite.com  (optional; used for link hrefs in body)
 * 3. Run: npx tsx scripts/seed-sanity-from-site.ts
 *
 * If .env.local is not loaded automatically, run:
 *    node --env-file=.env.local --import tsx scripts/seed-sanity-from-site.ts
 * or export the vars in your shell first.
 */

import { createClient } from "@sanity/client";
import {
  aboutContent,
  aboutMeta,
  contactContent,
  contactMeta,
} from "../src/content/aboutContact";

// —— Load env from .env and .env.local (optional) ——
try {
  const dotenv = require("dotenv");
  dotenv.config({ path: ".env" });
  dotenv.config({ path: ".env.local" });
} catch {
  // dotenv not installed; use: node --env-file=.env.local --import tsx scripts/seed-sanity-from-site.ts
}

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "oe6l4tp6";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token =
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_AUTH_TOKEN ||
  process.env.SANITY_TOKEN;
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://islandrentalcarts.com";

if (!token) {
  console.error(
    "Missing SANITY_API_TOKEN. Add this line to .env.local (exact name):\n  SANITY_API_TOKEN=your_token_here\nCreate a token at https://www.sanity.io/manage → your project → API → Tokens (Editor role), then run: npm run seed-sanity"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

/** Convert relative hrefs in block body to absolute URLs (Sanity url type expects absolute). */
function bodyWithAbsoluteUrls<T extends { markDefs?: unknown[] }>(
  body: T[],
  siteUrl: string
): T[] {
  return body.map((block) => {
    if (!block.markDefs?.length) return block;
    const markDefs = block.markDefs as Array<{ href?: string } & Record<string, unknown>>;
    return {
      ...block,
      markDefs: markDefs.map((def) => {
        const href = def.href;
        if (!href || href.startsWith("http") || href.startsWith("mailto:"))
          return def;
        const absolute =
          href === "/" ? siteUrl + "/" : siteUrl.replace(/\/$/, "") + href;
        return { ...def, href: absolute };
      }),
    };
  }) as T[];
}

// —— Homepage: content currently shown when Sanity is empty (from PricingSection, Testimonials, FAQ) ——
const HOMEPAGE_PRICING_TABLE = [
  { _key: "row1", duration: "1 Day", price: "$65", highlight: false },
  { _key: "row2", duration: "2 Days", price: "$130", highlight: false },
  { _key: "row3", duration: "3 Days", price: "$195", highlight: false },
  { _key: "row4", duration: "4 Days", price: "$260", highlight: false },
  { _key: "row5", duration: "5 Days", price: "$325", highlight: false },
  { _key: "row6", duration: "6 Days", price: "$390", highlight: false },
  { _key: "row7", duration: "1 Week", price: "$400", highlight: true },
];

const HOMEPAGE_PRICING_CARDS = [
  {
    _key: "card1",
    title: "Daily Rental",
    price: "$65",
    unit: "Day",
    desc: "Perfect for day trips and quick getaways.",
    badge: "Most Popular",
    pill: "Daily",
  },
  {
    _key: "card2",
    title: "Weekly Special",
    price: "$400",
    unit: "Week",
    desc: "Our most popular option for extended stays.",
    badge: null,
    pill: "Weekly",
  },
];

const HOMEPAGE_TESTIMONIALS = [
  {
    _key: "t1",
    quote:
      "ORDERING WAS SUPER EASY, AND THE PICKUP RIGHT AT THE FERRY MADE OUR START STRESS-FREE.",
    name: "Sarah Jenkins",
    title: "Hilton Head Local",
  },
  {
    _key: "t2",
    quote:
      "THE CART WAS RELIABLE AND ZIPPY. MADE OUR DAY EXPLORING THE ISLAND ABSOLUTELY PERFECT.",
    name: "Michael Ross",
    title: "Vacationer",
  },
  {
    _key: "t3",
    quote:
      "CLEAR INSTRUCTIONS AND SUPER SIMPLE PROCESS. BEST WAY TO SEE DAUFUSKIE!",
    name: "Emily Chen",
    title: "Day Tripper",
  },
];

const HOMEPAGE_FAQ = [
  {
    _key: "faq1",
    question: "How do I book a cart?",
    answer:
      'Booking is easy! Simply click the "Book Now" button on our website to view real-time availability and secure your reservation online via Peek. The entire process takes about 2 minutes. We recommend booking at least 2–3 weeks in advance during peak season (May through September), as carts sell out quickly.',
  },
  {
    _key: "faq2",
    question: "Where do I pick up the cart?",
    answer:
      "We deliver your golf cart directly to the Daufuskie Island ferry dock so it's ready and waiting when you arrive. Whether you come in at Melrose Landing or the County Dock, just look for your reserved cart, grab the keys, and go. We also offer free delivery to any rental property on the island for overnight and weekly rentals.",
  },
  {
    _key: "faq3",
    question: "What are your rental rates?",
    answer:
      "Our standard 4-seater electric golf cart is $65 per day. Multi-day rentals are calculated at the daily rate, and our weekly special is $400 for a full week — saving you $55 compared to seven individual days. Check the pricing table above for the full breakdown.",
  },
  {
    _key: "faq4",
    question: "Do you have 6-seater carts?",
    answer:
      "We currently specialize in 4-seater electric golf carts, which are the most popular option on Daufuskie Island and perfect for couples, small families, and groups of up to four. If you need to accommodate a larger group, we recommend renting two carts so everyone can explore comfortably. Contact us and we'll help coordinate.",
  },
  {
    _key: "faq5",
    question: "Do I need a golf cart on Daufuskie Island?",
    answer:
      "Yes — golf carts are the primary mode of transportation on Daufuskie Island. There are no cars, no rideshares, and no public transit. The island is about 8 square miles with sandy roads connecting beaches, historic landmarks, restaurants, and rental properties. A golf cart is essential for getting around, whether you're visiting for the day or staying for the week.",
  },
  {
    _key: "faq6",
    question: "What are the golf cart rules on Daufuskie Island?",
    answer:
      "You must be at least 18 years old with a valid driver's license to operate a golf cart on Daufuskie Island. All South Carolina traffic laws apply, including speed limits and DUI laws. Headlights are required after dark — all our carts come equipped with them. Seatbelts should be worn when available, and children should be seated securely at all times.",
  },
  {
    _key: "faq7",
    question: "How do I get to Daufuskie Island?",
    answer:
      "Daufuskie Island is only accessible by boat — there are no bridges to the mainland. Most visitors take a ferry from Hilton Head Island (about 30–45 minutes) or a water taxi from Bluffton or Savannah. Popular ferry services include Lowcountry Ferry, Island Head, and May River Excursions. Book your ferry first, then reserve your golf cart so it's waiting when you arrive.",
  },
  {
    _key: "faq8",
    question: "What if it rains during my rental?",
    answer:
      "Our golf carts come with a canopy top that provides cover from light rain and sun. Daufuskie Island weather can change quickly, especially in summer — brief afternoon showers are common but usually pass within 30 minutes. Rentals are not cancelled or refunded due to weather, but if severe weather is expected, contact us and we'll work with you on rescheduling.",
  },
];

async function main() {
  console.log("Seeding Sanity with site content (homepage, about, contact)...\n");

  // 1. Homepage
  await client.createOrReplace({
    _id: "homepage",
    _type: "homepage",
    pricingTable: HOMEPAGE_PRICING_TABLE,
    pricingCards: HOMEPAGE_PRICING_CARDS,
    testimonials: HOMEPAGE_TESTIMONIALS,
    faq: HOMEPAGE_FAQ,
  });
  console.log("✓ Homepage (pricing, testimonials, FAQ)");

  // 2. About
  const aboutBody = bodyWithAbsoluteUrls(aboutContent.body, baseUrl);
  await client.createOrReplace({
    _id: "about",
    _type: "aboutPage",
    title: aboutContent.title,
    slug: { _type: "slug", current: "about" },
    body: aboutBody,
    seo: {
      _type: "seo",
      metaTitle: aboutMeta.metaTitle,
      metaDescription: aboutMeta.metaDescription,
    },
  });
  console.log("✓ About page (title, body, SEO)");

  // 3. Contact
  const contactBody = bodyWithAbsoluteUrls(contactContent.body, baseUrl);
  await client.createOrReplace({
    _id: "contact",
    _type: "contactPage",
    title: contactContent.title,
    slug: { _type: "slug", current: "contact" },
    body: contactBody,
    seo: {
      _type: "seo",
      metaTitle: contactMeta.metaTitle,
      metaDescription: contactMeta.metaDescription,
    },
  });
  console.log("✓ Contact page (title, body, SEO)");

  console.log("\nDone. Open /admin and edit Content → Homepage, About, Contact.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
