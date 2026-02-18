import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WaveDivider } from "@/components/WaveDivider";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { PEEK_URL } from "@/lib/constants";

const benefits = [
  "Locally owned & operated business",
  "Reliable, newer 4-seater electric carts",
  "Competitive daily & weekly rates with free island-wide delivery",
];

export function WhyChooseUs() {
  return (
    <section
      id="pickup"
      aria-label="Why choose Island Rental Carts"
      className="pt-24 pb-48 bg-brand-800 overflow-hidden relative"
    >
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimateOnScroll>
          <div className="flex flex-col lg:flex-row items-center gap-20">
            {/* Image */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute top-6 left-6 w-full h-full border-4 border-lime/30 rounded-[3rem] z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/3] transform transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2 border-4 border-brand-700">
                <Image
                  src="/images/about.svg"
                  alt="Island Rental Carts golf cart parked on a tree-lined Daufuskie Island road"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-800/60 to-transparent opacity-60" />
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2">
              <Badge className="bg-lime text-brand-800 hover:bg-lime font-black tracking-widest uppercase text-xs px-3 py-1.5 rounded-md mb-4">
                Island Rental Carts Experience
              </Badge>
              <p className="text-lime font-black tracking-widest uppercase text-xs mb-6">
                Why Choose Us
              </p>

              <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.9]">
                Your Trusted Island <br />
                Transportation
              </h2>

              <p className="text-lime-100/80 text-lg mb-12 leading-relaxed font-bold">
                We are dedicated to making your Daufuskie Island experience
                seamless and memorable. Our electric golf carts are
                well-maintained, reliable, and ready for your adventure the
                moment you step off the ferry.
              </p>

              <ul className="space-y-6">
                {benefits.map((item) => (
                  <li key={item} className="flex items-center gap-5 group/item">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-lime/20 flex items-center justify-center group-hover/item:bg-lime transition-colors duration-300 border border-lime/30">
                      <CheckCircle className="w-6 h-6 text-lime group-hover/item:text-brand-800" />
                    </div>
                    <span className="text-xl text-white font-black uppercase tracking-tight">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-14">
                <Button
                  asChild
                  className="bg-lime text-brand-800 px-10 py-4 rounded-full font-black text-lg hover:brightness-90 hover:scale-105 transition-all uppercase tracking-wide shadow-[0_0_20px_rgba(163,230,53,0.3)] h-auto hover:bg-lime focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-brand-800"
                >
                  <a
                    href={PEEK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      <WaveDivider colors={["#065f46", "#022c22", "#ffffff"]} />
    </section>
  );
}
