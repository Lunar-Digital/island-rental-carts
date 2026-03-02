import { defineConfig } from "sanity";
import { dashboardTool } from "@sanity/dashboard";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { welcomeWidget } from "./sanity/components/WelcomeWidget";
import { deskStructure } from "./sanity/deskStructure";

// Fallback so /admin works without .env.local; set env for other environments (e.g. Vercel)
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "oe6l4tp6";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

// Vision (GROQ query editor) is for developers; hide in production unless explicitly enabled
const showVision =
  process.env.NODE_ENV === "development" ||
  process.env.NEXT_PUBLIC_SANITY_SHOW_VISION === "true";

export default defineConfig({
  name: "irc-dashboard",
  title: "IRC Dashboard",
  projectId,
  dataset,
  basePath: "/admin",
  plugins: [
    dashboardTool({
      widgets: [welcomeWidget()],
    }),
    structureTool({
      title: "Content Editor",
      structure: deskStructure,
    }),
    ...(showVision ? [visionTool()] : []),
  ],
  schema: {
    types: schemaTypes,
  },
});
