"use client";

import { useState, type FormEvent } from "react";
import { Mail, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WaveDivider } from "@/components/WaveDivider";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "error" | "submitting" | "success"
  >("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Newsletter signup:", email);

    setStatus("success");
    setEmail("");
  };

  return (
    <section
      id="newsletter"
      aria-label="Newsletter signup for island updates"
      className="bg-brand-800 pt-24 pb-48 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-lg">
          Get Island Updates
        </h2>
        <p className="text-lime-100 font-bold text-lg mb-10 max-w-lg mx-auto leading-relaxed opacity-90">
          Sign up for news, special offers, and seasonal discounts for your next
          Daufuskie Island trip.
        </p>

        <form
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          onSubmit={handleSubmit}
          noValidate
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            disabled={status === "submitting"}
            className="flex-grow bg-white/10 text-white px-6 py-4 rounded-full font-bold placeholder-lime-200/50 focus:outline-none focus:ring-4 focus:ring-lime/50 shadow-inner border border-white/20 backdrop-blur-sm h-auto"
          />
          <Button
            type="submit"
            disabled={status === "submitting"}
            className="bg-lime text-brand-800 px-8 py-4 rounded-full font-black uppercase tracking-wide hover:bg-lime-300 hover:scale-105 transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)] h-auto focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-brand-800"
          >
            {status === "submitting" ? (
              <>
                Subscribing...
                <Loader2 className="w-5 h-5 animate-spin" />
              </>
            ) : (
              <>
                Subscribe <Mail className="w-5 h-5 stroke-[2.5]" />
              </>
            )}
          </Button>
        </form>

        {status === "error" && (
          <p className="text-red-400 text-sm font-bold mt-3">
            Please enter a valid email address.
          </p>
        )}

        {status === "success" && (
          <p className="text-lime text-sm font-bold mt-3">
            Thanks for subscribing! We&apos;ll keep you posted on Daufuskie
            Island deals.
          </p>
        )}
      </div>

      <WaveDivider colors={["#065f46", "#042f2e", "#022c22"]} />
    </section>
  );
}
