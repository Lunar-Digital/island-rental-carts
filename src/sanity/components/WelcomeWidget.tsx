"use client";

import { useState, useEffect } from "react";
import { useCurrentUser } from "sanity";
import { DashboardWidgetContainer } from "@sanity/dashboard";

const VIEW_SITE_URL =
  typeof window !== "undefined"
    ? window.location.origin.replace("/admin", "")
    : "https://island-rental-carts.vercel.app";

const SUPPORT_EMAIL = "edwin@lunardigital.net";
const SUPPORT_SUBJECT = "IRC website – message or change request";

const cardMuted = "var(--card-muted-fg-color)";
const cardBorder = "var(--card-border-color)";
const linkBg = "var(--card-link-color)";
const cardBg = "var(--card-bg-color)";

function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

export function WelcomeWidget() {
  const [greeting, setGreeting] = useState("");
  const user = useCurrentUser();
  const displayName = user?.name ?? user?.email ?? "";

  useEffect(() => {
    setGreeting(getTimeGreeting());
  }, []);

  const mailtoHref = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(SUPPORT_SUBJECT)}`;

  return (
    <DashboardWidgetContainer header="Welcome to IRC Dashboard">
      <div style={{ padding: 16 }}>
        <p style={{ margin: "0 0 12px", fontSize: 15, color: cardMuted, lineHeight: 1.5 }}>
          {greeting ? (
            <>Good {greeting}{displayName ? `, ${displayName}` : ""}, welcome to the IRC website.</>
          ) : (
            <>Welcome to the IRC website{displayName ? `, ${displayName}` : ""}.</>
          )}{" "}
          If you like what you see, or would like help with changes, send us a message here:
        </p>
        <p style={{ margin: "0 0 16px" }}>
          <a
            href={mailtoHref}
            style={{
              display: "inline-block",
              padding: "10px 18px",
              backgroundColor: linkBg,
              color: cardBg,
              borderRadius: 6,
              fontWeight: 600,
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            Send a message
          </a>
        </p>
        <p style={{ margin: "0 0 12px", fontSize: 14, color: cardMuted, lineHeight: 1.5 }}>
          Use <strong>Content Editor</strong> in the top nav to edit your site. Choose <strong>Homepage</strong>, <strong>About</strong>, <strong>Contact</strong>, or <strong>Blog posts</strong> from the sidebar.
        </p>
        <p style={{ margin: "0 0 16px", fontSize: 14, color: cardMuted, lineHeight: 1.5 }}>
          <strong>Important:</strong> Changes only go live after you click <strong>Publish</strong> (checkmark in the top bar). After publishing, the live site updates within a few seconds.
        </p>
        <div style={{ marginBottom: 16, padding: 12, borderRadius: 8, border: `1px solid ${cardBorder}` }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: cardMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Where to edit what</div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: cardMuted, lineHeight: 1.7 }}>
            <li><strong>Homepage</strong> — Pricing cards, testimonials, FAQ, newsletter, and more (tabs at top)</li>
            <li><strong>About</strong> — About page body and SEO</li>
            <li><strong>Contact</strong> — Contact page body and SEO</li>
            <li><strong>Blog posts</strong> — Add or edit blog articles</li>
          </ul>
        </div>
        <a
          href={VIEW_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "10px 16px",
            border: `1px solid ${cardBorder}`,
            borderRadius: 6,
            fontWeight: 600,
            textDecoration: "none",
            fontSize: 14,
            color: cardMuted,
          }}
        >
          View live site
        </a>
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
