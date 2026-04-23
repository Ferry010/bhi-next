import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "The No-Cookies Cookie Policy",
  description:
    "We don't use tracking cookies. We have no idea what you're doing on our website — and we think that's the right way to do it.",
};

export default function NoCookiesPage() {
  return (
    <>
      <Navbar variant="light" />
      <main className="bg-secondary min-h-screen">
        <section className="pt-28 md:pt-36 pb-16 md:pb-24">
          <div className="container max-w-3xl">
            <Breadcrumb items={[{ label: "No-Cookie Policy" }]} variant="light" />
            <span className="text-accent text-caption uppercase tracking-widest font-heading font-semibold">🍪 Crossed out</span>
            <h1 className="text-hero md:text-hero-lg text-foreground mt-4">
              The No-Cookies Cookie Policy
            </h1>
            <div className="mt-10 space-y-6 text-sm md:text-body-lg text-muted-foreground leading-relaxed prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground">
              <p>We don&apos;t use tracking cookies.</p>
              <p>
                We have no idea what you are doing on our website. We cannot follow you around. We don&apos;t track where you came from, what pages you visited, or how long you stayed. We have no interest in selling or sharing your browsing behavior with anyone.
              </p>
              <p>
                This is a conscious decision. If we would invite you to our office, we wouldn&apos;t follow your every move either. We extend the same respect to your visit here.
              </p>
              <h2>What we do use</h2>
              <p>
                Our website uses basic, anonymous analytics through Plausible — a privacy-first analytics tool that does not use cookies, does not track individuals, and does not collect personal data. We use it to understand roughly how many people visit and which pages are most popular. That&apos;s it.
              </p>
              <p>
                No third-party advertising cookies. No Facebook Pixel. No Google Analytics. No remarketing. No cross-site tracking of any kind.
              </p>
              <h2>Why this matters to us</h2>
              <p>
                Brand Humanizing is built on the idea that organizations should use technology to become closer to people — not to exploit the data trail people leave behind. Tracking cookies are, in our view, the opposite of Brand Humanizing.
              </p>
              <p>
                We apply what we teach. That&apos;s not a marketing statement. It&apos;s just what we believe.
              </p>
              <h2>Contact</h2>
              <p>
                Questions about this? Email{" "}
                <a href="mailto:ferry@brandhumanizing.com" className="text-accent hover:underline">
                  ferry@brandhumanizing.com
                </a>
                . A human will read it and reply.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
