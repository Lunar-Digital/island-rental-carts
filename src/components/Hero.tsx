import Image from "next/image";
import { ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WaveDivider } from "@/components/WaveDivider";
import { PEEK_URL } from "@/lib/constants";

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Daufuskie Island golf cart rentals hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-brand-950"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/island-golf-cart.png"
          alt="Electric golf cart on a sandy road on Daufuskie Island, South Carolina"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-brand-950" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-40 lg:pt-48 pb-48 lg:pb-64">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase leading-[0.8] tracking-tighter mb-8 drop-shadow-2xl">
            Daufuskie Island <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime to-lime-200">
              Golf Cart Rentals
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-100 font-bold mb-12 max-w-xl leading-snug drop-shadow-md">
            The best choice for{" "}
            <span className="text-lime-300">
              DAUFUSKIE ISLAND golf cart rentals
            </span>
            . Free delivery island wide, grab and go!
          </p>

          <div className="flex flex-col items-start gap-6">
            <Button
              asChild
              className="bg-[#9ae600] text-brand-800 px-10! py-5 rounded-full font-black text-xl hover:bg-lime-300 hover:scale-105 transition-all flex items-center justify-center gap-3 uppercase tracking-wider shadow-[0_0_40px_rgba(163,230,53,0.4)] h-auto focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950"
            >
              <a href={PEEK_URL} target="_blank" rel="noopener noreferrer">
                Book Now <ArrowRight className="w-6 h-6 stroke-[3]" />
              </a>
            </Button>

            <p className="flex items-center gap-2 text-lime/90 text-sm font-bold uppercase tracking-wide pl-2">
              <Lock className="w-4 h-4" />
              Secure checkout on Peek · Takes ~2 minutes
            </p>
          </div>
        </div>
      </div>

      <WaveDivider
        colors={["#065f46", "#022c22", "#ffffff"]}
        className="h-[40vh]"
      />
    </section>
  );
}
