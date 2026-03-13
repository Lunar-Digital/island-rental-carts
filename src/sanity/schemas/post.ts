import { defineType, defineField } from "sanity";
import { DocumentsIcon } from "@sanity/icons";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  icon: DocumentsIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(100)
          .warning("Shorter titles often work better for SEO."),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "featuredImage",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
    defineField({
      name: "structuredData",
      title: "Structured Data Controls",
      type: "structuredData",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "title", media: "featuredImage" },
    prepare({ title, media }) {
      return {
        title: title ?? "Untitled",
        media: media?.asset,
      };
    },
  },
});
