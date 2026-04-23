"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

type Status = "loading" | "valid" | "already" | "invalid" | "success" | "error";

function UnsubscribeForm() {
  const params = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const url = `${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${token}`;
    fetch(url, { headers: { apikey: supabaseKey } })
      .then(r => r.json())
      .then(d => {
        if (d.valid === false && d.reason === "already_unsubscribed") setStatus("already");
        else if (d.valid) setStatus("valid");
        else setStatus("invalid");
      })
      .catch(() => setStatus("invalid"));
  }, [token]);

  const handleConfirm = async () => {
    try {
      const supabase = createSupabaseBrowserClient();
      const { data } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
      if (data?.success) setStatus("success");
      else if (data?.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <div className="max-w-md w-full text-center space-y-6">
      {status === "loading" && <p className="text-muted-foreground">Loading…</p>}
      {status === "valid" && (
        <>
          <h1 className="text-display text-foreground">Unsubscribe</h1>
          <p className="text-muted-foreground">Click below to stop receiving emails from us.</p>
          <Button onClick={handleConfirm} className="rounded-full bg-accent text-accent-foreground hover:bg-soft-coral font-heading font-semibold h-12 px-8">
            Confirm Unsubscribe
          </Button>
        </>
      )}
      {status === "success" && (
        <>
          <h1 className="text-display text-foreground">You&apos;re unsubscribed</h1>
          <p className="text-muted-foreground">You won&apos;t receive any more emails from us.</p>
        </>
      )}
      {status === "already" && (
        <>
          <h1 className="text-display text-foreground">Already unsubscribed</h1>
          <p className="text-muted-foreground">You&apos;ve already been removed from our mailing list.</p>
        </>
      )}
      {status === "invalid" && (
        <>
          <h1 className="text-display text-foreground">Invalid link</h1>
          <p className="text-muted-foreground">This unsubscribe link is invalid or expired.</p>
        </>
      )}
      {status === "error" && (
        <>
          <h1 className="text-display text-foreground">Something went wrong</h1>
          <p className="text-muted-foreground">Please try again later or contact us.</p>
        </>
      )}
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <Suspense fallback={<p className="text-muted-foreground">Loading…</p>}>
        <UnsubscribeForm />
      </Suspense>
    </div>
  );
}
