"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WaveDivider } from "@/components/WaveDivider";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

const faqs = [
  {
    question: "How do I book a cart?",
    answer:
      'Booking is easy! Simply click the "Book Now" button on our website to view real-time availability and secure your reservation online via Peek. The entire process takes about 2 minutes. We recommend booking at least 2\u20133 weeks in advance during peak season (May through September), as carts sell out quickly.',
  },
  {
    question: "Where do I pick up the cart?",
    answer:
      "We deliver your golf cart directly to the Daufuskie Island ferry dock so it\u2019s ready and waiting when you arrive. Whether you come in at Melrose Landing or the County Dock, just look for your reserved cart, grab the keys, and go. We also offer free delivery to any rental property on the island for overnight and weekly rentals.",
  },
  {
    question: "What are your rental rates?",
    answer:
      "Our standard 4-seater electric golf cart is $65 per day. Multi-day rentals are calculated at the daily rate, and our weekly special is $400 for a full week \u2014 saving you $55 compared to seven individual days. Check the pricing table above for the full breakdown.",
  },
  {
    question: "Do you have 6-seater carts?",
    answer:
      "We currently specialize in 4-seater electric golf carts, which are the most popular option on Daufuskie Island and perfect for couples, small families, and groups of up to four. If you need to accommodate a larger group, we recommend renting two carts so everyone can explore comfortably. Contact us and we\u2019ll help coordinate.",
  },
  {
    question: "Do I need a golf cart on Daufuskie Island?",
    answer:
      "Yes \u2014 golf carts are the primary mode of transportation on Daufuskie Island. There are no cars, no rideshares, and no public transit. The island is about 8 square miles with sandy roads connecting beaches, historic landmarks, restaurants, and rental properties. A golf cart is essential for getting around, whether you\u2019re visiting for the day or staying for the week.",
  },
  {
    question: "What are the golf cart rules on Daufuskie Island?",
    answer:
      "You must be at least 18 years old with a valid driver\u2019s license to operate a golf cart on Daufuskie Island. All South Carolina traffic laws apply, including speed limits and DUI laws. Headlights are required after dark \u2014 all our carts come equipped with them. Seatbelts should be worn when available, and children should be seated securely at all times.",
  },
  {
    question: "How do I get to Daufuskie Island?",
    answer:
      "Daufuskie Island is only accessible by boat \u2014 there are no bridges to the mainland. Most visitors take a ferry from Hilton Head Island (about 30\u201345 minutes) or a water taxi from Bluffton or Savannah. Popular ferry services include Lowcountry Ferry, Island Head, and May River Excursions. Book your ferry first, then reserve your golf cart so it\u2019s waiting when you arrive.",
  },
  {
    question: "What if it rains during my rental?",
    answer:
      "Our golf carts come with a canopy top that provides cover from light rain and sun. Daufuskie Island weather can change quickly, especially in summer \u2014 brief afternoon showers are common but usually pass within 30 minutes. Rentals are not cancelled or refunded due to weather, but if severe weather is expected, contact us and we\u2019ll work with you on rescheduling.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      aria-label="Frequently asked questions about Daufuskie Island golf cart rentals"
      className="pt-32 pb-48 bg-white relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <AnimateOnScroll>
          <div className="text-center mb-20">
            <span className="text-brand-800 font-black tracking-widest uppercase text-xs bg-brand-800/5 px-3 py-1.5 rounded-md mb-6 inline-block border border-brand-800/10">
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
                <AccordionTrigger className="text-xl md:text-2xl font-black uppercase tracking-tight text-gray-800 hover:text-brand-800 py-6 md:py-8 [&[data-state=open]]:text-brand-800 focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2">
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
