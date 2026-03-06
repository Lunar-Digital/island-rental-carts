import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type PortableTextImageValue = {
  asset?: { _ref?: string };
  alt?: string | null;
  caption?: string | null;
};

type Props = {
  value?: PortableTextImageValue | null;
  /** Fallback alt when value.alt is empty (SEO/accessibility). */
  altFallback?: string;
  className?: string;
};

/**
 * Renders Sanity image blocks inside Portable Text with Next/Image and required alt.
 * Use in portableTextComponents.types.image so inline CMS images are SEO- and a11y-compliant.
 */
export function PortableTextImage({
  value,
  altFallback = "Content image",
  className = "rounded-xl overflow-hidden my-6",
}: Props) {
  if (!value?.asset) return null;

  const url = urlFor(value)?.width(1200).height(630).url() ?? null;
  if (!url) return null;

  const alt = (value.alt ?? value.caption ?? altFallback).trim() || altFallback;

  return (
    <figure className={className}>
      <div className="relative aspect-16/10 w-full max-w-3xl mx-auto">
        <Image
          src={url}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 672px"
        />
      </div>
      {value.caption && value.caption !== alt && (
        <figcaption className="mt-2 text-sm text-gray-500 text-center">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}
