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
} from "@/lib/constants";
import { DEFAULT_FAQS, type FAQItem } from "@/content/faq";

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
};

const LOCAL_BUSINESS_REF = { "@type": "LocalBusiness" as const, name: "Island Rental Carts" };

function buildLocalBusiness(siteUrl: string, testimonials: TestimonialItem[] | null) {
  const localBusiness: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Island Rental Carts",
    description:
      "4-seater electric golf cart rentals on Daufuskie Island, South Carolina. Daily and weekly rentals with free island-wide delivery.",
    url: siteUrl,
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.1,
      longitude: -80.87,
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
      opens: "08:00",
      closes: "18:00",
    },
    priceRange: PRICE_RANGE,
    hasMap: GOOGLE_MAPS_URL,
    sameAs: [FACEBOOK_URL, INSTAGRAM_URL, GOOGLE_MAPS_URL],
  };

  if (testimonials && testimonials.length > 0) {
    const ratingSum = testimonials.reduce((sum, t) => sum + (t.rating ?? 5), 0);
    const avgRating = (ratingSum / testimonials.length).toFixed(1);
    localBusiness.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      bestRating: "5",
      reviewCount: String(testimonials.length),
    };
    localBusiness.review = testimonials.map((t) => {
      const rating = t.rating ?? 5;
      return {
        "@type": "Review" as const,
        author: { "@type": "Person" as const, name: t.name },
        reviewBody: t.quote,
        reviewRating: { "@type": "Rating" as const, ratingValue: String(rating), bestRating: "5" },
        itemReviewed: LOCAL_BUSINESS_REF,
      };
    });
  }

  return localBusiness;
}

const PRODUCT_REF = {
  "@type": "Product" as const,
  name: "4-Seater Electric Golf Cart Rental",
};

function buildProduct(testimonials: TestimonialItem[] | null) {
  const product: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "4-Seater Electric Golf Cart Rental",
    description:
      "Comfortable 4-seater electric golf cart for exploring Daufuskie Island. Includes headlights, quiet electric motor, and free island-wide delivery.",
    brand: { "@type": "Brand", name: "Island Rental Carts" },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: String(PRICE_LOW),
      highPrice: String(PRICE_HIGH),
      priceCurrency: "USD",
      offerCount: "7",
      availability: "https://schema.org/InStock",
    },
  };

  if (testimonials && testimonials.length > 0) {
    const ratingSum = testimonials.reduce((sum, t) => sum + (t.rating ?? 5), 0);
    const avgRating = (ratingSum / testimonials.length).toFixed(1);
    product.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      bestRating: "5",
      reviewCount: String(testimonials.length),
    };
    product.review = testimonials.map((t) => {
      const rating = t.rating ?? 5;
      return {
        "@type": "Review" as const,
        author: { "@type": "Person" as const, name: t.name },
        reviewBody: t.quote,
        reviewRating: { "@type": "Rating" as const, ratingValue: String(rating), bestRating: "5" },
        itemReviewed: PRODUCT_REF,
      };
    });
  }

  return product;
}

function buildOrganization(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Island Rental Carts",
    url: siteUrl,
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.1,
      longitude: -80.87,
    },
    hasMap: GOOGLE_MAPS_URL,
    sameAs: [FACEBOOK_URL, INSTAGRAM_URL, GOOGLE_MAPS_URL],
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
      opens: "08:00",
      closes: "18:00",
    },
    priceRange: PRICE_RANGE,
  };
}

function buildFaqPage(faqList: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function JsonLd({ faq, testimonials }: JsonLdProps = {}) {
  const siteUrl = getSiteUrl();
  const faqList = faq?.length ? faq : DEFAULT_FAQS;
  const testimonialList = testimonials?.length ? testimonials : null;

  const localBusiness = buildLocalBusiness(siteUrl, testimonialList);
  const organization = buildOrganization(siteUrl);
  const product = buildProduct(testimonialList);
  const faqPage = buildFaqPage(faqList);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
