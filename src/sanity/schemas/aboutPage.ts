import { defineType, defineField } from "sanity";
import { DocumentIcon } from "@sanity/icons";

/**
 * About page. Page H1 is fixed in code; Sanity title used for metadata/nav or as H2.
 * Body uses blockContent (H2, H3 only — no H1).
 */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Used for metadata and optional subheading. Page H1 is fixed in code.",
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      readOnly: true,
      initialValue: { current: "about" },
      options: { source: "title" },
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      description: "Use H2 and H3 for headings. No H1.",
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "featuredImage",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
    defineField({
      name: "structuredData",
      title: "Structured Data Controls",
      type: "structuredData",
    }),
  ],
  preview: {
    prepare: () => ({ title: "About" }),
  },
});
