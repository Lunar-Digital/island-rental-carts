import { createImageUrlBuilder } from "@sanity/image-url";
import { getClient } from "./client";

export function urlFor(
  source:
    | { _ref?: string; asset?: { _ref?: string }; _type?: string }
    | null
) {
  const client = getClient();
  if (!client || !source) return null;
  return createImageUrlBuilder(client).image(source);
}
