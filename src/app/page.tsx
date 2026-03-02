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
    featureBullets?: string[];
    cartFeaturesSectionTitle?: string | null;
    cartFeaturesBadge?: string | null;
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
    howItWorksSteps?: { title: string; description: string }[];
    howItWorksSectionTitle?: string | null;
    howItWorksBadge?: string | null;
    benefits?: string[];
    whyChooseUsSectionTitle?: string | null;
    whyChooseUsIntro?: string | null;
    whyChooseUsBadge?: string | null;
    faq?: { question: string; answer: string }[];
    newsletterHeading?: string | null;
    newsletterSubtext?: string | null;
  }>({ query: HOMEPAGE_QUERY, revalidate: 60 });

  return (
    <>
      <Header />
      <main>
        <Hero />
        <CartFeatures
          featureBullets={homepage?.featureBullets}
          sectionTitle={homepage?.cartFeaturesSectionTitle ?? undefined}
          badge={homepage?.cartFeaturesBadge ?? undefined}
        />
        <PricingSection
          pricingTable={homepage?.pricingTable}
          pricingCards={homepage?.pricingCards}
        />
        <Testimonials testimonials={homepage?.testimonials} />
        <HowItWorks
          steps={homepage?.howItWorksSteps}
          sectionTitle={homepage?.howItWorksSectionTitle ?? undefined}
          badge={homepage?.howItWorksBadge ?? undefined}
        />
        <WhyChooseUs
          benefits={homepage?.benefits}
          sectionTitle={homepage?.whyChooseUsSectionTitle ?? undefined}
          intro={homepage?.whyChooseUsIntro ?? undefined}
          badge={homepage?.whyChooseUsBadge ?? undefined}
        />
        <FAQ faq={homepage?.faq} />
        <Newsletter
          heading={homepage?.newsletterHeading ?? undefined}
          subtext={homepage?.newsletterSubtext ?? undefined}
        />
      </main>
      <Footer />
      <BackToTop />
      <JsonLd />
    </>
  );
}
