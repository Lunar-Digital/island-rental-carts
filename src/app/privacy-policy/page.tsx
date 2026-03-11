import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Island Rental Carts",
  description: "Privacy Policy for Island Rental Carts.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-white min-h-screen pt-10 md:pt-14">
        <section className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-black text-brand-800 uppercase tracking-tighter mb-8">
            Privacy Policy
          </h1>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <p>
              Island Rental Carts (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, and safeguard your
              personal information.
            </p>

            <section aria-labelledby="information-we-collect">
              <h2
                id="information-we-collect"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Information We Collect
              </h2>
              <p>We collect the following types of information:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>
                  <span className="font-semibold">
                    Personal Identification Information:
                  </span>{" "}
                  Name, driver&apos;s license number, date of birth, phone
                  number, email address, and physical address
                </li>
                <li>
                  <span className="font-semibold">Payment Information:</span>{" "}
                  Credit card details and billing information
                </li>
                <li>
                  <span className="font-semibold">Rental Information:</span>{" "}
                  Rental dates, cart selection, pickup and return locations
                </li>
                <li>
                  <span className="font-semibold">Website Usage Data:</span> IP
                  address, browser type, pages visited, and time spent on our
                  site (if you use cookies/analytics)
                </li>
              </ul>
            </section>

            <section aria-labelledby="how-we-use-your-information">
              <h2
                id="how-we-use-your-information"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                How We Use Your Information
              </h2>
              <p>We use your information to:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Process and fulfill your golf cart rental reservations</li>
                <li>Verify your identity and driver&apos;s license eligibility</li>
                <li>
                  Process payments and charge fees as outlined in our rental
                  agreement
                </li>
                <li>
                  Communicate with you about your reservation, including
                  confirmations and reminders
                </li>
                <li>Send receipts and invoices</li>
                <li>Comply with legal obligations</li>
                <li>Improve our services and website functionality</li>
              </ul>
            </section>

            <section aria-labelledby="how-we-share-your-information">
              <h2
                id="how-we-share-your-information"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                How We Share Your Information
              </h2>
              <p>
                We do not sell your personal information. We may share your
                information with:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Payment processors to complete transactions</li>
                <li>
                  Law enforcement or government agencies when required by law
                </li>
                <li>
                  Insurance providers in the event of accidents or damage claims
                </li>
                <li>
                  Service providers who assist us in operating our business
                  (under confidentiality agreements)
                </li>
              </ul>
            </section>

            <section aria-labelledby="data-security">
              <h2
                id="data-security"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Data Security
              </h2>
              <p>
                We implement reasonable security measures to protect your
                personal information from unauthorized access, disclosure, or
                destruction. However, no method of transmission over the
                internet is 100% secure.
              </p>
            </section>

            <section aria-labelledby="data-retention">
              <h2
                id="data-retention"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Data Retention
              </h2>
              <p>
                We retain your personal information for as long as necessary to
                fulfill the purposes outlined in this policy, comply with legal
                obligations, resolve disputes, and enforce our agreements.
              </p>
            </section>

            <section aria-labelledby="your-rights">
              <h2
                id="your-rights"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Your Rights
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>
                  Request deletion of your information (subject to legal
                  retention requirements)
                </li>
                <li>Opt out of marketing communications</li>
              </ul>
              <p className="mt-2">
                To exercise these rights, contact us using the details below.
              </p>
            </section>

            <section aria-labelledby="cookies-and-tracking">
              <h2
                id="cookies-and-tracking"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Cookies and Tracking
              </h2>
              <p>
                Our website may use cookies and similar tracking technologies to
                enhance user experience and analyze site traffic. You can
                control cookie preferences through your browser settings.
              </p>
            </section>

            <section aria-labelledby="third-party-links">
              <h2
                id="third-party-links"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices of these sites.
              </p>
            </section>

            <section aria-labelledby="childrens-privacy">
              <h2
                id="childrens-privacy"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Children&apos;s Privacy
              </h2>
              <p>
                Our services are not directed to individuals under 16 years of
                age. We do not knowingly collect personal information from
                children under 16.
              </p>
            </section>

            <section aria-labelledby="changes-to-this-policy">
              <h2
                id="changes-to-this-policy"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Changes to This Policy
              </h2>
              <p>We may update this Privacy Policy from time to time.</p>
            </section>

            <section aria-labelledby="contact-us">
              <h2
                id="contact-us"
                className="text-2xl font-bold text-brand-800 mb-3"
              >
                Contact Us
              </h2>
              <p>
                For questions about this Privacy Policy, contact us through this
                website or at:
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

