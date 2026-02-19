"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PEEK_URL } from "@/lib/constants";

const navLinks = [
  { name: "Rentals", href: "#rentals" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pickup", href: "#pickup" },
  { name: "FAQ", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-brand-950 text-white border-b border-white/5 backdrop-blur-md bg-opacity-95 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <a
        href="#rentals"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-lime focus:text-brand-950 focus:px-4 focus:py-2 focus:rounded-md focus:font-bold"
      >
        Skip to main content
      </a>

      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between"
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-12 h-12 bg-lime rounded-xl flex items-center justify-center transform -skew-x-12 group-hover:skew-x-0 transition-transform shadow-lg shadow-lime/20"
          >
            <span className="font-black text-brand-950 text-xl skew-x-12 group-hover:skew-x-0 transition-transform">
              IRC
            </span>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-black text-2xl tracking-tighter uppercase leading-none hidden sm:block"
          >
            Island Rental
            <br />
            <span className="text-lime">Carts</span>
          </motion.span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-bold hover:text-lime transition-colors uppercase tracking-widest focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 rounded-sm"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Button
            asChild
            className="bg-lime text-brand-950 px-8 py-3 rounded-full font-black text-sm hover:bg-white hover:scale-105 transition-all uppercase tracking-wide shadow-lg shadow-lime/20 focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950"
          >
            <a href={PEEK_URL} target="_blank" rel="noopener noreferrer">
              Book Now
            </a>
          </Button>
        </div>

        {/* Mobile: Book Now + Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Button
            asChild
            size="sm"
            className="bg-lime text-brand-950 rounded-full font-black text-xs uppercase tracking-wide shadow-lg shadow-lime/20 focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 hover:bg-white hover:scale-105 transition-all"
          >
            <a href={PEEK_URL} target="_blank" rel="noopener noreferrer">
              Book Now
            </a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="text-white w-10 h-10 flex items-center justify-center border border-white/20 rounded-lg focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-brand-950 border-brand-700 text-white w-80 [&>button]:text-white [&>button]:hover:text-lime"
            >
              <nav
                className="flex flex-col gap-6 mt-12 px-2"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-3xl font-black uppercase tracking-tight hover:text-lime transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <Button
                  asChild
                  className="bg-lime text-brand-950 rounded-full font-black text-xl uppercase tracking-wide text-center py-6 mt-4 hover:bg-white transition-all h-auto"
                >
                  <a href={PEEK_URL} target="_blank" rel="noopener noreferrer">
                    Book Now
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
