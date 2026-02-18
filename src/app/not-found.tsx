import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-950 flex flex-col items-center justify-center px-6 text-center">
      <div className="relative w-16 h-16 bg-lime rounded-xl flex items-center justify-center transform -skew-x-12 shadow-lg shadow-lime/20 mb-8">
        <span className="font-black text-brand-950 text-2xl skew-x-12">
          IRC
        </span>
      </div>

      <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
        Page Not Found
      </h1>

      <p className="text-gray-400 font-bold text-lg mb-10 max-w-md leading-relaxed">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
        have been moved or no longer exists.
      </p>

      <Button
        asChild
        className="bg-lime text-brand-950 px-10 py-4 rounded-full font-black text-lg hover:brightness-90 hover:scale-105 transition-all uppercase tracking-wide shadow-[0_0_20px_rgba(163,230,53,0.3)] h-auto hover:bg-lime focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950"
      >
        <Link href="/">Back to Homepage</Link>
      </Button>
    </div>
  );
}
