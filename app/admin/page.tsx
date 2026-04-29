"use client";

import { useState } from "react";
import { useAdminAccess } from "@/hooks/useAdminAccess";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AdminPage() {
  const { user, isAdmin, loading, signIn, roleError } = useAdminAccess();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) {
      router.replace("/admin/dashboard");
    }
  }, [loading, user, isAdmin, router]);

  if (loading) {
    return (
      <div className="admin-dark min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      toast.error("Login failed: " + error.message);
    }
    // Redirect is handled by the useEffect above once loading resolves and isAdmin is confirmed
  };

  return (
    <div
      className="admin-dark min-h-screen flex items-center justify-center bg-background px-4"
      style={{ backgroundImage: "radial-gradient(ellipse at 50% 30%, hsl(185 30% 46% / 0.08) 0%, transparent 60%)" }}
    >
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="font-heading font-bold text-2xl text-foreground tracking-tight">Brand Humanizing</h1>
          <p className="text-muted-foreground text-sm mt-2">Sign in to the admin panel</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-xl p-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-input border-border text-foreground focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-input border-border text-foreground focus-visible:ring-primary"
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded-lg bg-accent text-accent-foreground font-heading font-semibold hover:brightness-110 transition-all"
            disabled={submitting}
          >
            {submitting ? "Signing in…" : "Sign In"}
          </Button>
        </form>
        {user && !isAdmin && (
          <div className="text-center space-y-2">
            <p className="text-sm text-destructive">You don&apos;t have admin access.</p>
            {roleError && (
              <p className="text-xs text-muted-foreground">
                {roleError === "timeout"
                  ? "Role check timed out. The has_role RPC may not exist in Supabase."
                  : `Role check error: ${roleError}`}
              </p>
            )}
            <p className="text-xs text-muted-foreground font-mono break-all">User ID: {user.id}</p>
          </div>
        )}
      </div>
    </div>
  );
}
