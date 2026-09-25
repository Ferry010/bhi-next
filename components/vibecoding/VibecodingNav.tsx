import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import type { VibeContent } from "./content";

// A stripped-down header for the landing page: logo, a few on-page anchors, the
// language switch and one primary CTA. No full site menu — fewer ways to leave
// the page, which is the whole point of a landing page.
export default function VibecodingNav({ content }: { content: VibeContent }) {
  const c = content;
  const links =
    c.lang === "nl"
      ? [
          { href: "#wat-is-vibecoding", label: "Wat is het" },
          { href: "#prijs", label: "Prijs" },
          { href: "#book", label: "Boeken" },
        ]
      : [
          { href: "#wat-is-vibecoding", label: "What it is" },
          { href: "#prijs", label: "Price" },
          { href: "#book", label: "Book" },
        ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/50">
      <div className="container max-w-6xl flex items-center justify-between gap-4 h-14 md:h-20">
        <Link href="/" aria-label="Brand Humanizing Institute" className="relative shrink-0 translate-y-4 md:translate-y-5">
          <img
            src="/assets/logo.png"
            alt="Brand Humanizing Institute"
            className="w-14 h-14 md:w-20 md:h-20 rounded-xl -rotate-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:rotate-0 transition-transform duration-300"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-heading font-semibold text-foreground/80 hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={c.langSwitch.href}
            className="hidden sm:inline-flex items-center gap-1 text-sm font-heading font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <Languages className="w-4 h-4" /> {c.langSwitch.label}
          </Link>
          <a href="#book">
            <Button className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral btn-scale font-heading font-semibold h-10 px-5 text-sm">
              {c.hero.cta}
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
