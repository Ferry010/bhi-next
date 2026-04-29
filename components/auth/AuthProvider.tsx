"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { AuthError, AuthTokenResponsePassword, Session, User } from "@supabase/supabase-js";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthTokenResponsePassword>;
  signOut: () => Promise<{ error: AuthError | null }>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Gracefully handle missing env vars — createSupabaseBrowserClient throws if
  // NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY are absent.
  const supabase = useMemo(() => {
    try {
      return createSupabaseBrowserClient();
    } catch {
      return null;
    }
  }, []);

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  // Start loading only when Supabase is available; otherwise treat as logged-out immediately.
  const [loading, setLoading] = useState(supabase !== null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!supabase) return;

    let cancelled = false;

    const applySession = (nextSession: Session | null) => {
      if (cancelled) return;
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setLoading(false);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (!initializedRef.current && event === "INITIAL_SESSION") return;
      initializedRef.current = true;
      applySession(nextSession);
    });

    void supabase.auth.getSession()
      .then(({ data: { session: initialSession } }) => {
        initializedRef.current = true;
        applySession(initialSession);
      })
      .catch(() => {
        // Supabase unreachable — treat as logged-out rather than hanging forever.
        initializedRef.current = true;
        applySession(null);
      });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    session,
    loading,
    signIn: (email: string, password: string) => {
      if (!supabase) {
        return Promise.resolve({
          data: { user: null, session: null },
          error: {
            message: "Admin not configured — add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your Vercel environment.",
            name: "AuthApiError",
            status: 500,
          } as AuthError,
        });
      }
      return supabase.auth.signInWithPassword({ email, password });
    },
    signOut: () => {
      if (!supabase) return Promise.resolve({ error: null });
      return supabase.auth.signOut();
    },
  }), [user, session, loading, supabase]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
