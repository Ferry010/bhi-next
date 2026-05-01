"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

type Stage = "verifying" | "set-password" | "submitting" | "done" | "error";

function InviteFlow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") ?? "invite";

  const [stage, setStage] = useState<Stage>("verifying");
  const [errorMsg, setErrorMsg] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Step 1: verify OTP on mount
  useEffect(() => {
    if (!tokenHash) {
      setErrorMsg("Invalid or missing invite link. Ask an admin to resend your invite.");
      setStage("error");
      return;
    }

    const supabase = createSupabaseBrowserClient();

    supabase.auth
      .verifyOtp({ token_hash: tokenHash, type: type as "invite" })
      .then(({ data, error }) => {
        if (error) {
          setErrorMsg(
            error.message.includes("expired")
              ? "This invite link has expired. Ask an admin to send a new one."
              : error.message
          );
          setStage("error");
          return;
        }
        setAccessToken(data.session?.access_token ?? null);
        setStage("set-password");
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Step 2: set password + assign role
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setErrorMsg("Passwords don't match.");
      return;
    }

    setErrorMsg("");
    setStage("submitting");

    try {
      const supabase = createSupabaseBrowserClient();

      // Set the password
      const { error: pwError } = await supabase.auth.updateUser({ password });
      if (pwError) throw new Error(pwError.message);

      // Get fresh token (updateUser may refresh session)
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token ?? accessToken;

      // Server assigns the role from invite metadata
      const res = await fetch("/api/invite/complete", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const body = await res.json() as { error?: string };
        throw new Error(body.error ?? "Could not assign role");
      }

      setStage("done");
      setTimeout(() => router.push("/admin"), 2000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStage("set-password");
    }
  }

  // ── Render states ──────────────────────────────────────────────────────────
  if (stage === "verifying") {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Verifying your invite…</p>
      </div>
    );
  }

  if (stage === "done") {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        <p className="font-heading font-semibold text-foreground">You&apos;re in!</p>
        <p className="text-sm text-muted-foreground">Redirecting to the admin panel…</p>
      </div>
    );
  }

  if (stage === "error") {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <AlertTriangle className="w-8 h-8 text-destructive" />
        <p className="font-heading font-semibold text-foreground">Invite error</p>
        <p className="text-sm text-muted-foreground max-w-xs">{errorMsg}</p>
      </div>
    );
  }

  // set-password or submitting
  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
          New password
        </label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          required
          autoFocus
          className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
          Confirm password
        </label>
        <input
          type="password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          placeholder="Same password again"
          required
          className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {errorMsg && (
        <p className="text-xs text-destructive">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={stage === "submitting"}
        className="w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {stage === "submitting" && <Loader2 className="w-4 h-4 animate-spin" />}
        {stage === "submitting" ? "Setting up your account…" : "Set password & sign in"}
      </button>
    </form>
  );
}

export default function InvitePage() {
  return (
    <div className="admin-dark min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="font-heading font-bold text-xl text-foreground">
            Welcome to Brand Humanizing
          </h1>
          <p className="text-sm text-muted-foreground">
            You&apos;ve been invited. Set a password to get started.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 flex items-center justify-center min-h-[200px]">
          <Suspense fallback={<Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />}>
            <InviteFlow />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
