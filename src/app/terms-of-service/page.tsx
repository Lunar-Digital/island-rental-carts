import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Island Rental Carts",
  description: "Terms of Service for Island Rental Carts.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-white min-h-screen pt-10 md:pt-14">
        <section className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-black text-brand-800 uppercase tracking-tighter mb-8">
            Terms of Service
          </h1>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <p>
              Welcome to Island Rental Carts. By accessing our website or using
              our services, you agree to these Terms of Service.
            </p>

            <section aria-labelledby="acceptance-of-terms">
              <h2
                id="acceptance-of-terms"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Acceptance of Terms
              </h2>
              <p>
                By making a reservation or renting a golf cart from Island
                Rental Carts, you agree to be bound by these Terms of Service
                and our separate Rental Agreement, which contains additional
                terms and conditions.
              </p>
            </section>

            <section aria-labelledby="eligibility">
              <h2
                id="eligibility"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Eligibility
              </h2>
              <p>
                You must be at least 16 years old and possess a valid driver&apos;s
                license to rent or operate our golf carts. By making a
                reservation, you represent that you meet these requirements.
              </p>
            </section>

            <section aria-labelledby="reservations-and-bookings">
              <h2
                id="reservations-and-bookings"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Reservations and Bookings
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Reservations can be made through our website, phone, or in
                  person
                </li>
                <li>A valid credit card is required to secure your reservation</li>
                <li>Reservation availability is subject to cart availability</li>
                <li>We reserve the right to refuse service to anyone</li>
              </ul>
            </section>

            <section aria-labelledby="rental-agreement">
              <h2
                id="rental-agreement"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Rental Agreement
              </h2>
              <p>
                At the time of rental, you will be required to sign our Rental
                Agreement, which includes:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Operational and safety requirements</li>
                <li>Damage and liability provisions</li>
                <li>
                  Fee schedules for late returns, lost keys, and damages
                </li>
                <li>Release of liability and assumption of risk</li>
                <li>Insurance requirements</li>
              </ul>
              <p className="mt-2">
                The Rental Agreement is incorporated into and forms part of
                these Terms of Service.
              </p>
            </section>

            <section aria-labelledby="payment-terms">
              <h2
                id="payment-terms"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Payment Terms
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Full payment is due at the time of rental unless otherwise
                  arranged
                </li>
                <li>We accept various major payment methods</li>
                <li>
                  Your credit card will be charged for rental fees, applicable
                  taxes, and any additional charges incurred under the Rental
                  Agreement
                </li>
                <li>All fees are in U.S. dollars</li>
              </ul>
            </section>

            <section aria-labelledby="cancellation-and-refund">
              <h2
                id="cancellation-and-refund"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Cancellation and Refund Policy
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Cancellations made twenty-four hours before rental: Full
                  refund
                </li>
                <li>
                  Cancellations made less than twenty-four hours before rental:
                  75% refund or credit
                </li>
                <li>No-shows: No refund</li>
              </ul>
            </section>

            <section aria-labelledby="use-of-website">
              <h2
                id="use-of-website"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Use of Website
              </h2>
              <p>You agree to:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Provide accurate and complete information</li>
                <li>Not use the website for any unlawful purpose</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Not transmit viruses or malicious code</li>
              </ul>
            </section>

            <section aria-labelledby="intellectual-property">
              <h2
                id="intellectual-property"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Intellectual Property
              </h2>
              <p>
                All content on this website, including text, graphics, logos,
                and images, is the property of Island Rental Carts and protected
                by copyright and trademark laws.
              </p>
            </section>

            <section aria-labelledby="limitation-of-liability">
              <h2
                id="limitation-of-liability"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Limitation of Liability
              </h2>
              <p>To the fullest extent permitted by law:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>
                  We make no warranties about the website&apos;s availability,
                  accuracy, or functionality
                </li>
                <li>
                  We are not liable for any indirect, incidental, or
                  consequential damages arising from your use of our website or
                  services
                </li>
                <li>
                  Our total liability shall not exceed the amount you paid for
                  your rental
                </li>
              </ul>
            </section>

            <section aria-labelledby="indemnification">
              <h2
                id="indemnification"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Indemnification
              </h2>
              <p>
                You agree to indemnify and hold Island Rental Carts harmless
                from any claims, damages, or expenses arising from your use of
                our services or violation of these Terms.
              </p>
            </section>

            <section aria-labelledby="dispute-resolution">
              <h2
                id="dispute-resolution"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Dispute Resolution
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Governing Law: These Terms shall be governed by the laws of South Carolina</li>
                <li>Any disputes shall be resolved in the courts of South Carolina</li>
              </ul>
            </section>

            <section aria-labelledby="modifications">
              <h2
                id="modifications"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Modifications
              </h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes
                will be effective immediately upon posting to our website. Your
                continued use of our services constitutes acceptance of modified
                Terms.
              </p>
            </section>

            <section aria-labelledby="severability">
              <h2
                id="severability"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Severability
              </h2>
              <p>
                If any provision of these Terms is found to be unenforceable,
                the remaining provisions shall remain in full effect.
              </p>
            </section>

            <section aria-labelledby="contact-information">
              <h2
                id="contact-information"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Contact Information
              </h2>
              <p>
                For questions about our Terms of Service, contact us through
                this website or at:
              </p>
              <p className="mt-2">
                <span className="block font-semibold">Island Rental Carts</span>
                <span className="block">(843) 368-1345</span>
              </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

