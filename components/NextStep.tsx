"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOK, TALK_TO_EXPERT } from "@/lib/pricing";

// Every route on the site ends in one of three exits:
//   book    → buy the book (the cheapest way in)
//   meeting → book a call (Calendly on /talk-to-an-expert)
//   quote   → request info or a quote (/contact, preselected)
// This block is the shared end-of-page funnel. It always looks and behaves the
// same, leads with ONE primary action chosen for the page's intent, and keeps
// the other exits one quiet click away so nobody hits a dead end.

export type Exit = "book" | "meeting" | "quote";
type Intent = "session" | "project" | "course" | "question";

const COPY = {
  en: {
    book: {
      heading: "Start with the book.",
      body: `The whole method for ${BOOK.price}. Read it tonight, try something tomorrow.`,
      cta: BOOK.purchase.label,
      lead: "Not ready to talk yet?",
      link: "Start with the book",
    },
    meeting: {
      heading: "Let's talk about your team.",
      body: "A short call with Ferry. Your situation and what would actually help. No pitch deck.",
      cta: TALK_TO_EXPERT.label,
      lead: "Rather talk it through?",
      link: TALK_TO_EXPERT.label,
    },
    quote: {
      heading: "Want a proposal for your team?",
      body: "Tell us what you have in mind. We come back with options and a price, usually within one working day.",
      cta: "Request a quote",
      lead: "Need a proposal?",
      link: "Request a quote",
    },
  },
  nl: {
    book: {
      heading: "Begin met het boek.",
      body: `De hele methode voor ${BOOK.price}. Vanavond lezen, morgen iets uitproberen.`,
      cta: "Koop het boek",
      lead: "Nog niet klaar voor een gesprek?",
      link: "Begin met het boek",
    },
    meeting: {
      heading: "Laten we het over je team hebben.",
      body: "Een kort gesprek met Ferry. Jouw situatie en wat echt zou helpen. Geen pitch deck.",
      cta: "Plan een gesprek",
      lead: "Liever eerst even praten?",
      link: "Plan een gesprek",
    },
    quote: {
      heading: "Een voorstel voor je team?",
      body: "Vertel wat je in gedachten hebt. We komen terug met opties en een prijs, meestal binnen een werkdag.",
      cta: "Vraag een offerte aan",
      lead: "Een voorstel nodig?",
      link: "Vraag een offerte aan",
    },
  },
} as const;

export default function NextStep({
  primary,
  quoteIntent = "session",
  exclude = [],
  lang = "en",
  heading,
  body,
}: {
  primary: Exit;
  /** Which /contact form step "Request a quote" opens. */
  quoteIntent?: Intent;
  /** Exits to leave out (e.g. "quote" on a page shown right after a quote request). */
  exclude?: Exit[];
  lang?: "en" | "nl";
  /** Optional page-specific heading/body for the primary exit. */
  heading?: string;
  body?: string;
}) {
  const pathname = usePathname();
  const t = COPY[lang];

  const href: Record<Exit, string> = {
    book: BOOK.purchase.url,
    meeting: TALK_TO_EXPERT.url,
    quote: `/contact?intent=${quoteIntent}&from=${encodeURIComponent(pathname || "/")}`,
  };
  const external = (e: Exit) => e === "book" && BOOK.purchase.external;

  const order: Exit[] = ["meeting", "quote", "book"];
  const secondary = order.filter((e) => e !== primary && !exclude.includes(e));
  const p = t[primary];

  const PrimaryLink = ({ children }: { children: React.ReactNode }) =>
    external(primary) ? (
      <a href={href[primary]} target="_blank" rel="noopener noreferrer">{children}</a>
    ) : (
      <Link href={href[primary]}>{children}</Link>
    );

  return (
    <section className="bg-cream py-16 md:py-24 border-t border-border/40">
      <div className="container max-w-5xl">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-end">
          <div>
            <h2 className="text-display md:text-display-lg text-foreground">{heading ?? p.heading}</h2>
            <p className="text-body-lg text-muted-foreground mt-4 max-w-xl">{body ?? p.body}</p>
            <div className="mt-8">
              <PrimaryLink>
                <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold px-8 h-12 text-base gap-2">
                  {p.cta} <ArrowRight className="w-4 h-4" />
                </Button>
              </PrimaryLink>
            </div>
          </div>

          {secondary.length > 0 && (
            <ul className="space-y-5 md:border-l md:border-border/60 md:pl-10">
              {secondary.map((e) => {
                const s = t[e];
                const cls = "inline-flex items-center gap-1.5 font-heading font-semibold text-primary hover:text-accent transition-colors";
                return (
                  <li key={e}>
                    <p className="text-sm text-muted-foreground">{s.lead}</p>
                    {external(e) ? (
                      <a href={href[e]} target="_blank" rel="noopener noreferrer" className={cls}>
                        {s.link} <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link href={href[e]} className={cls}>
                        {s.link} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
