"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateTokenId(): string {
  const chars = Array.from({ length: 4 }, () =>
    CHARSET[Math.floor(Math.random() * CHARSET.length)]
  ).join("");
  return `HT-${chars}`;
}

async function hashEmail(email: string): Promise<string> {
  const data = new TextEncoder().encode(email.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function formatTimestamp(date: Date): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}, ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}

export default function HumanTouchClient() {
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenId, setTokenId] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<Date | null>(null);
  const [copied, setCopied] = useState<"none" | "text" | "html" | "badge">("none");
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canGenerate = isValidEmail && confirmed && !loading;

  const verifyPath = tokenId ? `/humantouch/v/${tokenId}` : "";
  const verifyFullUrl = tokenId ? `https://brandhumanizing.com${verifyPath}` : "";

  const timestampStr = createdAt ? formatTimestamp(createdAt) : "";
  void timestampStr;

  const domain = "brandhumanizing.com";

  const signatureText = tokenId
    ? `Human Touch | Powered by Brand Humanizing Institute. This e-mail was intentionally sent by a human. Verify at ${domain}/humantouch/v/${tokenId}`
    : "";

  const signatureHtml = tokenId
    ? `<span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;color:#1a1a1a;">✋ Human Touch</span> <span style="font-size:13px;color:#888;">|</span> <span style="font-size:12px;color:#888;">Powered by Brand Humanizing Institute. This e-mail was intentionally sent by a human.</span><br/><a href="${verifyFullUrl}" target="_blank" rel="noopener" style="font-family:sans-serif;font-size:11px;color:#5AA6B2;text-decoration:none;">Verify at Brand Humanizing →</a>`
    : "";

  const badgeHtml = tokenId
    ? `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr><td style="padding:12px 18px;background:#faf8f5;border-radius:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;"><span style="font-size:15px;color:#1a1a1a;font-weight:600;">✋ Human Touch</span> <span style="font-size:13px;color:#aaa;">|</span> <span style="font-size:12px;color:#888;">Powered by Brand Humanizing Institute</span><br/><span style="font-size:12px;color:#888;line-height:1.8;">This e-mail was intentionally sent by a human.</span><br/><a href="${verifyFullUrl}" target="_blank" rel="noopener" style="font-size:11px;color:#5AA6B2;text-decoration:none;">Verify at Brand Humanizing →</a></td></tr></table>`
    : "";

  async function handleGenerate() {
    if (!canGenerate) return;
    setLoading(true);
    setError(null);

    try {
      const emailHash = await hashEmail(email);
      const newTokenId = generateTokenId();
      const now = new Date();
      const expiresAt = new Date(now.getTime() + 72 * 60 * 60 * 1000);

      const supabase = createSupabaseBrowserClient();
      const { error: dbError } = await supabase
        .from("human_touch_tokens")
        .insert({
          token_id: newTokenId,
          email_hash: emailHash,
          expires_at: expiresAt.toISOString(),
        });

      if (dbError) throw dbError;
      setTokenId(newTokenId);
      setCreatedAt(now);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyForEmail() {
    try {
      const item = new ClipboardItem({
        "text/html": new Blob([signatureHtml], { type: "text/html" }),
        "text/plain": new Blob([signatureText], { type: "text/plain" }),
      });
      await navigator.clipboard.write([item]);
    } catch {
      await navigator.clipboard.writeText(signatureText);
    }
    setCopied("text");
    setTimeout(() => setCopied("none"), 2000);
  }

  async function copyBadge() {
    try {
      const item = new ClipboardItem({
        "text/html": new Blob([badgeHtml], { type: "text/html" }),
        "text/plain": new Blob([signatureText], { type: "text/plain" }),
      });
      await navigator.clipboard.write([item]);
    } catch {
      await navigator.clipboard.writeText(signatureText);
    }
    setCopied("badge");
    setTimeout(() => setCopied("none"), 2000);
  }

  async function copyToClipboard(text: string, type: "text" | "html") {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(type);
    setTimeout(() => setCopied("none"), 2000);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-secondary text-foreground">
        <section className="pt-32 pb-12 px-4 text-center">
          <p className="text-xs font-body tracking-[0.25em] uppercase text-primary mb-6">
            Human Touch · Brand Humanizing Institute
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-4">
            Add a human moment.
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-md mx-auto">
            In a world of automated emails, show it was you.
          </p>
        </section>

        <section className="pb-20 px-4 flex justify-center">
          <div className="w-full max-w-[520px] bg-white border border-foreground/10 rounded-2xl p-8">
            {!tokenId ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-body text-foreground/50 mb-2">
                    Your email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-foreground/5 border border-foreground/10 rounded-lg px-4 py-3 text-foreground font-body placeholder:text-foreground/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setConfirmed(!confirmed)}
                  className="flex items-start gap-3 text-left w-full group"
                >
                  <div
                    className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                      confirmed
                        ? "bg-primary border-primary"
                        : "border-foreground/20 group-hover:border-foreground/40"
                    }`}
                  >
                    {confirmed && (
                      <svg viewBox="0 0 12 12" className="w-3 h-3 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    )}
                  </div>
                  <span className="font-body text-sm text-foreground/70">
                    ✋ I confirm I&apos;m sending this message myself
                  </span>
                </button>

                {error && (
                  <p className="text-destructive text-sm font-body">{error}</p>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={!canGenerate}
                  className="w-full py-3 rounded-lg font-body font-semibold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-accent text-accent-foreground hover:brightness-110"
                >
                  {loading ? "Generating..." : "Generate Human Touch"}
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="bg-[#faf8f5] rounded-xl p-5 space-y-1">
                  <p className="font-body text-[15px] text-foreground">
                    ✋ <span className="font-semibold">Human Touch</span>{" "}
                    <span className="text-foreground/30">|</span>{" "}
                    <span className="text-xs text-foreground/50">Powered by Brand Humanizing Institute</span>
                  </p>
                  <p className="font-body text-xs text-foreground/50">
                    This e-mail was intentionally sent by a human.
                  </p>
                  <p className="font-body text-[11px] text-foreground/35 pt-1">
                    <a href={verifyFullUrl} className="text-primary hover:underline" target="_blank" rel="noopener">
                      Verify at Brand Humanizing →
                    </a>
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={copyBadge}
                    className="w-full py-3 rounded-lg font-body font-semibold text-sm transition-all bg-accent text-accent-foreground hover:brightness-110"
                  >
                    {copied === "badge" ? "Copied ✓" : "Copy badge for email"}
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={copyForEmail}
                      className="flex-1 py-2.5 rounded-lg font-body text-xs transition-all border border-foreground/10 text-foreground/50 hover:text-foreground hover:border-foreground/20"
                    >
                      {copied === "text" ? "Copied ✓" : "Copy as text link"}
                    </button>
                    <button
                      onClick={() => copyToClipboard(signatureHtml, "html")}
                      className="flex-1 py-2.5 rounded-lg font-body text-xs transition-all border border-foreground/10 text-foreground/50 hover:text-foreground hover:border-foreground/20"
                    >
                      {copied === "html" ? "Copied ✓" : "Copy raw HTML"}
                    </button>
                  </div>
                </div>

                <p className="text-center text-xs font-body text-foreground/30">
                  Valid for 72 hours · No account needed · No tracking
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="pb-20 px-4">
          <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            {[
              { step: "1", title: "Visit this page", desc: "Complete the check. Takes 10 seconds." },
              { step: "2", title: "Paste in your email", desc: "Copy the badge and add it to your signature or message." },
              { step: "3", title: "The recipient clicks", desc: "They see instantly: a human sent this." },
            ].map((item) => (
              <div key={item.step} className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto font-heading font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-heading font-semibold text-lg">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-4 flex justify-center">
          <div className="w-full max-w-xl bg-white border border-foreground/10 rounded-2xl p-8 text-center space-y-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Why this exists
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed">
              We believe technology should make organisations more human, not less.
              Human Touch is the smallest proof of that idea. A technical signal
              that a human was present.
            </p>
            <p className="font-body text-sm text-primary font-medium">
              Brand Humanizing Institute
            </p>
            <Link href="/about" className="inline-block font-body text-sm text-accent hover:underline">
              More about our approach →
            </Link>
          </div>
        </section>

        <section className="py-10 px-4 text-center">
          <p className="font-body text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Human Touch is an initiative by the Brand Humanizing Institute. No data
            is stored or sold. Tokens expire automatically.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
