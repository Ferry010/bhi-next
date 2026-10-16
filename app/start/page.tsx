import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StartClient from "./StartClient";

export const metadata: Metadata = {
  alternates: { canonical: "/start" },
  title: "Find Your Level",
  description:
    "Brand Humanizing has four levels, from the book to a taskforce inside your organisation. Answer a few quick questions and see which level you're at.",
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
              <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">Find your level</span>
              <p className="text-body-lg text-muted-foreground mt-3">
                Four levels, from the book to a taskforce inside your organisation. Answer a few quick questions and see where you step in. No forms, no e-mail needed.
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
