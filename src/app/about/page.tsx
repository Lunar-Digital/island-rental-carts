import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PortableTextImage } from "@/components/PortableTextImage";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { PAGE_BY_ID_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { getSiteUrl } from "@/lib/env";
import { aboutContent, aboutMeta } from "@/content/aboutContact";
import type { Metadata } from "next";

const siteUrl = getSiteUrl();

type PageDoc = {
  title?: string | null;
  body?: PortableTextBlock[];
  featuredImage?: { asset?: { _ref?: string }; alt?: string | null } | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
};

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<PageDoc | null>({
    query: PAGE_BY_ID_QUERY,
    params: { id: "about" },
    revalidate: 60,
  });
  const title = page?.metaTitle ?? aboutMeta.metaTitle;
  const description =
    page?.metaDescription ?? aboutMeta.metaDescription;
  const canonical = `${siteUrl}/about`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
  };
}

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-10 mb-4 text-2xl font-bold text-brand-800">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-8 mb-3 text-xl font-bold text-brand-800">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 text-gray-600 leading-relaxed">{children}</p>
    ),
  },
  types: {
    image: ({ value }: { value?: { asset?: { _ref?: string }; alt?: string | null; caption?: string | null } }) => (
      <PortableTextImage value={value} altFallback="About Island Rental Carts — Daufuskie Island golf cart rental" className="rounded-xl overflow-hidden my-6" />
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href?: string };
    }) => {
      const href = value?.href ?? "#";
      const isRelative = href.startsWith("/");
      let sameOrigin = false;
      try {
        if (href.startsWith("http")) sameOrigin = new URL(href).origin === new URL(siteUrl).origin;
      } catch {
        // ignore
      }
      const isInternal = isRelative || sameOrigin;
      const linkHref = isInternal && href.startsWith("http") ? new URL(href).pathname : href;
      if (isInternal) {
        return (
          <Link
            href={linkHref}
            className="text-lime-600 hover:underline font-medium"
          >
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lime-600 hover:underline font-medium"
        >
          {children}
        </a>
      );
    },
  },
};

export default async function AboutPage() {
  const page = await sanityFetch<PageDoc | null>({
    query: PAGE_BY_ID_QUERY,
    params: { id: "about" },
    revalidate: 60,
  });

  const title = page?.title ?? aboutContent.title;
  const body =
    page?.body && page.body.length > 0 ? page.body : aboutContent.body;

  const imageUrl = page?.featuredImage
    ? urlFor(page.featuredImage)?.width(1200).height(630).url()
    : null;
  const imageAlt =
    page?.featuredImage?.alt ?? "About Island Rental Carts — locally owned Daufuskie Island golf cart rental";

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen" id="main-content">
        <section
          aria-label="About Island Rental Carts"
          className="max-w-3xl mx-auto px-6 py-16 md:py-24"
        >
          <h1 className="text-4xl md:text-5xl font-black text-brand-800 uppercase tracking-tighter mb-8">
            {aboutContent.h1}
          </h1>
          {title && (
            <p className="text-xl text-gray-600 font-medium mb-10">{title}</p>
          )}
          {imageUrl && (
            <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-10 bg-brand-100">
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
          <div className="prose-invert max-w-none">
            <PortableText value={body} components={portableTextComponents} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
