import type { SchemaTypeDefinition } from "sanity";
import { blockContent } from "./blockContent";
import { featuredImage } from "./featuredImage";
import { seo } from "./seo";
import { structuredData } from "./structuredData";
import { post } from "./post";
import { siteSettings } from "./siteSettings";
import { homepage } from "./homepage";
import { aboutPage } from "./aboutPage";
import { contactPage } from "./contactPage";

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContent,
  featuredImage,
  seo,
  structuredData,
  post,
  siteSettings,
  homepage,
  aboutPage,
  contactPage,
];
