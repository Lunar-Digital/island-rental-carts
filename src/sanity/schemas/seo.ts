import { defineType } from "sanity";

/**
 * SEO fields for meta title and description. Enforced limits to protect SEO.
 */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    {
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Recommended 50–60 characters for search results.",
      validation: (Rule) => Rule.max(70).warning("Keep under 70 characters for best display."),
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 2,
      description: "Recommended 150–160 characters for search results.",
      validation: (Rule) => Rule.max(160).warning("Keep under 160 characters for best display."),
    },
  ],
});
