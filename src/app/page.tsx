import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CartFeatures } from "@/components/CartFeatures";
import { PricingSection } from "@/components/PricingSection";
import { Testimonials } from "@/components/Testimonials";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FAQ } from "@/components/FAQ";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { JsonLd } from "@/components/JsonLd";
import { sanityFetch } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries";

export default async function Home() {
  const homepage = await sanityFetch<{
    pricingTable?: { duration: string; price: string; highlight?: boolean }[];
    pricingCards?: {
      title: string;
      price: string;
      unit: string;
      desc?: string;
      badge?: string | null;
      pill?: string;
      imageUrl?: string | null;
      imageAlt?: string | null;
    }[];
    testimonials?: { quote: string; name: string; title?: string }[];
    faq?: { question: string; answer: string }[];
  }>({ query: HOMEPAGE_QUERY, revalidate: 60 });

  return (
    <>
      <Header />
      <main>
        <Hero />
        <CartFeatures />
        <PricingSection
          pricingTable={homepage?.pricingTable}
          pricingCards={homepage?.pricingCards}
        />
        <Testimonials testimonials={homepage?.testimonials} />
        <HowItWorks />
        <WhyChooseUs />
        <FAQ faq={homepage?.faq} />
        <Newsletter />
      </main>
      <Footer />
      <BackToTop />
      <JsonLd />
    </>
  );
}
