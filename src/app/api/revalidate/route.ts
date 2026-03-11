import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * On-demand revalidation for Sanity content.
 * Call this when content is published in Sanity so the live site updates immediately.
 *
 * Sanity webhook should POST to: https://your-site.com/api/revalidate
 * With one of:
 *   - Header: Authorization: Bearer <SANITY_REVALIDATE_SECRET>
 *   - Body (JSON): { "secret": "<SANITY_REVALIDATE_SECRET>" }
 *   - Query: ?secret=<SANITY_REVALIDATE_SECRET>
 *
 * Set SANITY_REVALIDATE_SECRET in Vercel (and .env.local for local testing).
 */
export async function POST(request: NextRequest) {
  const secret =
    process.env.SANITY_REVALIDATE_SECRET ?? process.env.CRON_SECRET;

  if (!secret) {
    console.warn("Revalidate: SANITY_REVALIDATE_SECRET (or CRON_SECRET) not set");
    return NextResponse.json(
      { error: "Revalidation not configured" },
      { status: 501 }
    );
  }

  // Accept secret from header, body, or query
  let provided = "";
  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    provided = auth.slice(7);
  } else {
    try {
      const body = await request.json().catch(() => ({}));
      if (body?.secret) provided = body.secret;
    } catch {
      // no body
    }
    if (!provided) {
      const url = new URL(request.url);
      provided = url.searchParams.get("secret") ?? "";
    }
  }

  if (provided !== secret) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    // Invalidate homepage cache so next request refetches Sanity (testimonials, etc.)
    revalidateTag("homepage");
    // Revalidate all routes that use Sanity content
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");
    revalidatePath("/blog");
    revalidatePath("/blog/[slug]", "page");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      paths: ["/", "/about", "/contact", "/blog", "/blog/[slug]"],
    });
  } catch (err) {
    console.error("Revalidate error:", err);
    return NextResponse.json(
      { error: "Revalidation failed" },
      { status: 500 }
    );
  }
}
