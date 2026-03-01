import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentIcon } from "@sanity/icons";

/**
 * Homepage editable content: pricing, testimonials, FAQ.
 * Hero stays in code for SEO. No H1; list styles fixed in frontend.
 */
export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: DocumentIcon,
  groups: [
    { name: "pricing", title: "Pricing", default: true },
    { name: "testimonials", title: "Testimonials" },
    { name: "faq", title: "FAQ" },
  ],
  fields: [
    // ——— Pricing ———
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
    defineField({
      name: "pricingCards",
      title: "Pricing cards",
      type: "array",
      group: "pricing",
      description: "The two main cards (Daily Rental, Weekly Special). Max 2 for layout.",
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
            { name: "image", type: "featuredImage", title: "Card image" },
          ],
          preview: {
            select: { title: "title" },
            prepare: ({ title }) => ({ title: title ?? "Pricing card" }),
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
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
