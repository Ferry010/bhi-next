"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function useNewSubmissionsCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      const supabase = createSupabaseBrowserClient();
      const { count: newCount } = await supabase
        .from("form_submissions")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");
      setCount(newCount || 0);
    };
    load();
  }, []);

  const markSeen = () => {
    setCount(0);
  };

  return { count, markSeen };
}
