import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WaveDivider } from "@/components/WaveDivider";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { PEEK_URL } from "@/lib/constants";

const pricing = [
  { duration: "1 Day", price: "$65" },
  { duration: "2 Days", price: "$130" },
  { duration: "3 Days", price: "$195" },
  { duration: "4 Days", price: "$260" },
  { duration: "5 Days", price: "$325" },
  { duration: "6 Days", price: "$390" },
  { duration: "1 Week", price: "$400", highlight: true },
];

const cards = [
  {
    title: "Daily Rental",
    price: "$65",
    unit: "Day",
    desc: "Perfect for day trips and quick getaways.",
    badge: "Most Popular",
    pill: "Daily",
  },
  {
    title: "Weekly Special",
    price: "$400",
    unit: "Week",
    desc: "Our most popular option for extended stays.",
    badge: null,
    pill: "Weekly",
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      aria-label="Golf cart rental pricing"
      className="pt-12 pb-0 bg-white relative"
    >
      <div className="max-w-7xl mx-auto px-6 pb-48">
        <AnimateOnScroll>
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge className="bg-brand-800 text-lime hover:bg-brand-800 font-black tracking-widest uppercase text-xs px-3 py-1.5 rounded-md mb-3">
              Best Value on the Island
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black text-brand-800 uppercase tracking-tighter leading-none mb-6">
              Choose Your <span className="text-lime-600">Duration</span>
            </h2>
            <p className="text-gray-500 font-bold text-lg max-w-2xl mx-auto">
              Choose a popular option, or see the full price list below.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Pricing Cards */}
        <AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto">
            {cards.map((item) => (
              <Card
                key={item.title}
                className={`rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col relative py-0 gap-0 ${
                  item.badge
                    ? "ring-4 ring-lime transform md:-translate-y-4 z-10"
                    : "border border-gray-100"
                }`}
              >
                {item.badge && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-brand-800 text-lime px-6 py-1.5 rounded-b-xl z-20 font-black uppercase text-xs tracking-widest shadow-lg flex items-center gap-2">
                    <Star className="w-3 h-3 fill-lime text-lime" />{" "}
                    {item.badge}
                  </div>
                )}

                <div className="h-64 overflow-hidden relative">
                  <Image
                    src="/images/cart.svg"
                    alt={item.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <Badge className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-brand-800 font-black text-sm uppercase tracking-wide shadow-sm hover:bg-white/90 rounded-full px-4 py-2">
                    {item.pill}
                  </Badge>
                </div>

                <CardHeader className="p-8 pb-0">
                  <h3 className="text-3xl font-black text-brand-800 uppercase mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </CardHeader>

                <CardContent className="p-8 pt-4 mt-auto">
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-5xl font-black text-brand-800 tracking-tighter">
                      {item.price}
                    </span>
                    <span className="text-gray-400 font-bold uppercase text-sm">
                      / {item.unit}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="p-8 pt-0">
                  <Button
                    asChild
                    className="w-full py-4 rounded-full font-black text-center uppercase tracking-wide bg-lime text-brand-800 hover:brightness-90 hover:bg-lime shadow-lg hover:shadow-lime/30 hover:scale-[1.02] transition-all h-auto focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2"
                  >
                    <a
                      href={PEEK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book Now
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Price Table */}
        <AnimateOnScroll>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden max-w-4xl mx-auto">
            <div className="bg-brand-800 p-8 text-center relative overflow-hidden">
              <h3 className="relative z-10 text-3xl font-black text-white uppercase tracking-tight mb-2">
                Complete Price List
              </h3>
              <p className="relative z-10 text-lime font-bold tracking-widest text-sm uppercase">
                Standard 4-Seater Carts
              </p>
            </div>

            <div className="p-8 md:p-10">
              <table className="w-full">
                <thead className="sr-only">
                  <tr>
                    <th>Duration</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {pricing.map((tier) => (
                    <tr
                      key={tier.duration}
                      className={`border-b border-gray-100 last:border-0 transition-colors hover:bg-lime-50/30 ${
                        tier.highlight ? "bg-lime-50/50" : ""
                      }`}
                    >
                      <td
                        className={`py-5 px-4 font-bold uppercase tracking-wide text-lg ${
                          tier.highlight ? "text-brand-800" : "text-gray-600"
                        }`}
                      >
                        {tier.duration}
                      </td>
                      <td className="py-5 px-4 text-right">
                        <span
                          className={`font-black text-2xl tracking-tight ${
                            tier.highlight ? "text-brand-800" : "text-gray-900"
                          }`}
                        >
                          {tier.price}
                        </span>
                        {tier.highlight && (
                          <Badge className="ml-3 bg-lime text-brand-800 hover:bg-lime font-black uppercase text-[10px] tracking-widest">
                            Best Value
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-10 text-center border-t border-gray-100 pt-8">
                <Button
                  asChild
                  variant="link"
                  className="text-brand-800 font-black uppercase tracking-wide hover:text-lime-600 transition-colors group focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2"
                >
                  <a
                    href={PEEK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="border-b-2 border-brand-800 group-hover:border-lime-600 pb-0.5">
                      Reserve Your Cart
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      <WaveDivider colors={["#065f46", "#042f2e", "#064e3b"]} />
    </section>
  );
}
