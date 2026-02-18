import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://islandrentalcarts.com"),
  title: "Daufuskie Island Golf Cart Rentals | Island Rental Carts – $65/Day",
  description:
    "Rent 4-seater electric golf carts on Daufuskie Island, SC. Starting at $65/day with free island-wide delivery. Book online in 2 minutes via Peek. Locally owned.",
  keywords:
    "daufuskie island golf cart rental, golf cart rental daufuskie island, daufuskie island rentals, electric golf cart daufuskie, daufuskie island transportation",
  alternates: {
    canonical: "https://islandrentalcarts.com",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Daufuskie Island Golf Cart Rentals | Island Rental Carts",
    description:
      "Rent 4-seater electric golf carts on Daufuskie Island. $65/day, free delivery, book in 2 minutes.",
    url: "https://islandrentalcarts.com",
    siteName: "Island Rental Carts",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
