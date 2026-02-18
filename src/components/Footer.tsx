import { Phone, Mail, MapPin } from "lucide-react";
import {
  PHONE,
  PHONE_HREF,
  EMAIL,
  EMAIL_HREF,
  ADDRESS_STREET,
  ADDRESS_CITY,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-brand-950 text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          {/* Brand */}
          <div className="max-w-sm">
            <span className="font-black text-3xl uppercase tracking-tighter mb-6 block">
              Island Rental
              <br />
              <span className="text-lime">Carts</span>
            </span>
            <p className="text-gray-400 font-medium leading-relaxed mb-8">
              Locally owned and operated. Providing reliable 4-seater electric
              golf cart rentals for your Daufuskie Island adventure.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12">
            {/* Explore Nav */}
            <div>
              <h4 className="text-lime font-black uppercase tracking-widest text-sm mb-6">
                Explore
              </h4>
              <nav aria-label="Footer navigation">
                <ul className="space-y-4 font-bold text-gray-300">
                  <li>
                    <a
                      href="#rentals"
                      className="hover:text-lime transition-colors focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 rounded-sm"
                    >
                      Rentals
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pickup"
                      className="hover:text-lime transition-colors focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 rounded-sm"
                    >
                      Location
                    </a>
                  </li>
                  <li>
                    <a
                      href="#faq"
                      className="hover:text-lime transition-colors focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 rounded-sm"
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="hover:text-lime transition-colors focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 rounded-sm"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Contact */}
            <div id="contact">
              <h4 className="text-lime font-black uppercase tracking-widest text-sm mb-6">
                Contact
              </h4>
              <address className="not-italic space-y-4 font-bold text-gray-300">
                <p className="flex items-center gap-3">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a
                    href={PHONE_HREF}
                    className="hover:text-lime transition-colors focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 rounded-sm"
                  >
                    {PHONE}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a
                    href={EMAIL_HREF}
                    className="hover:text-lime transition-colors focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 rounded-sm"
                  >
                    {EMAIL}
                  </a>
                </p>
                <p className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                  <span>
                    {ADDRESS_STREET}
                    <br />
                    {ADDRESS_CITY}
                  </span>
                </p>
              </address>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-medium">
          <p>&copy; 2026 Island Rental Carts. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 rounded-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-brand-950 rounded-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
