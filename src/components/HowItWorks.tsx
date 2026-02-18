import { CalendarCheck, MapPin, Palmtree } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WaveDivider } from "@/components/WaveDivider";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { PEEK_URL } from "@/lib/constants";

const steps = [
  {
    num: 1,
    icon: CalendarCheck,
    title: "Book Online",
    desc: "Select your dates and secure your Daufuskie Island golf cart in minutes. We recommend booking early during peak season (May\u2013September).",
  },
  {
    num: 2,
    icon: MapPin,
    title: "Pickup at Ferry",
    desc: "Your cart is ready and waiting when you arrive at the Daufuskie Island ferry dock. No hassle \u2014 just grab the keys and go.",
  },
  {
    num: 3,
    icon: Palmtree,
    title: "Explore the Island",
    desc: "Cruise the sandy roads, visit Haig Point Lighthouse, Bloody Point Beach, and the First Union African Baptist Church. Enjoy the island breeze in comfort.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-label="How to rent a golf cart on Daufuskie Island"
      className="pt-32 pb-48 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-lime-100 rounded-full filter blur-[120px] transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-lime-100 rounded-full filter blur-[120px] transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimateOnScroll>
          <div className="text-center mb-20">
            <Badge
              variant="outline"
              className="text-brand-800 font-black tracking-widest uppercase text-xs border-brand-800/30 px-3 py-1.5 rounded-full mb-6"
            >
              Simple Process
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-brand-800">
              How It <span className="text-lime-600">Works</span>
            </h2>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            {steps.map((step, idx) => (
              <div key={step.num} className="relative group">
                {idx !== steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-lime-200 to-transparent z-0" />
                )}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-[2rem] bg-lime flex items-center justify-center mb-10 shadow-[0_0_30px_rgba(163,230,53,0.3)] transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <step.icon className="w-10 h-10 text-brand-800" />
                  </div>
                  <h3 className="text-3xl font-black uppercase mb-4 tracking-tight text-brand-800">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 font-bold leading-relaxed max-w-xs text-lg">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="text-center">
            <Button
              asChild
              className="bg-brand-800 text-lime px-12 py-5 rounded-full font-black text-lg hover:bg-brand-900 hover:scale-105 transition-all uppercase tracking-wide shadow-xl shadow-brand-800/20 h-auto focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2"
            >
              <a href={PEEK_URL} target="_blank" rel="noopener noreferrer">
                Book Now
              </a>
            </Button>
          </div>
        </AnimateOnScroll>
      </div>

      <WaveDivider colors={["#065f46", "#042f2e", "#064e3b"]} />
    </section>
  );
}
