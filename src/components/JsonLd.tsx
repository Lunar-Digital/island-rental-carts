import { getSiteUrl } from "@/lib/env";

/** Default FAQ content (question/answer). Used when Sanity has no FAQ data so JSON-LD stays in sync with visible FAQ fallback. */
const DEFAULT_FAQS = [
  {
    question: "How do I book a cart?",
    answer:
      'Booking is easy! Simply click the "Book Now" button on our website to view real-time availability and secure your reservation online via Peek. The entire process takes about 2 minutes. We recommend booking at least 2–3 weeks in advance during peak season (May through September), as carts sell out quickly.',
  },
  {
    question: "Where do I pick up the cart?",
    answer:
      "We deliver your golf cart directly to the Daufuskie Island ferry dock so it's ready and waiting when you arrive. Whether you come in at Melrose Landing or the County Dock, just look for your reserved cart, grab the keys, and go. We also offer free delivery to any rental property on the island for overnight and weekly rentals.",
  },
  {
    question: "What are your rental rates?",
    answer:
      "Our standard 4-seater electric golf cart is $65 per day. Multi-day rentals are calculated at the daily rate, and our weekly special is $400 for a full week — saving you $55 compared to seven individual days. Check the pricing table above for the full breakdown.",
  },
  {
    question: "Do you have 6-seater carts?",
    answer:
      "We currently specialize in 4-seater electric golf carts, which are the most popular option on Daufuskie Island and perfect for couples, small families, and groups of up to four. If you need to accommodate a larger group, we recommend renting two carts so everyone can explore comfortably. Contact us and we'll help coordinate.",
  },
  {
    question: "Do I need a golf cart on Daufuskie Island?",
    answer:
      "Yes — golf carts are the primary mode of transportation on Daufuskie Island. There are no cars, no rideshares, and no public transit. The island is about 8 square miles with sandy roads connecting beaches, historic landmarks, restaurants, and rental properties. A golf cart is essential for getting around, whether you're visiting for the day or staying for the week.",
  },
  {
    question: "What are the golf cart rules on Daufuskie Island?",
    answer:
      "You must be at least 18 years old with a valid driver's license to operate a golf cart on Daufuskie Island. All South Carolina traffic laws apply, including speed limits and DUI laws. Headlights are required after dark — all our carts come equipped with them. Seatbelts should be worn when available, and children should be seated securely at all times.",
  },
  {
    question: "How do I get to Daufuskie Island?",
    answer:
      "Daufuskie Island is only accessible by boat — there are no bridges to the mainland. Most visitors take a ferry from Hilton Head Island (about 30–45 minutes) or a water taxi from Bluffton or Savannah. Popular ferry services include Lowcountry Ferry, Island Head, and May River Excursions. Book your ferry first, then reserve your golf cart so it's waiting when you arrive.",
  },
  {
    question: "What if it rains during my rental?",
    answer:
      "Our golf carts come with a canopy top that provides cover from light rain and sun. Daufuskie Island weather can change quickly, especially in summer — brief afternoon showers are common but usually pass within 30 minutes. Rentals are not cancelled or refunded due to weather, but if severe weather is expected, contact us and we'll work with you on rescheduling.",
  },
];

type FAQItem = { question: string; answer: string };
type TestimonialItem = { quote: string; name: string; title?: string };

type JsonLdProps = {
  /** FAQ from Sanity (homepage). When provided, JSON-LD FAQPage matches visible FAQ for SEO. */
  faq?: FAQItem[] | null;
  /** Testimonials from Sanity (homepage). When provided, LocalBusiness gets aggregateRating and review for rich results. */
  testimonials?: TestimonialItem[] | null;
};

function buildLocalBusiness(siteUrl: string, testimonials: TestimonialItem[] | null) {
  const localBusiness: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Island Rental Carts",
    description:
      "4-seater electric golf cart rentals on Daufuskie Island, South Carolina. Daily and weekly rentals with free island-wide delivery.",
    url: siteUrl,
    telephone: "+1-843-368-1345",
    email: "Paul@IslandRentalCarts.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "10 Melrose Landing Rd",
      addressLocality: "Daufuskie Island",
      addressRegion: "SC",
      postalCode: "29915",
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
    priceRange: "$65–$400",
  };

  if (testimonials && testimonials.length > 0) {
    localBusiness.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      reviewCount: String(testimonials.length),
    };
    localBusiness.review = testimonials.map((t) => ({
      "@type": "Review" as const,
      author: { "@type": "Person" as const, name: t.name },
      reviewBody: t.quote,
    }));
  }

  return localBusiness;
}

const product = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "4-Seater Electric Golf Cart Rental",
  description:
    "Comfortable 4-seater electric golf cart for exploring Daufuskie Island. Includes headlights, quiet electric motor, and free island-wide delivery.",
  brand: { "@type": "Brand", name: "Island Rental Carts" },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "65",
    highPrice: "400",
    priceCurrency: "USD",
    offerCount: "7",
    availability: "https://schema.org/InStock",
  },
};

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
  const faqPage = buildFaqPage(faqList);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
