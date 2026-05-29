import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/research/state-of-human-2020" },
  title: "The State of Human 2020 | Brand Humanizing Institute",
  description:
    "104 decision-makers across five continents. The central question: is there still a place for humans in an increasingly automated world? Download the full report.",
  openGraph: { images: [{ url: "/og/state-of-human-2020.jpg" }] },
};

export default function StateOfHuman2020Page() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-secondary section-padding pt-28 md:pt-36">
          <div className="container max-w-3xl">
            <Breadcrumb
              items={[
                { label: "Research", to: "/research" },
                { label: "State of Human 2020" },
              ]}
            />
            <span className="text-caption font-heading font-semibold text-accent">2020</span>
            <h1 className="text-hero text-foreground mt-2">The State of Human 2020</h1>
            <p className="text-body-lg text-muted-foreground mt-6">
              104 decision-makers across five continents. The central question: is there still a place for humans in an increasingly automated world?
            </p>
            <p className="text-body-lg text-muted-foreground mt-4">
              AI and automation are changing what human work looks like. This research explores where we are now and what the future of human labor actually looks like. No fear-mongering.
            </p>
            <div className="mt-8">
              <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                <Download className="w-4 h-4" /> Download the report
              </Button>
            </div>
          </div>
        </section>
        <section className="section-padding bg-cream">
          <div className="container max-w-3xl">
            <p className="text-caption font-heading font-semibold text-accent uppercase tracking-widest mb-4">WHAT CHANGED SINCE 2020</p>
            <h2 className="text-display md:text-display-lg text-foreground mb-4">Five years later, we asked again.</h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              The State of Brand Humanizing 2026 builds on this foundation with eight years of applied research, 50+ organisations, and a world that has changed considerably since this report was written.
            </p>
            <Link href="/research/state-of-brand-humanizing-2026">
              <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                Read the 2026 report <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="section-padding bg-navy">
          <div className="container max-w-3xl text-center">
            <h2 className="text-display md:text-display-lg text-white mb-4">Want to apply this to your organisation?</h2>
            <p className="text-body-lg text-white/80 mb-8">
              The research is the foundation. The Inspiration Session is where it becomes useful for your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/learning/inspiration-session">
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                  Book an Inspiration Session <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="rounded-full border-[1.5px] border-white/70 text-white hover:border-white hover:bg-white/5 font-heading font-semibold px-8 h-12 text-base gap-2">
                  Talk to a human <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
