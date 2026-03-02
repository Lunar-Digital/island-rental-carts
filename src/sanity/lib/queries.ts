/**
 * Homepage singleton (id: homepage). Cart features, pricing, testimonials, how it works, why choose us, FAQ, newsletter.
 */
export const HOMEPAGE_QUERY = `*[_id == "homepage"][0] {
  featureBullets,
  cartFeaturesSectionTitle,
  cartFeaturesBadge,
  pricingTable,
  pricingCards[] { title, price, unit, desc, badge, pill },
  testimonials[] { quote, name, title, "avatarUrl": avatar.asset->url, "avatarAlt": avatar.alt },
  howItWorksSteps[] { title, description },
  howItWorksSectionTitle,
  howItWorksBadge,
  benefits,
  whyChooseUsSectionTitle,
  whyChooseUsIntro,
  whyChooseUsBadge,
  faq[] { question, answer },
  newsletterHeading,
  newsletterSubtext
}`;

/**
 * Page by document id (e.g. "about", "contact").
 */
export const PAGE_BY_ID_QUERY = `*[_id == $id][0] {
  _id,
  title,
  slug,
  body,
  featuredImage,
  "metaTitle": seo.metaTitle,
  "metaDescription": seo.metaDescription
}`;

/**
 * GROQ queries for blog. Slug and SEO fields included for listing and metadata.
 */
export const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  "featuredImageUrl": featuredImage.asset->url,
  "featuredImageAlt": featuredImage.alt,
  publishedAt,
  "metaTitle": seo.metaTitle,
  "metaDescription": seo.metaDescription
}`;

export const POST_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`;

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  featuredImage,
  body,
  "metaTitle": seo.metaTitle,
  "metaDescription": seo.metaDescription
}`;
