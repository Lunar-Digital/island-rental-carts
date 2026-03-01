import { defineCliConfig } from "sanity/cli";

// Used by Sanity CLI (e.g. `npx sanity cors add`). Next.js app uses .env.local / Vercel env.
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "oe6l4tp6";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineCliConfig({ api: { projectId, dataset } });
