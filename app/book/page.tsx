import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { ArrowRight } from "lucide-react";
import BookSection from "@/components/sections/BookSection";
import { BOOK } from "@/lib/pricing";

// The book's purchase mechanism is not decided yet (external retailer vs. direct
// checkout). Until BOOK.purchase.url is set to a real URL, we show the price with
// a "coming" note instead of shipping a broken link.
const bookPurchaseConfigured = !BOOK.purchase.url.startsWith("[");

export const metadata: Metadata = {
  alternates: { canonical: "/book" },
  title: "The Book | Brand Humanizing",
  description:
    "Brand Humanizing: The superpower that makes your brand more human and your business grow faster. By Ferry Hoes and Jonathan Flores.",
  // Share image comes from ./opengraph-image.tsx (generated, book palette).
};

const bookSchema = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Brand Humanizing: The superpower that makes your brand more human and your business grow faster",
  author: [
    { "@type": "Person", name: "Ferry Hoes" },
    { "@type": "Person", name: "Jonathan Flores" },
  ],
  publisher: { "@type": "Organization", name: "Brand Humanizing Institute" },
  inLanguage: "nl",
  url: "https://brandhumanizing.com/book",
};

export default function BookPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }} />
      <Navbar variant="light" />
      <main>
        <section className="bg-secondary pt-28 md:pt-36 pb-12">
          <div className="container max-w-4xl">
            <Breadcrumb items={[{ label: "The Book" }]} variant="light" />
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">The book</span>
            <h1 className="text-hero md:text-hero-lg text-foreground mt-4">
              We wrote the book on Brand Humanizing.
            </h1>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-2xl">
              <em>Brand Humanizing: The superpower that makes your brand more human and your business grow faster.</em> By Ferry Hoes and Jonathan Flores.
            </p>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              The cheapest way to get acquainted. Read it, then we&apos;ll talk.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mt-6">
              <span className="font-heading font-bold text-2xl text-foreground">{BOOK.price}</span>
              <span className="text-sm text-muted-foreground">{BOOK.edition}</span>
              {bookPurchaseConfigured ? (
                <a href={BOOK.purchase.url} target={BOOK.purchase.external ? "_blank" : undefined} rel={BOOK.purchase.external ? "noopener noreferrer" : undefined} className="sm:ml-2">
                  <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2 w-full sm:w-auto">
                    {BOOK.purchase.label} <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              ) : (
                <span className="sm:ml-2 inline-flex items-center gap-2 rounded-full border border-border bg-cream px-4 py-2 text-sm font-heading font-semibold text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Purchase link coming. Want a copy now? <Link href="/contact" className="underline hover:text-accent">Message us</Link>.
                </span>
              )}
            </div>
          </div>
        </section>

        <BookSection />

        <section className="section-padding bg-navy">
          <div className="container max-w-3xl text-center">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-white mb-6">Every session participant gets a copy.</h2>
              <p className="text-white/70 text-body-lg mb-8">
                Book a session and every participant walks away with the book.
              </p>
              <Link href="/learning">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                  See all learning formats <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </ScrollRevealSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
