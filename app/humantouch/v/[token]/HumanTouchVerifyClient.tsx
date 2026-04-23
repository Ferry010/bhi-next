"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type TokenState =
  | { status: "loading" }
  | { status: "valid"; token_id: string; created_at: string; expires_at: string; view_count: number }
  | { status: "expired"; token_id: string; created_at: string; expires_at: string; view_count: number }
  | { status: "not_found" };

function formatDate(iso: string): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const d = new Date(iso);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

export default function HumanTouchVerifyClient({ token }: { token: string }) {
  const [state, setState] = useState<TokenState>({ status: "loading" });

  useEffect(() => {
    if (!token) {
      setState({ status: "not_found" });
      return;
    }

    async function lookup() {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase
        .from("human_touch_tokens")
        .select("*")
        .eq("token_id", token)
        .maybeSingle();

      if (error || !data) {
        setState({ status: "not_found" });
        return;
      }

      await supabase
        .from("human_touch_tokens")
        .update({
          view_count: (data.view_count ?? 0) + 1,
          last_viewed_at: new Date().toISOString(),
        })
        .eq("token_id", token);

      const isExpired = new Date(data.expires_at) < new Date();

      setState({
        status: isExpired ? "expired" : "valid",
        token_id: data.token_id,
        created_at: data.created_at!,
        expires_at: data.expires_at,
        view_count: (data.view_count ?? 0) + 1,
      });
    }

    lookup();
  }, [token]);

  const showMeta = state.status === "valid" || state.status === "expired";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-secondary text-foreground">
        <section className="pt-32 pb-12 px-4 text-center">
          {state.status === "loading" && (
            <div className="space-y-6 animate-pulse">
              <div className="h-8 w-64 bg-foreground/5 rounded-full mx-auto" />
              <div className="h-12 w-96 max-w-full bg-foreground/5 rounded-lg mx-auto" />
              <div className="h-6 w-80 max-w-full bg-foreground/5 rounded mx-auto" />
            </div>
          )}

          {state.status === "valid" && (
            <>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-body font-medium mb-6">
                ✋ Human Touch verified
              </div>
              <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4">
                A human is behind this message.
              </h1>
              <p className="font-body text-lg text-muted-foreground max-w-md mx-auto">
                This email was intentionally sent by a human. In a world of automation, that counts.
              </p>
              <Link href="/humantouch" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-lg bg-primary/10 text-primary font-body font-semibold text-sm hover:bg-primary/20 transition-colors">
                ✋ I want to do this too →
              </Link>
            </>
          )}

          {state.status === "expired" && (
            <>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-body font-medium mb-6">
                Token expired
              </div>
              <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4">
                This token has expired.
              </h1>
              <p className="font-body text-lg text-muted-foreground max-w-md mx-auto">
                Human Touch tokens are valid for 72 hours. The email was sent in time, but verification is no longer active.
              </p>
              <Link href="/humantouch" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-lg bg-primary/10 text-primary font-body font-semibold text-sm hover:bg-primary/20 transition-colors">
                ✋ I want to do this too →
              </Link>
            </>
          )}

          {state.status === "not_found" && (
            <>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 text-muted-foreground text-sm font-body font-medium mb-6">
                Not found
              </div>
              <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4">
                This token does not exist.
              </h1>
            </>
          )}
        </section>

        {showMeta && (
          <section className="pb-16 px-4 flex justify-center">
            <div className="w-full max-w-md bg-white border border-foreground/10 rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm font-body">
                <div>
                  <p className="text-foreground/40 mb-1">Token ID</p>
                  <p className="text-foreground font-medium">{state.token_id}</p>
                </div>
                <div>
                  <p className="text-foreground/40 mb-1">Status</p>
                  <p className={state.status === "valid" ? "text-primary font-medium" : "text-accent font-medium"}>
                    {state.status === "valid" ? "Valid" : "Expired"}
                  </p>
                </div>
                <div>
                  <p className="text-foreground/40 mb-1">Created</p>
                  <p className="text-foreground">{formatDate(state.created_at)}</p>
                </div>
                <div>
                  <p className="text-foreground/40 mb-1">
                    {state.status === "valid" ? "Expires" : "Expired"}
                  </p>
                  <p className="text-foreground">{formatDate(state.expires_at)}</p>
                </div>
                <div>
                  <p className="text-foreground/40 mb-1">Viewed</p>
                  <p className="text-foreground">{state.view_count} {state.view_count === 1 ? "time" : "times"}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="pb-16 px-4">
          <div className="max-w-xl mx-auto text-center space-y-4">
            <h2 className="font-heading text-2xl font-bold">What is Human Touch?</h2>
            <p className="font-body text-muted-foreground leading-relaxed">
              Human Touch is a simple signal that a human intentionally sent an email. No anti-spam technology. No tracking. Just a small human act.
            </p>
            <p className="font-body text-xs text-muted-foreground/40">
              An initiative by Brand Humanizing Institute.
            </p>
          </div>
        </section>

        <section className="py-20 px-4 bg-navy">
          <div className="max-w-xl mx-auto text-center space-y-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
              Want to add a human touch to your emails?
            </h2>
            <p className="font-body text-white/60 leading-relaxed">
              Show your recipients there&apos;s a real person behind the message. It takes 10 seconds.
            </p>
            <Link
              href="/humantouch"
              className="inline-block px-8 py-3.5 rounded-lg bg-accent text-accent-foreground font-body font-semibold text-sm hover:brightness-110 transition-all"
            >
              Try it yourself
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
