"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WaveDivider } from "@/components/WaveDivider";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { DEFAULT_FAQS, type FAQItem } from "@/content/faq";

type FAQProps = {
  faq?: FAQItem[] | null;
};

export function FAQ({ faq: fromSanity }: FAQProps = {}) {
  const faqs = fromSanity?.length ? fromSanity : DEFAULT_FAQS;
  return (
    <section
      id="faq"
      aria-label="Frequently asked questions about Daufuskie Island golf cart rentals"
      className="pt-32 pb-48 bg-white relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <AnimateOnScroll>
          <div className="text-center mb-20">
            <span className="text-brand-800 font-black tracking-widest uppercase text-xs bg-brand-800/5 px-3 py-1.5 rounded-md mb-6 inline-block backdrop-blur-sm border border-brand-800/10">
              Common Questions About Daufuskie Island Golf Cart Rentals
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-brand-800 uppercase tracking-tighter leading-none">
              Have Questions?
            </h2>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="space-y-4"
          >
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 data-[state=open]:border-lime-500 data-[state=open]:shadow-[0_4px_20px_rgba(163,230,53,0.15)] data-[state=open]:ring-1 data-[state=open]:ring-lime-500 px-6 md:px-8"
              >
                <AccordionTrigger className="text-xl md:text-2xl font-black uppercase tracking-tight text-gray-800 hover:text-brand-800 py-6 md:py-8 data-[state=open]:text-brand-800 focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 font-bold leading-relaxed text-lg pb-8 border-t border-gray-100 pt-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimateOnScroll>
      </div>

      <WaveDivider colors={["#f3f4f6", "#e5e7eb", "#064e3b"]} />
    </section>
  );
}
