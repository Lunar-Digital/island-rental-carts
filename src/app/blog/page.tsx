import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { getSiteUrl } from "@/lib/env";

const siteUrl = getSiteUrl();

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog | Island Rental Carts – Daufuskie Island Golf Cart Rentals",
  description:
    "Tips, guides, and news about Daufuskie Island golf cart rentals and island life.",
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: "Blog | Island Rental Carts",
    description:
      "Tips, guides, and news about Daufuskie Island golf cart rentals.",
    url: `${siteUrl}/blog`,
    type: "website",
  },
};

type Post = {
  _id: string;
  title: string | null;
  slug: { current: string };
  featuredImageUrl?: string | null;
  featuredImageAlt?: string | null;
  publishedAt?: string | null;
};

export default async function BlogIndexPage() {
  const posts = await sanityFetch<Post[]>({ query: POSTS_QUERY });

  return (
    <div className="bg-brand-950 min-h-screen text-white">
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
          Blog
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-12">
          Tips, guides, and news about Daufuskie Island golf cart rentals and
          island life.
        </p>

        {!posts?.length ? (
          <p className="text-gray-400">
            No posts yet. Add content in the{" "}
            <a
              href="/admin"
              className="text-lime hover:underline"
            >
              admin dashboard
            </a>
            .
          </p>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post._id}>
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="group block rounded-xl overflow-hidden bg-brand-900 border border-white/10 hover:border-lime/30 transition-colors"
                >
                  {post.featuredImageUrl ? (
                    <div className="relative aspect-[16/10] bg-brand-800">
                      <Image
                        src={post.featuredImageUrl}
                        alt={post.featuredImageAlt ?? post.title ?? "Blog post"}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-brand-800 flex items-center justify-center text-gray-500">
                      No image
                    </div>
                  )}
                  <div className="p-5">
                    <h2 className="font-bold text-lg text-white group-hover:text-lime transition-colors line-clamp-2">
                      {post.title ?? "Untitled"}
                    </h2>
                    {post.publishedAt && (
                      <time
                        dateTime={post.publishedAt}
                        className="text-sm text-gray-400 mt-1 block"
                      >
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
