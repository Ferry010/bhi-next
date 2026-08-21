import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BOOK } from "@/lib/pricing";

export const metadata: Metadata = {
  alternates: { canonical: "/our-beliefs" },
  title: "Our Beliefs | Brand Humanizing Institute",
  description:
    "What we believe to be true about technology, brands and people. The convictions behind Brand Humanizing, said plainly.",
  // Share image comes from ./opengraph-image.tsx (generated, book palette).
};

const beliefs = [
  {
    statement: "Technology should amplify the human, not replace it.",
    body: "The point of a tool is to give people more room to be human, not less. When technology takes the repetitive work, it frees people for the work only people can do: judgement, care, creativity, relationships. Used the other way, it quietly turns your team into machines. We build for the first way, every time.",
  },
  {
    statement: "Customers are not data points. They are people with real lives.",
    body: "A dashboard flattens a person into a row. But behind every row is someone having a bad morning, chasing a deadline, quietly deciding whether they still trust you. Brands that remember this earn loyalty. Brands that forget it optimise their way into a commodity.",
  },
  {
    statement: "The most durable advantage is genuine care.",
    body: "Features get copied. Prices get matched. Algorithms get reverse-engineered within a quarter. Care, the real kind, built into how you actually work, cannot be lifted from the outside. It compounds. It is the one edge that grows stronger the longer you hold it.",
  },
  {
    statement: "Happy employees and loyal customers are two sides of the same coin.",
    body: "Nobody passes on care they do not feel. A team that is trusted, freed from busywork and proud of the work carries that straight through to the customer, without being told to. You cannot fake it downstream. It starts inside the building.",
  },
  {
    statement: "Short-term thinking is the enemy of great brands.",
    body: "The pressure to hit the quarter pushes everyone toward the same cheap tricks, and the same grey middle. Great brands play the longer game. They invest in the moments that build trust, even when the spreadsheet cannot see the payback yet. The trust is the payback.",
  },
  {
    statement: "Care belongs in how you work, not on a poster.",
    body: "Values on a wall change nothing. What changes things is care built into decisions: who you hire, what you measure, which corners you refuse to cut. Our whole job is helping teams move it off the wall and into the work.",
  },
  {
    statement: "The future of business is human. And it always has been.",
    body: "Every wave of technology sparks the same fear that people will matter less. It never comes true. The tools change, the advantage stays the same. The organisations that use technology to become more human, not less, are the ones people keep choosing. That is the whole idea.",
  },
];

export default function OurBeliefsPage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        {/* Hero — set it up as a statement */}
        <section className="bg-secondary pt-28 md:pt-36 pb-14 md:pb-20">
          <div className="container max-w-3xl">
            <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Our Beliefs" }]} variant="light" />
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">What we believe</span>
            <h1 className="text-hero md:text-hero-lg text-foreground mt-4 leading-[1.05]">
              A few things we believe <span className="text-accent">to be true.</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-2xl">
              Brand Humanizing is not a campaign or a coat of paint. It comes from a handful of convictions we keep coming back to. Here they are, said plainly.
            </p>
          </div>
        </section>

        {/* The statement itself */}
        <section className="section-padding bg-white">
          <div className="container max-w-3xl">
            <div className="space-y-14 md:space-y-20">
              {beliefs.map((b, i) => (
                <ScrollRevealSection key={i}>
                  <div className="grid grid-cols-[auto_1fr] gap-5 md:gap-7">
                    <span className="font-heading font-extrabold text-2xl md:text-3xl text-accent/30 tabular-nums leading-none pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="text-section md:text-display font-heading font-bold text-foreground leading-tight">
                        {b.statement}
                      </h2>
                      <p className="text-body-lg text-muted-foreground leading-relaxed mt-4">{b.body}</p>
                    </div>
                  </div>
                </ScrollRevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* Close — the navy moment, then out to the paths */}
        <section className="section-padding bg-navy">
          <div className="container max-w-3xl text-center">
            <ScrollRevealSection>
              <h2 className="text-display md:text-display-lg text-white leading-tight">
                Believe the same things? Then let&apos;s put them to work.
              </h2>
              <p className="text-white/70 text-body-lg mt-5 max-w-xl mx-auto">
                See where these convictions came from, or start putting them into your own team&apos;s hands.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8">
                <Link href="/our-story">
                  <Button className="rounded-full bg-sunny text-sunny-foreground hover:bg-sunny hover:brightness-95 btn-scale font-heading font-semibold px-8 h-12 text-base gap-2 w-full sm:w-auto">
                    Read our story <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href={BOOK.purchase.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="rounded-full border-white/40 text-white hover:bg-white/5 font-heading font-semibold px-8 h-12 text-base w-full sm:w-auto">
                    Get the book
                  </Button>
                </a>
              </div>
            </ScrollRevealSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
