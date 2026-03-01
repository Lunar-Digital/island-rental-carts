"use client";

import { useCallback, useEffect, useState } from "react";
import { useClient } from "sanity";
import { PaneContent, PaneLayout } from "sanity/structure";

const GROQ_COUNT = 'count(*[_type == "post"])';
const GROQ_LIST = '*[_type == "post"] | order(_createdAt desc){ _id, title }';

type BlogPostsPaneProps = Record<string, unknown>;

const cardStyle = {
  padding: 16,
  borderRadius: 6,
  backgroundColor: "var(--card-bg-color)",
  border: "1px solid var(--card-border-color)",
};
const emptyCardStyle = { ...cardStyle, textAlign: "center" as const };
const createButtonStyle = {
  display: "inline-block",
  marginTop: 16,
  padding: "12px 20px",
  backgroundColor: "var(--card-link-color)",
  color: "var(--card-bg-color)",
  borderRadius: 6,
  fontWeight: 600,
  textDecoration: "none",
  fontSize: 14,
};

export function BlogPostsPane(_props: BlogPostsPaneProps) {
  const client = useClient({ apiVersion: "2024-01-01" });
  const [state, setState] = useState<
    { status: "loading" } | { status: "empty" } | { status: "list"; posts: { _id: string; title?: string }[] }
  >({ status: "loading" });

  const basePath = "/admin";

  const fetchData = useCallback(async () => {
    try {
      const [count, posts] = await Promise.all([
        client.fetch<number>(GROQ_COUNT),
        client.fetch<{ _id: string; title?: string }[]>(GROQ_LIST),
      ]);
      if (count === 0) {
        setState({ status: "empty" });
      } else {
        setState({ status: "list", posts });
      }
    } catch {
      setState({ status: "empty" });
    }
  }, [client]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (state.status === "loading") {
    return (
      <PaneLayout>
        <PaneContent>
          <div style={{ padding: 16, color: "var(--card-muted-fg-color)" }}>Loading…</div>
        </PaneContent>
      </PaneLayout>
    );
  }

  if (state.status === "empty") {
    // Sanity expects intent params as a path segment string (e.g. "type=post"), not query params
    const createHref = `${basePath}/intent/create/type=post/`;
    return (
      <PaneLayout>
        <PaneContent>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
            <div style={emptyCardStyle}>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>No blog posts yet.</p>
              <a href={createHref} style={createButtonStyle}>
                Create your first blog post
              </a>
            </div>
          </div>
        </PaneContent>
      </PaneLayout>
    );
  }

  // Sanity expects intent params as a path segment string (e.g. "id=xxx;type=post")
  const editHref = (id: string) =>
    `${basePath}/intent/edit/id=${encodeURIComponent(id)};type=post/`;
  return (
    <PaneLayout>
      <PaneContent>
        <div style={{ padding: 8, display: "flex", flexDirection: "column", gap: 4 }}>
          {state.posts.map((post) => (
            <a
              key={post._id}
              href={editHref(post._id)}
              style={{ ...cardStyle, textDecoration: "none", color: "inherit" }}
            >
              <span style={{ fontSize: 14 }}>{post.title || "Untitled"}</span>
            </a>
          ))}
        </div>
      </PaneContent>
    </PaneLayout>
  );
}
