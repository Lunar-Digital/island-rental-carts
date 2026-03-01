import { createClient, type QueryParams, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

let _client: SanityClient | null = null;

export function getClient(): SanityClient | null {
  if (!projectId) return null;
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    });
  }
  return _client;
}

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}): Promise<T> {
  const c = getClient();
  if (!c) return [] as T;
  return c.fetch<T>(query, params, {
    cache: "force-cache",
    next: {
      revalidate: tags.length ? false : revalidate,
      ...(tags.length ? { tags } : {}),
    },
  });
}
