"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// The password screen. One field, no username, no reset link, no "remember me".
// If somebody forgets it, the answer is the environment variable, not a flow.

export default function AdminGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/impact-gap/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const body = (await res.json()) as { ok?: boolean; error?: string };

      if (body.ok) {
        onSuccess();
        return;
      }
      setError(
        body.error === "not_configured"
          ? "No password has been set for this screen. Add IMPACT_GAP_ADMIN_PASSWORD to the environment and redeploy."
          : "That password is not right.",
      );
    } catch {
      setError("Could not reach the server. Try again.");
    } finally {
      setBusy(false);
      setPassword("");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <form onSubmit={submit} noValidate className="w-full max-w-sm rounded-2xl border border-border bg-white p-6">
        <h1 className="font-heading text-xl font-bold text-foreground">Impact Gap admin</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Leads, results and the draft replies. Nothing here is public.
        </p>

        <label htmlFor="admin-password" className="mt-6 block font-heading text-sm font-semibold text-foreground">
          Password
        </label>
        <Input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "admin-password-error" : undefined}
          className="mt-1.5 h-12 rounded-lg"
        />
        {error && (
          <p id="admin-password-error" role="alert" className="mt-2 text-sm font-medium text-accent">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={busy}
          className="btn-scale mt-5 h-12 w-full rounded-full bg-accent font-heading font-semibold text-accent-foreground hover:bg-soft-coral"
        >
          {busy ? "Checking…" : "Open"}
        </Button>
      </form>
    </main>
  );
}
