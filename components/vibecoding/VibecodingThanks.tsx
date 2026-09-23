import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VibecodingBuilder from "./VibecodingBuilder";
import { Check, ArrowLeft } from "lucide-react";
import type { VibeContent } from "./content";

// The page the booking form lands on after a successful submit. It doubles as
// the Google Ads conversion URL, so it must be its own route (not an inline
// success state). Kept fun: you get to build the same kind of thing your team
// will build on the day.
export default function VibecodingThanks({ content }: { content: VibeContent }) {
  const c = content;
  const t = c.thanks;
  const backHref = c.lang === "nl" ? "/teamuitje" : "/vibecoding";

  return (
    <>
      <Navbar variant="light" />
      <main>
        <section className="bg-secondary pt-28 md:pt-36 pb-14 md:pb-20 overflow-hidden">
          <div className="container max-w-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-hero md:text-hero-lg text-foreground leading-[1.05]">{t.heading}</h1>
            <p className="mt-5 text-body-lg text-muted-foreground max-w-xl mx-auto">{t.body}</p>
            <div className="mt-8">
              <Link
                href={backHref}
                className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> {t.back}
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="container max-w-4xl">
            <p className="text-center text-lg md:text-xl font-heading font-semibold text-foreground max-w-2xl mx-auto">
              {t.gameIntro}
            </p>
            <div className="mt-10">
              <VibecodingBuilder lang={c.lang} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
