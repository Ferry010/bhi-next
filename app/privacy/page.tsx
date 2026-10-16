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
          <p className="text-muted-foreground text-sm mb-12">Last updated: September 2026</p>

          <div className="prose prose-neutral max-w-none space-y-10 text-foreground">

            <section>
              <h2 className="font-heading font-bold text-xl mb-3">Who we are</h2>
              <p className="text-muted-foreground leading-relaxed">
                Brand Humanizing Institute is a Dutch company based in Rotterdam, the Netherlands.
                We provide keynotes, training programmes, team days, strategy projects, and research
                on human-centred leadership in the age of AI. Ferry Hoes and Jonathan Flores are the
                founders. Chamber of Commerce (KvK): 67341950. VAT (BTW): NL001559743B32.
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
                  <strong className="text-foreground">Team-day / event booking</strong> — when you
                  request a quote or booking (for example for a vibecoding team day) we collect your
                  name, email, and the details you share (company, group size, preferred location and
                  timing, message). We use this to respond and to arrange and deliver the booking.
                  Legal basis: taking steps to enter into and perform a contract.
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
                  <strong className="text-foreground">Booking a call</strong> — when you pick a time in
                  our Calendly calendar, we receive your name, email address and anything you write in
                  the booking notes, so we can prepare and meet you. Legal basis: taking steps at your
                  request before a possible agreement.
                </div>
                <div>
                  <strong className="text-foreground">Find your level</strong> — your answers stay in
                  your own browser. We don&apos;t store them and we don&apos;t ask for your email.
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl mb-3">Cookies and tracking</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  We do not use tracking cookies, advertising pixels, or third-party analytics.
                  Browsing this website is anonymous. We only learn who you are when you reach out:
                  by sending a form or by booking a call. Read more on our{" "}
                  <a href="/no-cookies" className="text-accent hover:underline">
                    No-Cookies policy page
                  </a>
                  .
                </p>
                <p>
                  <strong className="text-foreground">One exception, so you know.</strong> The booking
                  calendar on our{" "}
                  <a href="/talk-to-an-expert" className="text-accent hover:underline">
                    Talk to an expert
                  </a>{" "}
                  page, and behind &ldquo;Book a call&rdquo; on our session pages, is Calendly, embedded
                  from calendly.com. Calendly sets its own cookies inside that calendar to run the
                  booking, and shows its own cookie notice there. It only loads when you open the
                  calendar. What you enter in the calendar is covered by Calendly&apos;s privacy policy
                  as well as ours.
                </p>
                <p>
                  <strong className="text-foreground">If you came from one of our Google ads</strong> and
                  then send us a request, we save that ad&apos;s click reference with your request. That
                  lets us tell Google an ad led to a request. It is not a cookie, and we don&apos;t follow
                  you around the site to do it.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl mb-3">How we store your data</h2>
              <p className="text-muted-foreground leading-relaxed">
                Form submissions are stored in Supabase (EU data region). We may also receive a
                notification of your submission in our internal Slack workspace so a human can reply.
                Contact details and your submission are also kept in HubSpot, the CRM we use to follow up
                (data processed in the US under the European Commission&apos;s standard contractual clauses).
                We do not sell, rent, or share your personal data with third parties for marketing
                purposes.
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
