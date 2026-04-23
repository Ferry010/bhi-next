import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import OriginStory from "@/components/sections/OriginStory";
import Manifesto from "@/components/sections/Manifesto";

export const metadata: Metadata = {
  title: "Our Story | Brand Humanizing Institute",
  description:
    "How Ferry Hoes and Jonathan Flores started Brand Humanizing in 2017 over fast food in Rotterdam.",
};

export default function OurStoryPage() {
  return (
    <>
      <Navbar variant="light" />
      <main>
        <section className="bg-secondary pt-28 md:pt-36 pb-12">
          <div className="container max-w-3xl">
            <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Our Story" }]} variant="light" />
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">2017 — Rotterdam</span>
            <h1 className="text-hero md:text-hero-lg text-foreground mt-4">Our story</h1>
          </div>
        </section>
        <OriginStory />
        <Manifesto />
      </main>
      <Footer />
    </>
  );
}
