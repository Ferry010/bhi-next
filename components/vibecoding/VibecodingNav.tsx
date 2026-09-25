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
      <div className="container max-w-6xl flex items-center justify-between gap-4 h-16">
        <Link href="/" aria-label="Brand Humanizing Institute" className="shrink-0">
          <img
            src="/assets/logo.png"
            alt="Brand Humanizing Institute"
            className="w-11 h-11 rounded-lg -rotate-2 drop-shadow-[0_3px_8px_rgba(0,0,0,0.2)]"
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
