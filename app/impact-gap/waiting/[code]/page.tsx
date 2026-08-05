"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// The waiting page folded into the leader's dashboard.
//
// There used to be three places a leader could be: a share page, a waiting
// page and a report. That is three links to lose and two states to explain.
// Now there is one dashboard that changes as replies arrive, and this route
// exists only so that a link someone bookmarked earlier still lands somewhere
// sensible.

export default function WaitingRedirectPage({ params }: { params: { code: string } }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/impact-gap/share/${params.code}`);
  }, [params.code, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <p role="status" className="text-body-lg text-muted-foreground">
        Taking you to your dashboard…
      </p>
    </main>
  );
}
