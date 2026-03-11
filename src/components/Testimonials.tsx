"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { WaveDivider } from "@/components/WaveDivider";

const DEFAULT_TESTIMONIALS = [
  {
    quote:
      "ORDERING WAS SUPER EASY, AND THE PICKUP RIGHT AT THE FERRY MADE OUR START STRESS-FREE.",
    name: "Sarah Jenkins",
    title: "Hilton Head Local",
  },
  {
    quote:
      "THE CART WAS RELIABLE AND ZIPPY. MADE OUR DAY EXPLORING THE ISLAND ABSOLUTELY PERFECT.",
    name: "Michael Ross",
    title: "Vacationer",
  },
  {
    quote:
      "CLEAR INSTRUCTIONS AND SUPER SIMPLE PROCESS. BEST WAY TO SEE DAUFUSKIE!",
    name: "Emily Chen",
    title: "Day Tripper",
  },
];

type Testimonial = { quote: string; name: string; title?: string; rating?: number; source?: string };

const DEFAULT_TESTIMONIALS_TYPED: Testimonial[] = DEFAULT_TESTIMONIALS;

type TestimonialsProps = {
  testimonials?: Testimonial[] | null;
};

export function Testimonials({ testimonials: fromSanity }: TestimonialsProps = {}) {
  const testimonials =
    fromSanity?.length ? fromSanity : DEFAULT_TESTIMONIALS_TYPED;
  const [activeIndex, setActiveIndex] = useState(0);
  const current = testimonials[activeIndex];

  if (!current) return null;

  return (
    <section
      id="testimonials"
      aria-label="Customer testimonials"
      className="bg-brand-800 py-24 relative overflow-hidden flex flex-col items-center"
    >
      {/* Quote */}
      <div className="max-w-4xl px-6 text-center relative z-10 pt-12">
        <blockquote className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none mb-8 drop-shadow-sm">
          &ldquo;{current.quote}&rdquo;
        </blockquote>

        <div className="flex flex-col items-center gap-1 mb-8">
          {(current.rating != null || current.source) && (
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-0.5" aria-label={`${current.rating ?? 5} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    className={`w-5 h-5 ${n <= (current.rating ?? 5) ? "fill-lime text-lime" : "text-white/30"}`}
                    aria-hidden
                  />
                ))}
              </div>
              {current.source && (
                <span className="text-white/70 text-sm font-medium">
                  {current.source} Review
                </span>
              )}
            </div>
          )}
          <span className="text-lime font-black uppercase tracking-normal text-lg md:text-xl">
            {current.name?.trim() || (current.source === "Google" ? "Google reviewer" : "Customer")}
          </span>
          {current.title && (
            <span className="text-white/80 font-medium text-sm">
              {current.title}
            </span>
          )}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mb-24">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              activeIndex === i ? "bg-lime" : "bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>

      <WaveDivider colors={["#065f46", "#022c22", "#ffffff"]} />
    </section>
  );
}
