import { defineType, defineField } from "sanity";
import { DocumentIcon } from "@sanity/icons";

/**
 * Contact page. Page H1 is fixed in code; Sanity title used for metadata/nav or as H2.
 * Body for intro text. Phone/email/address can stay in constants or be added here.
 */
export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
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
      initialValue: { current: "contact" },
      options: { source: "title" },
    }),
    defineField({
      name: "body",
      title: "Intro / instructions",
      type: "blockContent",
      description: "Use H2 and H3 for headings. No H1.",
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
    prepare: () => ({ title: "Contact" }),
  },
});
