import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PortableTextImage } from "@/components/PortableTextImage";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/client";
import { PAGE_BY_ID_QUERY } from "@/sanity/lib/queries";
import { getSiteUrl } from "@/lib/env";
import {
  PHONE,
  PHONE_HREF,
  EMAIL,
  EMAIL_HREF,
  ADDRESS_STREET,
  ADDRESS_CITY,
} from "@/lib/constants";
import { contactContent, contactMeta } from "@/content/aboutContact";
import type { Metadata } from "next";

const siteUrl = getSiteUrl();

type PageDoc = {
  title?: string | null;
  body?: PortableTextBlock[];
  metaTitle?: string | null;
  metaDescription?: string | null;
};

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<PageDoc | null>({
    query: PAGE_BY_ID_QUERY,
    params: { id: "contact" },
    revalidate: 60,
  });
  const title = page?.metaTitle ?? contactMeta.metaTitle;
  const description =
    page?.metaDescription ?? contactMeta.metaDescription;
  const canonical = `${siteUrl}/contact`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "Island Rental Carts",
      locale: "en_US",
      images: [
        {
          url: "/images/daufuskie-island-golf-cart-rentals-og.webp",
          width: 1200,
          height: 630,
          alt: "Island Rental Carts — Daufuskie Island golf cart rentals. $65/day · Book in 2 minutes.",
        },
      ],
    },
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
      <PortableTextImage value={value} altFallback="Contact Island Rental Carts — Daufuskie Island golf cart rental" className="rounded-xl overflow-hidden my-6" />
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

export default async function ContactPage() {
  const page = await sanityFetch<PageDoc | null>({
    query: PAGE_BY_ID_QUERY,
    params: { id: "contact" },
    revalidate: 60,
  });

  const title = page?.title ?? contactContent.title;
  const body =
    page?.body && page.body.length > 0 ? page.body : contactContent.body;

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen" id="main-content">
        <section
          aria-label="Contact Island Rental Carts"
          className="max-w-3xl mx-auto px-6 py-16 md:py-24"
        >
          <h1 className="text-4xl md:text-5xl font-black text-brand-800 uppercase tracking-tighter mb-8">
            {contactContent.h1}
          </h1>
          {title && (
            <p className="text-xl text-gray-600 font-medium mb-10">{title}</p>
          )}
          <div className="prose-invert max-w-none mb-12">
            <PortableText value={body} components={portableTextComponents} />
          </div>
          <div
            className="border-t border-gray-200 pt-10 space-y-6"
            aria-label="Phone, email, and address"
          >
            <p className="font-bold text-brand-800">
              <a
                href={PHONE_HREF}
                className="hover:text-lime-600 focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded"
              >
                {PHONE}
              </a>
            </p>
            <p className="font-bold text-brand-800">
              <a
                href={EMAIL_HREF}
                className="hover:text-lime-600 focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded"
              >
                {EMAIL}
              </a>
            </p>
            <p className="text-gray-600">
              {ADDRESS_STREET}
              <br />
              {ADDRESS_CITY}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
