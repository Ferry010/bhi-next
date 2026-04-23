import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "The No-Cookies Cookie Policy",
  description:
    "We don't use tracking cookies. Here's the story of why we chose to treat visitors like humans, not datapoints.",
};

export default function NoCookiesPage() {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white">
      <Navbar variant="dark" />

      <main className="container max-w-3xl pt-24 md:pt-28 pb-24 md:pb-32">
        <Breadcrumb
          items={[{ label: "The No-Cookies Cookie Policy" }]}
          variant="dark"
        />

        {/* Hero */}
        <section className="text-center pt-8 md:pt-12 pb-12 md:pb-16">
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
            <span className="text-7xl" role="img" aria-label="cookie">
              🍪
            </span>
            <svg
              className="absolute inset-0 w-24 h-24"
              viewBox="0 0 96 96"
              fill="none"
            >
              <line
                x1="16"
                y1="16"
                x2="80"
                y2="80"
                stroke="hsl(var(--accent))"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4 text-white">
            The No-Cookies Cookie Policy
          </h1>
          <p className="text-accent font-heading font-semibold text-lg md:text-xl">
            Yes, this is a real policy. No, there are no cookies.
          </p>
        </section>

        {/* Declaration – orange left-border blockquote */}
        <section className="border-l-4 border-accent pl-6 md:pl-8 py-2 mb-16 md:mb-20">
          <p className="text-lg md:text-xl leading-relaxed text-white/90">
            We don&apos;t use tracking cookies. We have no idea what you are
            doing on our website, as we cannot follow you around. This is a
            conscious decision made by us because if we would invite you to our
            office, we wouldn&apos;t follow your every move either.
          </p>
        </section>

        {/* Visitor counter */}
        <section className="flex justify-center mb-16 md:mb-20">
          <div className="bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-center">
            <p className="text-white/40 text-xs uppercase tracking-widest font-heading mb-2">
              Visitor count
            </p>
            <p className="text-5xl md:text-6xl font-heading font-bold text-accent">
              ?
            </p>
            <p className="text-white/40 text-sm mt-2">
              You could be our 10,000th visitor and we wouldn&apos;t have a
              clue.
            </p>
          </div>
        </section>

        {/* Origin story */}
        <section className="mb-16 md:mb-20 space-y-6">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-white/90">
            Where it all started{" "}
            <span className="text-accent" role="img" aria-label="cookie">
              🍪
            </span>
          </h2>
          <p className="text-white/70 leading-relaxed">
            It stems from the time when Jonathan and I were Growth Hackers. Our
            daily job was to optimize websites, forms, shops, you name it. Using
            tools like Google Analytics and Hotjar to measure every move anyone
            made. We were{" "}
            <span className="text-accent font-semibold">
              &ldquo;optimizing datapoints&rdquo;
            </span>
            .
          </p>
          <p className="text-white/70 leading-relaxed">
            But when coining &ldquo;Brand Humanizing&rdquo; we realized that
            with &ldquo;datapoint&rdquo; we meant people. Humans. Not an online
            entity we could optimize, but a human being that took time out of
            their day to visit our website, store or product.
          </p>
        </section>

        {/* Big callout */}
        <section className="mb-16 md:mb-20 bg-accent/10 rounded-3xl p-8 md:p-12 text-center">
          <p className="font-heading text-2xl md:text-3xl font-bold leading-snug text-white">
            We were optimizing datapoints.
            <br />
            <span className="text-accent">But datapoints were people.</span>
          </p>
        </section>

        {/* The decision */}
        <section className="mb-16 md:mb-20 space-y-6">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-white/90">
            The decision
          </h2>
          <p className="text-white/70 leading-relaxed">
            When we built this website, we figured: what would knowing all this
            data bring us? Sure, we could optimize for more sales, analyze video
            footage of your browsing, but would it bring us closer? No, it would
            make our relationship even more transactional.
          </p>
          <p className="text-white/70 leading-relaxed">
            And that&apos;s just not who we are.
          </p>
        </section>

        {/* The policy – second blockquote */}
        <section className="mb-16 md:mb-20 space-y-6">
          <div className="border-l-4 border-accent pl-6 md:pl-8 py-2">
            <p className="font-heading text-2xl md:text-3xl font-bold text-white">
              And thus: no cookies.{" "}
              <span role="img" aria-label="no cookie">
                🚫🍪
              </span>
            </p>
          </div>
          <p className="text-white/70 leading-relaxed">
            Out here, you are completely anonymous. We won&apos;t even know you
            are here until you decide to reach out. Don&apos;t get us wrong, we
            love data and tech just as much as the next person. But all in good
            use and with a purpose. And following people online and seeing them
            as datapoints is just not our purpose.
          </p>
        </section>

        {/* Sign-off */}
        <section className="text-center pt-4 pb-8">
          <p className="font-heading text-2xl md:text-3xl font-bold text-accent mb-4">
            So see you around!
          </p>
          <p className="text-white/50 text-lg">
            Or not, who knows!{" "}
            <span role="img" aria-label="shrug">
              🤷
            </span>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
