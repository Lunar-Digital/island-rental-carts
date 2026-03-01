import { defineType, defineField } from "sanity";

/**
 * Legacy global settings. For homepage content (pricing, testimonials, FAQ) use the Homepage document instead.
 * Kept for future global settings only.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  description:
    "Legacy. Use Homepage in the sidebar for pricing, testimonials, and FAQ.",
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      description: "Main headline on the homepage hero. Keep short.",
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "string",
      description: "Short line under the headline.",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "pricingDailyLabel",
      title: "Pricing: Daily Label",
      type: "string",
      description: "e.g. Daily Rental",
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: "pricingDailyPrice",
      title: "Pricing: Daily Price",
      type: "string",
      description: "e.g. $65",
      validation: (Rule) => Rule.max(20),
    }),
    defineField({
      name: "pricingWeeklyLabel",
      title: "Pricing: Weekly Label",
      type: "string",
      description: "e.g. Weekly Special",
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: "pricingWeeklyPrice",
      title: "Pricing: Weekly Price",
      type: "string",
      description: "e.g. $400",
      validation: (Rule) => Rule.max(20),
    }),
  ],
});
