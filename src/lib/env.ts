const PRODUCTION_URL = "https://islandrentalcarts.com";

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return PRODUCTION_URL;
}

export function isProduction(): boolean {
  return getSiteUrl() === PRODUCTION_URL;
}
