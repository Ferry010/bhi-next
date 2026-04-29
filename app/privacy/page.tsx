import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Brand Humanizing Institute handles your personal data.",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-secondary min-h-screen">
        <div className="container max-w-3xl pt-28 md:pt-40 pb-20 md:pb-32">
          <Breadcrumb items={[{ label: "Privacy Policy" }]} />
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-6 mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm mb-12">Last updated: April 2026</p>

          <div className="prose prose-neutral max-w-none space-y-10 text-foreground">

            <section>
              <h2 className="font-heading font-bold text-xl mb-3">Who we are</h2>
              <p className="text-muted-foreground leading-relaxed">
                Brand Humanizing Institute is a Dutch company based in Rotterdam, the Netherlands.
                We provide keynotes, training programmes, strategy projects, and research on
                human-centred leadership in the age of AI. Ferry Hoes and Jonathan Flores are the
                founders.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Contact:{" "}
                <a href="mailto:ferry@brandhumanizing.com" className="text-accent hover:underline">
                  ferry@brandhumanizing.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl mb-3">What data we collect and why</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div>
                  <strong className="text-foreground">Contact form</strong> — when you fill in our
                  contact form we collect your name, email address, and any details you choose to
                  share (organization, message). We use this solely to respond to your enquiry.
                  Legal basis: legitimate interest (responding to a business enquiry).
                </div>
                <div>
                  <strong className="text-foreground">Newsletter / research brief</strong> — if you
                  subscribe, we store your email address to send you occasional updates on our
                  thinking and research. Legal basis: consent. You can unsubscribe at any time via
                  the link in every email.
                </div>
                <div>
                  <strong className="text-foreground">Book waitlist (English edition)</strong> — we
                  store your email address to notify you when the English edition of{" "}
                  <em>Brand Humanizing</em> becomes available. Legal basis: consent.
                </div>
                <div>
                  <strong className="text-foreground">Self-assessment</strong> — your answers are
                  stored anonymously and linked to your email only if you voluntarily provide it.
                  Legal basis: consent.
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl mb-3">Cookies and tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not use tracking cookies, advertising pixels, or third-party analytics. Your
                visit to this website is completely anonymous. Read more on our{" "}
                <a href="/no-cookies" className="text-accent hover:underline">
                  No-Cookies policy page
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl mb-3">How we store your data</h2>
              <p className="text-muted-foreground leading-relaxed">
                Form submissions are stored in Supabase (EU data region). We do not sell, rent, or
                share your personal data with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl mb-3">Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                Contact enquiries are kept for as long as necessary to service the relationship,
                typically no longer than two years after last contact. Newsletter and waitlist
                emails are deleted on unsubscribe. You can also request deletion at any time.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl mb-3">Your rights (GDPR)</h2>
              <p className="text-muted-foreground leading-relaxed">
                Under the GDPR you have the right to: access the data we hold about you, correct
                inaccurate data, request deletion, withdraw consent at any time, and lodge a
                complaint with the Dutch data protection authority (Autoriteit Persoonsgegevens,{" "}
                <a
                  href="https://www.autoriteitpersoonsgegevens.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  autoriteitpersoonsgegevens.nl
                </a>
                ).
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                To exercise any of these rights, email{" "}
                <a href="mailto:ferry@brandhumanizing.com" className="text-accent hover:underline">
                  ferry@brandhumanizing.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl mb-3">Changes to this policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this policy when our practices change. Material changes will be noted
                at the top of this page with a new "Last updated" date.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
