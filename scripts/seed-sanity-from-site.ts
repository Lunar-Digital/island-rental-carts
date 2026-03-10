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
import { DEFAULT_FAQS } from "../src/content/faq";

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

// —— Homepage: content currently shown when Sanity is empty ——
// Cart Features (from CartFeatures.tsx)
const HOMEPAGE_FEATURE_BULLETS = [
  "Ready on arrival",
  "Well-maintained and reliable",
  "Quiet electric ride",
  "Comfortable seating for 4",
  "Easy island cruising",
];
const HOMEPAGE_CART_FEATURES_SECTION_TITLE = "4-Seat Electric Carts";
const HOMEPAGE_CART_FEATURES_BADGE = "Cart Details";

// How It Works (from HowItWorks.tsx)
const HOMEPAGE_HOW_IT_WORKS_STEPS = [
  {
    _key: "step1",
    title: "Book Online",
    description:
      "Select your dates and secure your Daufuskie Island golf cart in minutes. We recommend booking early during peak season (May–September).",
  },
  {
    _key: "step2",
    title: "Pickup at Ferry",
    description:
      "Your cart is ready and waiting when you arrive at the Daufuskie Island ferry dock. No hassle — just grab the keys and go.",
  },
  {
    _key: "step3",
    title: "Explore the Island",
    description:
      "Cruise the sandy roads, visit Haig Point Lighthouse, Bloody Point Beach, and the First Union African Baptist Church. Enjoy the island breeze in comfort.",
  },
];
const HOMEPAGE_HOW_IT_WORKS_SECTION_TITLE = "How It Works";
const HOMEPAGE_HOW_IT_WORKS_BADGE = "Simple Process";

// Why Choose Us (from WhyChooseUs.tsx)
const HOMEPAGE_BENEFITS = [
  "Locally owned & operated business",
  "Reliable, newer 4-seater electric carts",
  "Competitive daily & weekly rates with free island-wide delivery",
];
const HOMEPAGE_WHY_CHOOSE_US_SECTION_TITLE =
  "Your Trusted Daufuskie Island Transportation";
const HOMEPAGE_WHY_CHOOSE_US_INTRO =
  "We are dedicated to making your Daufuskie Island experience seamless and memorable. Our electric golf carts are well-maintained, reliable, and ready for your adventure the moment you step off the ferry.";
const HOMEPAGE_WHY_CHOOSE_US_BADGE = "Island Rental Carts Experience";

// Newsletter (from Newsletter.tsx)
const HOMEPAGE_NEWSLETTER_HEADING = "Get Island Updates";
const HOMEPAGE_NEWSLETTER_SUBTEXT =
  "Sign up for news, special offers, and seasonal discounts for your next Daufuskie Island trip.";

// Pricing, Testimonials, FAQ
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

// Sanity is the single source of truth for FAQ when populated; this seed uses shared defaults (4-seat only, no 6-seater).
const HOMEPAGE_FAQ = DEFAULT_FAQS.map((item, i) => ({
  _key: `faq${i + 1}`,
  question: item.question,
  answer: item.answer,
}));

async function main() {
  console.log("Seeding Sanity with site content (homepage, about, contact)...\n");

  // 1. Homepage (all sections: cart features, pricing, testimonials, how it works, why choose us, FAQ, newsletter)
  await client.createOrReplace({
    _id: "homepage",
    _type: "homepage",
    featureBullets: HOMEPAGE_FEATURE_BULLETS,
    cartFeaturesSectionTitle: HOMEPAGE_CART_FEATURES_SECTION_TITLE,
    cartFeaturesBadge: HOMEPAGE_CART_FEATURES_BADGE,
    pricingTable: HOMEPAGE_PRICING_TABLE,
    pricingCards: HOMEPAGE_PRICING_CARDS,
    testimonials: HOMEPAGE_TESTIMONIALS,
    howItWorksSteps: HOMEPAGE_HOW_IT_WORKS_STEPS,
    howItWorksSectionTitle: HOMEPAGE_HOW_IT_WORKS_SECTION_TITLE,
    howItWorksBadge: HOMEPAGE_HOW_IT_WORKS_BADGE,
    benefits: HOMEPAGE_BENEFITS,
    whyChooseUsSectionTitle: HOMEPAGE_WHY_CHOOSE_US_SECTION_TITLE,
    whyChooseUsIntro: HOMEPAGE_WHY_CHOOSE_US_INTRO,
    whyChooseUsBadge: HOMEPAGE_WHY_CHOOSE_US_BADGE,
    faq: HOMEPAGE_FAQ,
    newsletterHeading: HOMEPAGE_NEWSLETTER_HEADING,
    newsletterSubtext: HOMEPAGE_NEWSLETTER_SUBTEXT,
  });
  console.log(
    "✓ Homepage (cart features, pricing, testimonials, how it works, why choose us, FAQ, newsletter)"
  );

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

  console.log(
    "\nDone. Open /admin → Content → Homepage to edit all 7 sections (Cart Features, Pricing, Testimonials, How It Works, Why Choose Us, FAQ, Newsletter)."
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
