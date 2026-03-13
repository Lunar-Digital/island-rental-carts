import { getSiteUrl } from "@/lib/env";
import {
  PHONE,
  EMAIL,
  ADDRESS_STREET,
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
  ADDRESS_POSTAL_CODE,
  PRICE_RANGE,
  PRICE_LOW,
  PRICE_HIGH,
  GOOGLE_MAPS_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  PRODUCT_IMAGE_PATH,
  ORGANIZATION_LOGO_PATH,
  GEO_LATITUDE,
  GEO_LONGITUDE,
  OPENING_TIME,
  CLOSING_TIME,
} from "@/lib/constants";
import { DEFAULT_FAQS, type FAQItem } from "@/content/faq";
import type { StructuredDataSettings } from "@/types/structuredData";

function applyRemoveFields<T extends Record<string, unknown>>(
  obj: T,
  removeFields?: string[],
): T {
  if (!removeFields?.length) return obj;
  const next = { ...obj };
  for (const key of removeFields) if (key in next) delete next[key];
  return next;
}

type TestimonialItem = {
  quote: string;
  name: string;
  title?: string;
  /** Star rating 1–5 for schema; when present, reviewRating is output. Defaults to 5 when omitted. */
  rating?: number;
  /** e.g. "Google" for Google Maps reviews. */
  source?: string;
};

type JsonLdProps = {
  /** FAQ from Sanity (homepage). When provided, JSON-LD FAQPage matches visible FAQ for SEO. */
  faq?: FAQItem[] | null;
  /** Testimonials from Sanity (homepage). When provided, LocalBusiness gets aggregateRating and review for rich results. */
  testimonials?: TestimonialItem[] | null;
  /** Sanity-driven controls for schema (enableFaq, enableReviews, disableItemReviewed, removeFields). */
  structuredData?: StructuredDataSettings | null;
};

/** Stable @id for LocalBusiness so Contact page can reuse and Google merges one entity. */
export const LOCAL_BUSINESS_ID_FRAGMENT = "#localbusiness";

/**
 * Builds LocalBusiness JSON-LD. Exported for use on Contact page (call with testimonials: null).
 * Same @id on Home and Contact so Google sees one business.
 * Only aggregateRating is set here (no review array); full reviews live on Product only so Rich Results Test shows 1 Organisation and 1 Product with reviews instead of 4/8 duplicate items.
 */
export function buildLocalBusiness(
  siteUrl: string,
  testimonials: TestimonialItem[] | null,
  schemaSettings: StructuredDataSettings = {},
): Record<string, unknown> {
  const settings = schemaSettings ?? {};
  const baseUrl = siteUrl.replace(/\/$/, "");
  const localBusiness: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}${LOCAL_BUSINESS_ID_FRAGMENT}`,
    name: "Island Rental Carts",
    description:
      "4-seater electric golf cart rentals on Daufuskie Island, South Carolina. Daily and weekly rentals with free island-wide delivery.",
    url: baseUrl,
    image: `${baseUrl}${ORGANIZATION_LOGO_PATH}`,
    telephone: PHONE,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS_STREET,
      addressLocality: ADDRESS_LOCALITY,
      addressRegion: ADDRESS_REGION,
      postalCode: ADDRESS_POSTAL_CODE,
      addressCountry: "US",
    },
    areaServed: { "@type": "Place" as const, name: ADDRESS_LOCALITY },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO_LATITUDE,
      longitude: GEO_LONGITUDE,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: OPENING_TIME,
      closes: CLOSING_TIME,
    },
    priceRange: PRICE_RANGE,
    hasMap: GOOGLE_MAPS_URL,
    sameAs: [FACEBOOK_URL, INSTAGRAM_URL, GOOGLE_MAPS_URL],
  };

  if (settings.enableReviews !== false && testimonials && testimonials.length > 0) {
    const ratingSum = testimonials.reduce((sum, t) => sum + (t.rating ?? 5), 0);
    const avgRating = (ratingSum / testimonials.length).toFixed(1);
    localBusiness.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      bestRating: "5",
      reviewCount: String(testimonials.length),
    };
  }

  return applyRemoveFields(localBusiness, settings.removeFields);
}

/** Absolute URL for the single product (4-seater cart) so reviews reference it by @id and only one Product entity is detected. */
const PRODUCT_ID_FRAGMENT = "#product";

function buildProduct(
  siteUrl: string,
  testimonials: TestimonialItem[] | null,
  schemaSettings: StructuredDataSettings = {},
) {
  const settings = schemaSettings ?? {};
  const productId = `${siteUrl.replace(/\/$/, "")}${PRODUCT_ID_FRAGMENT}`;
  const product: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": productId,
    name: "4-Seater Electric Golf Cart Rental",
    description:
      "Comfortable 4-seater electric golf cart for exploring Daufuskie Island. Includes headlights, quiet electric motor, and free island-wide delivery.",
    image: `${siteUrl.replace(/\/$/, "")}${PRODUCT_IMAGE_PATH}`,
    brand: { "@type": "Brand", name: "Island Rental Carts" },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: String(PRICE_LOW),
      highPrice: String(PRICE_HIGH),
      priceCurrency: "USD",
      offerCount: "1",
      availability: "https://schema.org/InStock",
    },
  };

  if (settings.enableReviews !== false && testimonials && testimonials.length > 0) {
    const ratingSum = testimonials.reduce((sum, t) => sum + (t.rating ?? 5), 0);
    const avgRating = (ratingSum / testimonials.length).toFixed(1);
    product.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      bestRating: "5",
      reviewCount: String(testimonials.length),
    };
    const omitItemReviewed = settings.disableItemReviewed === true;
    product.review = testimonials.map((t) => {
      const rating = t.rating ?? 5;
      const authorName = t.name?.trim() || (t.source === "Google" ? "Google reviewer" : "Customer");
      const review: Record<string, unknown> = {
        "@type": "Review" as const,
        author: { "@type": "Person" as const, name: authorName },
        reviewBody: t.quote,
        reviewRating: { "@type": "Rating" as const, ratingValue: String(rating), bestRating: "5" },
      };
      if (!omitItemReviewed) review.itemReviewed = { "@id": productId };
      return review;
    });
  }

  return applyRemoveFields(product, settings.removeFields);
}

function buildFaqPage(
  faqList: FAQItem[],
  schemaSettings: StructuredDataSettings = {},
): Record<string, unknown> | null {
  const settings = schemaSettings ?? {};
  if (settings.enableFaq === false) return null;
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "Frequently Asked Questions about Daufuskie Island Golf Cart Rentals",
    mainEntity: faqList.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  return applyRemoveFields(faqPage, settings.removeFields);
}

export function JsonLd({ faq, testimonials, structuredData: schemaSettings }: JsonLdProps = {}) {
  const siteUrl = getSiteUrl();
  const faqList = faq?.length ? faq : DEFAULT_FAQS;
  const testimonialList = testimonials?.length ? testimonials : null;
  const settings = schemaSettings ?? {};

  const localBusiness = buildLocalBusiness(siteUrl, testimonialList, settings);
  const product = buildProduct(siteUrl, testimonialList, settings);
  const faqPage = buildFaqPage(faqList, settings);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
      />
      {faqPage !== null && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
        />
      )}
    </>
  );
}
