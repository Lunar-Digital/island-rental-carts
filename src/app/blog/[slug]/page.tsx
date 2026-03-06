import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableTextImage } from "@/components/PortableTextImage";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/client";
import { POST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { getSiteUrl } from "@/lib/env";
import type { Metadata } from "next";

const siteUrl = getSiteUrl();

type Post = {
  _id: string;
  title: string | null;
  slug: { current: string };
  publishedAt?: string | null;
  featuredImage?: { asset?: { _ref?: string }; alt?: string | null } | null;
  body?: PortableTextBlock[];
  metaTitle?: string | null;
  metaDescription?: string | null;
};

type Props = { params: Promise<{ slug: string }> };

// Blog is rendered on demand so build does not require Sanity credentials
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    revalidate: 60,
  });
  if (!post) return { title: "Post Not Found", description: "The requested blog post was not found. Browse Island Rental Carts blog for Daufuskie Island golf cart rental tips and news." };
  const title = post.metaTitle ?? post.title ?? "Blog | Island Rental Carts";
  const description =
    post.metaDescription ??
    "Read more on the Island Rental Carts blog – Daufuskie Island golf cart rentals.";
  const canonical = `${siteUrl}/blog/${post.slug.current}`;
  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage)?.width(1200).height(630).url()
    : null;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      ...(imageUrl ? { images: [{ url: imageUrl, width: 1200, height: 630 }] } : {}),
    },
  };
}

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-10 mb-4 text-2xl font-bold text-white">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-8 mb-3 text-xl font-bold text-white">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>
    ),
  },
  types: {
    image: ({ value }: { value?: { asset?: { _ref?: string }; alt?: string | null; caption?: string | null } }) => (
      <PortableTextImage value={value} altFallback="Blog post image — Island Rental Carts, Daufuskie Island golf cart rentals" className="rounded-xl overflow-hidden my-6" />
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href?: string };
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lime hover:underline"
      >
        {children}
      </a>
    ),
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    revalidate: 60,
  });

  if (!post) notFound();

  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage)?.width(1200).height(630).url()
    : null;
  const imageAlt = post.featuredImage?.alt ?? post.title ?? "Blog post";

  return (
    <article className="bg-brand-950 min-h-screen text-white">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <Link
          href="/blog"
          className="inline-block text-gray-400 hover:text-lime text-sm mb-8"
        >
          ← Back to Blog
        </Link>

        {post.publishedAt && (
          <time
            dateTime={post.publishedAt}
            className="text-sm text-gray-400 block mb-4"
          >
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}

        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">
          {post.title ?? "Untitled"}
        </h1>

        {imageUrl && (
          <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-10 bg-brand-800">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          </div>
        )}

        {post.body && post.body.length > 0 && (
          <div className="prose-invert max-w-none">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        )}
      </div>
    </article>
  );
}
