import Image from "next/image";
import { Check, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

const features = [
  "Comfortable seating for 4",
  "Quiet electric ride",
  "Easy island cruising",
  "Ready on arrival",
  "Well-maintained and reliable",
];

export function CartFeatures() {
  return (
    <section
      id="rentals"
      aria-label="Golf cart rental features and details"
      className="pt-24 pb-12 bg-white relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        <AnimateOnScroll>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-lime-50 -skew-x-12 translate-x-32 z-0 hidden lg:block" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-sm border-[3px] border-white ring-1 ring-gray-100 relative">
                  <Image
                    src="/images/4-seater-electric-golf-cart-daufuskie-island-rental.png"
                    alt="Green E-Z-GO 4-seater electric golf cart available for daily rental on Daufuskie Island, South Carolina"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Features */}
              <div className="w-full lg:w-1/2">
                <Badge className="bg-brand-800 text-lime hover:bg-brand-800 font-black tracking-widest uppercase text-xs px-3 py-1.5 rounded-md mb-6">
                  Cart Details
                </Badge>

                <h2 className="text-4xl md:text-5xl font-black text-brand-800 uppercase tracking-tighter mb-8 leading-none">
                  4-Seater Electric Carts
                </h2>

                <ul className="space-y-4 mb-8">
                  {features.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-lime-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-brand-800 stroke-[3]" />
                      </div>
                      <span className="text-lg font-bold text-gray-700">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wide border-t border-gray-100 pt-6">
                  <Info className="w-4 h-4 text-lime-500" />
                  Booking &amp; payment are completed securely on Peek.
                </p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
