import { defineType } from "sanity";

/**
 * Image with required alt text for accessibility and SEO.
 */
export const featuredImage = defineType({
  name: "featuredImage",
  title: "Featured Image",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "alt",
      title: "Alternative Text",
      type: "string",
      description: "Required for accessibility and SEO. Describe the image briefly.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
  ],
});
