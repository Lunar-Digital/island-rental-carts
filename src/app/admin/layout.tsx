import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Admin – Island Rental Carts",
  robots: "noindex, nofollow",
  referrer: "same-origin",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
