import { defineType, defineField } from "sanity";

/**
 * Structured data controls for JSON-LD. Lets editors disable or remove
 * schema fields (e.g. itemReviewed) without code changes.
 */
export const structuredData = defineType({
  name: "structuredData",
  title: "Structured Data Controls",
  type: "object",
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    defineField({
      name: "enableFaq",
      title: "Enable FAQ Schema",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "enableReviews",
      title: "Enable Reviews Schema",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "disableItemReviewed",
      title: "Disable itemReviewed Field",
      type: "boolean",
      initialValue: false,
      description: "Removes itemReviewed from each Review in Product schema. Use if Search Console reports errors.",
    }),
    defineField({
      name: "removeFields",
      title: "Remove Schema Fields",
      type: "array",
      of: [{ type: "string" }],
      description: "Top-level field names to strip from schema (e.g. aggregateRating, review).",
    }),
  ],
});
