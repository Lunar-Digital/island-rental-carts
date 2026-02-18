"use client";

import { useState } from "react";
import Image from "next/image";
import { WaveDivider } from "@/components/WaveDivider";

const testimonials = [
  {
    quote:
      "ORDERING WAS SUPER EASY, AND THE PICKUP RIGHT AT THE FERRY MADE OUR START STRESS-FREE.",
    name: "Sarah Jenkins",
    title: "Hilton Head Local",
    image: "/images/avatar-sarah.svg",
  },
  {
    quote:
      "THE CART WAS RELIABLE AND ZIPPY. MADE OUR DAY EXPLORING THE ISLAND ABSOLUTELY PERFECT.",
    name: "Michael Ross",
    title: "Vacationer",
    image: "/images/avatar-michael.svg",
  },
  {
    quote:
      "CLEAR INSTRUCTIONS AND SUPER SIMPLE PROCESS. BEST WAY TO SEE DAUFUSKIE!",
    name: "Emily Chen",
    title: "Day Tripper",
    image: "/images/avatar-emily.svg",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const getIndex = (i: number) =>
    ((i % testimonials.length) + testimonials.length) % testimonials.length;

  const visibleIndices = [
    getIndex(activeIndex - 2),
    getIndex(activeIndex - 1),
    activeIndex,
    getIndex(activeIndex + 1),
    getIndex(activeIndex + 2),
  ];

  return (
    <section
      id="testimonials"
      aria-label="Customer testimonials"
      className="bg-brand-800 py-24 relative overflow-hidden flex flex-col items-center"
    >
      {/* Avatars */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-12 h-24">
        {visibleIndices.map((idx, position) => {
          const isCenter = position === 2;
          const isNeighbor = position === 1 || position === 3;

          let sizeClass = "w-10 h-10 opacity-30 grayscale";
          if (isNeighbor) sizeClass = "w-14 h-14 opacity-60 grayscale-[0.5]";
          if (isCenter)
            sizeClass =
              "w-24 h-24 border-[3px] border-lime shadow-xl z-10 scale-110";

          return (
            <button
              key={`${idx}-${position}`}
              className={`rounded-full overflow-hidden transition-all duration-500 ease-in-out cursor-pointer relative ${sizeClass}`}
              onClick={() => {
                if (position === 1) setActiveIndex(getIndex(activeIndex - 1));
                else if (position === 3)
                  setActiveIndex(getIndex(activeIndex + 1));
              }}
              aria-label={`View testimonial from ${testimonials[idx].name}`}
            >
              <Image
                src={testimonials[idx].image}
                alt={testimonials[idx].name}
                fill
                className="object-cover"
              />
            </button>
          );
        })}
      </div>

      {/* Quote */}
      <div className="max-w-4xl px-6 text-center relative z-10">
        <blockquote className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none mb-8 drop-shadow-sm">
          &ldquo;{testimonials[activeIndex].quote}&rdquo;
        </blockquote>

        <div className="flex flex-col items-center gap-1 mb-8">
          <span className="text-lime font-black uppercase tracking-normal text-lg md:text-xl">
            {testimonials[activeIndex].name}
          </span>
          <span className="text-white/80 font-medium text-sm">
            {testimonials[activeIndex].title}
          </span>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mb-8">
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

      <p className="text-white/20 text-[10px] uppercase tracking-widest font-medium relative z-10 mb-24">
        Testimonials shown are placeholders until verified customer reviews are
        collected.
      </p>

      <WaveDivider colors={["#065f46", "#022c22", "#ffffff"]} />
    </section>
  );
}
