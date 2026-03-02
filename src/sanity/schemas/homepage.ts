import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentIcon } from "@sanity/icons";

/**
 * Homepage editable content: cart features, pricing, testimonials, how it works, why choose us, FAQ, newsletter.
 * Hero stays in code for SEO. No H1; list styles fixed in frontend.
 */
export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: DocumentIcon,
  groups: [
    { name: "cartFeatures", title: "Cart Features", default: true },
    { name: "pricing", title: "Pricing" },
    { name: "testimonials", title: "Testimonials" },
    { name: "howItWorks", title: "How It Works" },
    { name: "whyChooseUs", title: "Why Choose Us" },
    { name: "faq", title: "FAQ" },
    { name: "newsletter", title: "Newsletter" },
  ],
  fields: [
    // ——— Cart Features (content only; list style fixed in code) ———
    defineField({
      name: "featureBullets",
      title: "Feature bullets",
      type: "array",
      group: "cartFeatures",
      description: "Bullet points shown in the Cart Details section. Order matters. Style is fixed in code.",
      of: [{ type: "string" }],
      options: { layout: "list" },
    }),
    defineField({
      name: "cartFeaturesSectionTitle",
      type: "string",
      title: "Section heading (H2)",
      group: "cartFeatures",
      description: "Leave empty to use default: \"4-Seat Electric Carts\".",
    }),
    defineField({
      name: "cartFeaturesBadge",
      type: "string",
      title: "Badge label",
      group: "cartFeatures",
      description: "Leave empty to use default: \"Cart Details\".",
    }),
    // ——— Pricing (cards first so admins see them at top) ———
    defineField({
      name: "pricingCards",
      title: "Pricing cards",
      type: "array",
      group: "pricing",
      description: "The two main cards (Daily Rental, Weekly Special). Max 2.",
      validation: (Rule) => Rule.max(2),
      of: [
        defineArrayMember({
          type: "object",
          name: "pricingCard",
          fields: [
            { name: "title", type: "string", title: "Title", validation: (Rule) => Rule.required(), description: "e.g. Daily Rental" },
            { name: "price", type: "string", title: "Price", validation: (Rule) => Rule.required(), description: "e.g. $65" },
            { name: "unit", type: "string", title: "Unit", validation: (Rule) => Rule.required(), description: "e.g. Day or Week" },
            { name: "desc", type: "text", title: "Description", rows: 2 },
            { name: "badge", type: "string", title: "Badge (e.g. Most Popular)", description: "Leave empty for no badge." },
            { name: "pill", type: "string", title: "Pill label", description: "e.g. Daily or Weekly" },
          ],
          preview: {
            select: { title: "title" },
            prepare: ({ title }) => ({ title: title ?? "Pricing card" }),
          },
        }),
      ],
    }),
    defineField({
      name: "pricingTable",
      title: "Price table rows",
      type: "array",
      group: "pricing",
      description: "Rows for the 'Complete Price List' table. Order matters.",
      of: [
        defineArrayMember({
          type: "object",
          name: "pricingRow",
          fields: [
            { name: "duration", type: "string", title: "Duration", validation: (Rule) => Rule.required(), description: "e.g. 1 Day, 1 Week" },
            { name: "price", type: "string", title: "Price", validation: (Rule) => Rule.required(), description: "e.g. $65" },
            { name: "highlight", type: "boolean", title: "Highlight (Best Value)", initialValue: false },
          ],
          preview: {
            select: { duration: "duration", price: "price" },
            prepare: ({ duration, price }) => ({ title: `${duration} — ${price}` }),
          },
        }),
      ],
    }),
    // ——— Testimonials (content only; style fixed in code) ———
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      group: "testimonials",
      of: [
        defineArrayMember({
          type: "object",
          name: "testimonial",
          fields: [
            { name: "quote", type: "text", title: "Quote", validation: (Rule) => Rule.required(), rows: 3 },
            { name: "name", type: "string", title: "Author name", validation: (Rule) => Rule.required() },
            { name: "title", type: "string", title: "Author title/subtitle", description: "e.g. Hilton Head Local" },
            { name: "avatar", type: "featuredImage", title: "Avatar (optional)" },
          ],
          preview: {
            select: { name: "name", quote: "quote" },
            prepare: ({ name, quote }) => ({ title: name, subtitle: quote ? quote.slice(0, 40) + "…" : "" }),
          },
        }),
      ],
    }),
    // ——— How It Works (content only; icons/order fixed in code) ———
    defineField({
      name: "howItWorksSteps",
      title: "Steps",
      type: "array",
      group: "howItWorks",
      description: "Up to 3 steps. Icons and order are fixed in code.",
      validation: (Rule) => Rule.max(3),
      of: [
        defineArrayMember({
          type: "object",
          name: "howItWorksStep",
          fields: [
            { name: "title", type: "string", title: "Title", validation: (Rule) => Rule.required().max(80) },
            { name: "description", type: "text", title: "Description", validation: (Rule) => Rule.required(), rows: 3 },
          ],
          preview: {
            select: { title: "title" },
            prepare: ({ title }) => ({ title: title ?? "Step" }),
          },
        }),
      ],
    }),
    defineField({
      name: "howItWorksSectionTitle",
      type: "string",
      title: "Section heading (H2)",
      group: "howItWorks",
      description: "Leave empty to use default: \"How It Works\".",
    }),
    defineField({
      name: "howItWorksBadge",
      type: "string",
      title: "Badge label",
      group: "howItWorks",
      description: "Leave empty to use default: \"Simple Process\".",
    }),
    // ——— Why Choose Us (content only; list style fixed in code) ———
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      group: "whyChooseUs",
      description: "Bullet points. Style is fixed in code.",
      of: [{ type: "string" }],
      options: { layout: "list" },
    }),
    defineField({
      name: "whyChooseUsSectionTitle",
      type: "string",
      title: "Section heading (H2)",
      group: "whyChooseUs",
      description: "Leave empty to use default.",
    }),
    defineField({
      name: "whyChooseUsIntro",
      type: "text",
      title: "Intro paragraph",
      group: "whyChooseUs",
      rows: 4,
      description: "Leave empty to use default copy.",
    }),
    defineField({
      name: "whyChooseUsBadge",
      type: "string",
      title: "Badge label",
      group: "whyChooseUs",
      description: "Leave empty to use default.",
    }),
    // ——— FAQ (content only; accordion style fixed in code) ———
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      group: "faq",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          fields: [
            { name: "question", type: "string", title: "Question", validation: (Rule) => Rule.required() },
            { name: "answer", type: "text", title: "Answer", validation: (Rule) => Rule.required(), rows: 4 },
          ],
          preview: {
            select: { question: "question" },
            prepare: ({ question }) => ({ title: question ?? "FAQ item" }),
          },
        }),
      ],
    }),
    // ——— Newsletter ———
    defineField({
      name: "newsletterHeading",
      type: "string",
      title: "Heading (H2)",
      group: "newsletter",
      description: "Leave empty to use default: \"Get Island Updates\".",
    }),
    defineField({
      name: "newsletterSubtext",
      type: "text",
      title: "Subtext",
      group: "newsletter",
      rows: 3,
      description: "Leave empty to use default copy.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
