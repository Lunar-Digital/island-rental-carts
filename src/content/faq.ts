/**
 * Default FAQ content. Used when Sanity has no FAQ data so the visible FAQ and FAQPage schema stay in sync.
 * Sanity (Homepage → FAQ) is the single source of truth when populated; this is fallback only.
 */

export type FAQItem = { question: string; answer: string };

export const DEFAULT_FAQS: FAQItem[] = [
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
    question: "What size are the golf carts?",
    answer:
      "We offer 4-seater electric golf carts only — the ideal size for couples, small families, and groups of up to four on Daufuskie Island. If you need to accommodate more people, we recommend renting two carts so everyone can explore comfortably. Contact us and we'll help coordinate.",
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
