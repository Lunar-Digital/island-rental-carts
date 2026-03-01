"use client";

import { DashboardWidgetContainer } from "@sanity/dashboard";

const VERCEL_ANALYTICS_URL = "https://vercel.com/dashboard";
const VIEW_SITE_URL =
  typeof window !== "undefined"
    ? window.location.origin.replace("/admin", "")
    : "https://island-rental-carts.vercel.app";

export function WelcomeWidget() {
  return (
    <DashboardWidgetContainer header="Welcome">
      <div style={{ padding: 16 }}>
        <p style={{ margin: "0 0 1rem", color: "var(--card-muted-fg-color)", fontSize: 14 }}>
          Edit content here, then view your site. To see page views and traffic,
          open your project in Vercel and go to the Analytics tab.
        </p>
        <p style={{ margin: "0 0 0.5rem", fontSize: 13, color: "var(--card-muted-fg-color)" }}>
          Top bar icon reference: see README → Sanity admin.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <a
            href={VIEW_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "10px 16px",
              backgroundColor: "var(--card-link-color)",
              color: "var(--card-bg-color)",
              borderRadius: 6,
              fontWeight: 600,
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            View site
          </a>
          <a
            href={VERCEL_ANALYTICS_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "10px 16px",
              border: "1px solid var(--card-border-color)",
              borderRadius: 6,
              fontWeight: 600,
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            Vercel → Analytics
          </a>
          <a
            href="https://www.sanity.io/docs"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "10px 16px",
              border: "1px solid var(--card-border-color)",
              borderRadius: 6,
              fontWeight: 600,
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            Getting started (Sanity docs)
          </a>
        </div>
      </div>
    </DashboardWidgetContainer>
  );
}

export function welcomeWidget(config?: {
  layout?: { width?: "small" | "medium" | "large" | "full"; height?: "small" | "medium" | "large" | "full" };
}) {
  return {
    name: "welcome",
    component: WelcomeWidget,
    layout: config?.layout ?? { width: "medium" as const },
  };
}
