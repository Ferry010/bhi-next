import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StartClient from "./StartClient";

export const metadata: Metadata = {
  alternates: { canonical: "/start" },
  title: "Find Your Fit | Brand Humanizing Institute",
  description:
    "Not sure where to start with Brand Humanizing? Answer three quick questions and we'll point you to the right way in, then a real human replies to your specific question.",
  // Share image comes from ./opengraph-image.tsx (generated, book palette).
};

export default function StartPage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        <section className="bg-secondary min-h-screen pt-28 md:pt-36 pb-16 md:pb-24">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
              <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">Find your fit</span>
              <p className="text-body-lg text-muted-foreground mt-3">
                Three quick questions and we point you to the right next step. No forms, just the right way in, and a real conversation whenever you want one.
              </p>
            </div>
            <StartClient />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
