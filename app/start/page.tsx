import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StartClient from "./StartClient";
import { ArrowDown, Check } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/start" },
  title: "Where Do You Start?",
  description:
    "Everyone has the same AI now. Brand Humanizing makes your people the reason customers choose you. Answer three questions and see what fits what you need right now.",
  // Share image comes from ./opengraph-image.tsx (generated, book palette).
};

// The guide, in the order people decide: the problem, the outcome, then
// three questions about what they need now. The result is one firm offer.
const outcomes = [
  "Customers choose you, and keep choosing you",
  "Your team is excited about AI, not scared of it",
  "Computers do the boring work. Your people do what customers remember",
];

export default function StartPage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        {/* 1. The problem */}
        <section className="bg-secondary pt-28 md:pt-36 pb-14 md:pb-20">
          <div className="container max-w-3xl">
            <h1 className="text-hero md:text-hero-lg text-foreground leading-[1.05]">
              Everyone has the same AI now. <span className="text-accent">So why would customers pick you?</span>
            </h1>
            <div className="mt-6 space-y-3 text-body-lg text-muted-foreground max-w-2xl">
              <p>Same tools. Same chatbots. Same AI-written emails. Your company starts to look and sound like every other one.</p>
              <p>And the reason people chose you in the first place, your people, slowly disappears.</p>
            </div>
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
              Brand Humanizing flips it. <span className="text-sunny">Your people become the difference.</span>
            </h2>
            <ul className="mt-8 space-y-4">
              {outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-body-lg text-white/90">
                  <Check className="w-6 h-6 text-sunny shrink-0 mt-0.5" /> {o}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Where's your need right now */}
        <section id="test" className="bg-secondary py-16 md:py-24 scroll-mt-16">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <h2 className="text-display md:text-display-lg text-foreground">So, where do you start?</h2>
              <p className="text-body-lg text-muted-foreground mt-3">Three questions about what you need right now. No email needed.</p>
            </div>
            <StartClient />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
