import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

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
      </main>
      <Footer />
    </>
  );
}
