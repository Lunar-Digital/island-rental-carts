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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CartFeatures />
        <PricingSection />
        <Testimonials />
        <HowItWorks />
        <WhyChooseUs />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
      <BackToTop />
      <JsonLd />
    </>
  );
}
