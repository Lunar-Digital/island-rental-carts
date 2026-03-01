// Fallback so blog/admin work without .env.local; set env for Vercel etc.
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "oe6l4tp6";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";
