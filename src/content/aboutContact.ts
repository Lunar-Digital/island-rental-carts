/**
 * About and Contact page content from .cursor/ABOUT_AND_CONTACT_PAGE_COPY.md.
 * Applied as the default content; supports SEO and consistent UI. Sanity can override when documents exist.
 */

import type { PortableTextBlock } from "@portabletext/react";

function block(
  style: "h2" | "h3" | "normal",
  text: string,
  key: string,
  markDefs: { _key: string; _type: string; href: string }[] = []
): PortableTextBlock {
  const linkMarks = markDefs.length ? [markDefs[0]._key] : [];
  return {
    _type: "block",
    _key: key,
    style,
    children: [{ _type: "span", _key: `${key}-0`, text, marks: linkMarks }],
    markDefs,
  };
}

function blockWithLink(
  style: "h2" | "h3" | "normal",
  segments: { text: string; href?: string }[],
  key: string
): PortableTextBlock {
  const markDefs: { _key: string; _type: string; href: string }[] = [];
  const children = segments.map((seg, i) => {
    if (seg.href) {
      const linkKey = `link-${key}-${i}`;
      markDefs.push({ _key: linkKey, _type: "link", href: seg.href });
      return {
        _type: "span" as const,
        _key: `${key}-${i}`,
        text: seg.text,
        marks: [linkKey],
      };
    }
    return {
      _type: "span" as const,
      _key: `${key}-${i}`,
      text: seg.text,
      marks: [],
    };
  });
  return {
    _type: "block",
    _key: key,
    style,
    children,
    markDefs,
  };
}

// —— About page (from ABOUT_AND_CONTACT_PAGE_COPY.md) ——

export const aboutMeta = {
  // Supporting intent only: avoid competing with homepage for "golf cart rental" (see CONTENT_AND_SEO_GUIDE.md).
  metaTitle: "About Us | Island Rental Carts – Daufuskie Island",
  metaDescription:
    "Learn about Island Rental Carts — who we are, why we're your local choice for golf cart rentals on Daufuskie Island, and how we help you explore.",
};

export const aboutContent = {
  h1: "About Island Rental Carts",
  title: "Locally owned. Here to help you explore the island.",
  body: [
    block("h2", "Who We Are", "about-h2-1"),
    block(
      "normal",
      "We're a locally owned golf cart rental company on Daufuskie Island. We live and work here, and we know how important reliable transportation is when you're visiting — whether for a day trip or a full week.",
      "about-p-1"
    ),
    block(
      "normal",
      "We run Island Rental Carts because we love the island and want every guest to get the most out of it. That means simple booking, carts ready at the ferry, and straightforward pricing with no surprises.",
      "about-p-2"
    ),
    block("h2", "Getting Around Daufuskie Island", "about-h2-2"),
    block(
      "normal",
      "Daufuskie has no cars, no rideshares, and no public transit. The island is about 8 square miles of sandy roads connecting beaches, historic spots, restaurants, and rental homes. For most visitors, a golf cart isn't optional — it's how you get around.",
      "about-p-3"
    ),
    block(
      "normal",
      "We offer 4-seater electric golf carts that are perfect for couples, families, and small groups. Our carts are delivered to the ferry dock so you can pick up and go, or we deliver island-wide to your rental for overnight and weekly stays.",
      "about-p-4"
    ),
    block("h2", "Why Choose Us", "about-h2-3"),
    block(
      "normal",
      "Locally owned and operated — We're on the island. When you call or email, you're talking to us, not a call center.",
      "about-p-5"
    ),
    block(
      "normal",
      "Simple booking — Reserve your cart online in about 2 minutes via our booking link. See real-time availability and confirm on the spot.",
      "about-p-6"
    ),
    block(
      "normal",
      "Free island-wide delivery — Pickup at the ferry, or we'll bring your cart to your rental so it's there when you arrive.",
      "about-p-7"
    ),
    block(
      "normal",
      "Transparent pricing — Daily and weekly rates are clear up front, with no hidden fees.",
      "about-p-8"
    ),
    block("h2", "Ready to Explore?", "about-h2-4"),
    blockWithLink(
      "normal",
      [
        { text: "The best way to secure your cart is to book online: choose your dates, complete checkout, and we'll take care of the rest. See pricing and reserve your golf cart " },
        { text: "on our homepage", href: "/" },
        { text: "." },
      ],
      "about-p-9"
    ),
    blockWithLink(
      "normal",
      [
        { text: "Questions? Get in touch — we're happy to help.", href: "/contact" },
      ],
      "about-p-10"
    ),
  ] as PortableTextBlock[],
};

// —— Contact page (from ABOUT_AND_CONTACT_PAGE_COPY.md) ——

export const contactMeta = {
  // Contact intent first; avoid repeating homepage primary phrase in title (see CONTENT_AND_SEO_GUIDE.md).
  metaTitle: "Contact | Island Rental Carts – Questions & Booking Help",
  metaDescription:
    "Get in touch with Island Rental Carts. Book your Daufuskie Island golf cart online, or contact us for questions and special requests.",
};

export const contactContent = {
  h1: "Contact",
  title: "Questions, special requests, or ready to book? We're here to help.",
  body: [
    block(
      "normal",
      "Reservations are made online — use the Book Now button on our site to see availability and reserve your golf cart in about 2 minutes. For questions, special requests, or help with an existing booking, reach out by phone or email. We're a small local team and we answer as quickly as we can.",
      "contact-p-1"
    ),
    block("h2", "Book Online First", "contact-h2-1"),
    block(
      "normal",
      "The fastest way to secure your cart is to book through our website. Click Book Now anywhere on the site to open our booking page, choose your dates, and complete your reservation. You'll get a confirmation right away.",
      "contact-p-2"
    ),
    block("h2", "Questions or Special Requests?", "contact-h2-2"),
    block(
      "normal",
      "Need help choosing dates, have a large group, or want to confirm pickup details? Call or email us. We can help with multi-cart bookings, delivery to your rental, and any questions about getting around Daufuskie Island.",
      "contact-p-3"
    ),
    block("h2", "Phone, Email & Address", "contact-h2-3"),
    block(
      "normal",
      "Our phone number, email, and address are listed below. For reservations, we still recommend booking online so you can see real-time availability — but we're here if you'd rather talk first.",
      "contact-p-4"
    ),
    block("h2", "We're Here to Help", "contact-h2-4"),
    blockWithLink(
      "normal",
      [
        { text: "Whether you're planning a day trip or a week on the island, we're happy to answer questions and make sure your rental is smooth. Reach out anytime — and when you're ready, book your cart on our " },
        { text: "homepage", href: "/" },
        { text: "." },
      ],
      "contact-p-5"
    ),
  ] as PortableTextBlock[],
};
