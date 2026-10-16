import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StartClient from "./StartClient";
import { ArrowDown, Check, X } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/start" },
  title: "Where Do You Start?",
  description:
    "Everyone has the same AI now, so technology no longer sets you apart. Your people do. Answer three questions and see where you start with Brand Humanizing.",
  // Share image comes from ./opengraph-image.tsx (generated, book palette).
};

// The guide, in the order people decide: the pain (sameness), the outcome
// (change the players), then three questions. The result is one firm offer.
const pains = [
  "Companies start to look and sound the same",
  "Bots end up where customers want a human",
  "People end up working like bots",
];

const outcomes = [
  "You know where people make the difference, and where tech should do the work",
  "Your technology makes your people stronger, instead of replacing them",
  "Customers choose you because of your people, and keep choosing you",
];

export default function StartPage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        {/* 1. The pain */}
        <section className="bg-secondary pt-28 md:pt-36 pb-14 md:pb-20">
          <div className="container max-w-3xl">
            <h1 className="text-hero md:text-hero-lg text-foreground leading-[1.05]">
              Everyone has the same AI now. <span className="text-accent">So what makes you different?</span>
            </h1>
            <ul className="mt-8 space-y-3">
              {pains.map((p) => (
                <li key={p} className="flex items-start gap-3 text-body-lg text-foreground">
                  <X className="w-6 h-6 text-accent shrink-0 mt-0.5" /> {p}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-body-lg text-muted-foreground max-w-2xl">
              Technology used to set you apart. Now everyone has it. What sets you apart now is your people.
            </p>
            <a
              href="#test"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base"
            >
              See where you start <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* 2. The outcome */}
        <section className="bg-navy py-14 md:py-20">
          <div className="container max-w-3xl">
            <h2 className="text-display md:text-display-lg text-white">
              Same tools for everyone? <span className="text-sunny">Then change the players.</span>
            </h2>
            <p className="mt-5 text-body-lg text-white/80 max-w-2xl">
              Brand Humanizing is branding for the future. It shows you where people fit, where technology belongs, and how
              technology can make your people stronger. That&apos;s how you stand out.
            </p>
            <ul className="mt-8 space-y-4">
              {outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-body-lg text-white/90">
                  <Check className="w-6 h-6 text-sunny shrink-0 mt-0.5" /> {o}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Where do you start */}
        <section id="test" className="bg-secondary py-16 md:py-24 scroll-mt-16">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <h2 className="text-display md:text-display-lg text-foreground">So, where do you start?</h2>
              <p className="text-body-lg text-muted-foreground mt-3">Three questions. No email needed.</p>
            </div>
            <StartClient />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
