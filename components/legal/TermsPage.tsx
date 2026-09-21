import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Languages } from "lucide-react";
import type { TermsContent } from "./termsContent";

export default function TermsPage({ content }: { content: TermsContent }) {
  const c = content;
  return (
    <>
      <Navbar />
      <main className="bg-secondary min-h-screen">
        <div className="container max-w-3xl pt-28 md:pt-40 pb-20 md:pb-32">
          <div className="flex items-center justify-between gap-4">
            <Breadcrumb items={[{ label: c.breadcrumb }]} />
            <Link
              href={c.langSwitch.href}
              className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <Languages className="w-4 h-4" /> {c.langSwitch.label}
            </Link>
          </div>

          <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-6 mb-3">{c.title}</h1>
          <p className="text-muted-foreground text-sm mb-8">{c.updated}</p>

          <p className="text-muted-foreground leading-relaxed">{c.intro}</p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            {c.privacyNote.text}{" "}
            <Link href={c.privacyNote.href} className="text-accent hover:underline">
              {c.privacyNote.linkLabel}
            </Link>
            .
          </p>

          <div className="mt-12 space-y-10">
            {c.articles.map((a, i) => (
              <section key={a.title}>
                <h2 className="font-heading font-bold text-xl text-foreground mb-3">
                  <span className="text-accent tabular-nums">{i + 1}.</span> {a.title}
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  {a.blocks.map((b, j) =>
                    "list" in b ? (
                      <ul key={j} className="space-y-2 pl-1">
                        {b.list.map((li, k) => (
                          <li key={k} className="flex items-start gap-2.5">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                            <span>{li}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p key={j}>{b.p}</p>
                    )
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
