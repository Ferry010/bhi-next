import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import EnglishEditionClient from "./EnglishEditionClient";

const bookSchema = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Brand Humanizing (English Edition)",
  author: [
    { "@type": "Person", name: "Ferry Hoes" },
    { "@type": "Person", name: "Jonathan Flores" },
  ],
  inLanguage: "en",
  description:
    "The English edition of Brand Humanizing. The complete framework for organizations that want to use technology to become more human, not less.",
  publisher: { "@type": "Organization", name: "Brand Humanizing Institute" },
};

export const metadata: Metadata = {
  alternates: { canonical: "/book/english-edition" },
  title: "English Edition | Brand Humanizing Book",
  description:
    "The English edition of Brand Humanizing is coming. Join the waitlist to be the first to know when it launches.",
  openGraph: { images: [{ url: "/og/book-english.jpg" }] },
};

export default function BookEnglishEditionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
      <Navbar />
      <main>
        <section className="bg-secondary pt-28 md:pt-40 pb-16 md:pb-24">
          <div className="container max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Home", to: "/" },
                { label: "Book", to: "/book" },
                { label: "English Edition" },
              ]}
              variant="light"
            />
            <span className="inline-block text-accent font-heading font-bold text-caption uppercase tracking-widest mb-4">
              Coming soon
            </span>
            <h1 className="text-hero md:text-hero-lg text-foreground">
              Brand Humanizing.{" "}
              <span className="text-accent">Now in English.</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-2xl">
              The Dutch edition helped over 50 organizations rethink their relationship with technology. The English edition brings the same framework, the same research, and the same honest voice to a global audience.
            </p>
          </div>
        </section>

        <EnglishEditionClient />
      </main>
      <Footer />
    </>
  );
}
