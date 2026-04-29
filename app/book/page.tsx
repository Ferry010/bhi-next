import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { ArrowRight } from "lucide-react";
import BookSection from "@/components/sections/BookSection";

export const metadata: Metadata = {
  alternates: { canonical: "/book" },
  title: "The Book | Brand Humanizing",
  description:
    "Brand Humanizing: The superpower that makes your brand more human and your business grow faster. By Ferry Hoes and Jonathan Flores.",
  openGraph: { images: [{ url: "/og/book.jpg" }] },
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
