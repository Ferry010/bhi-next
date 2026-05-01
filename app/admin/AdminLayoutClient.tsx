"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAdminAccess } from "@/hooks/useAdminAccess";
import { useNewSubmissionsCount } from "@/hooks/useNewSubmissionsCount";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut, PenSquare, Settings, Inbox, ChevronLeft, ChevronRight, Users, FileJson } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Posts" },
  { to: "/admin/posts/new", icon: PenSquare, label: "New Post" },
  { to: "/admin/blog/import-json", icon: FileJson, label: "Import JSON" },
  { to: "/admin/forms", icon: Inbox, label: "Inbox", badge: true },
  { to: "/admin/members", icon: Users, label: "Members" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

function AdminSidebar() {
  const { isAdmin, loading, signOut } = useAdminAccess();
  const { count, markSeen } = useNewSubmissionsCount();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/forms") markSeen();
  }, [pathname, markSeen]);

  if (loading || !isAdmin) return null;

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen flex flex-col border-r border-border bg-card transition-all duration-200",
        collapsed ? "w-16" : "w-56"
      )}
    >
      <div className="h-14 flex items-center px-4 border-b border-border">
        {!collapsed && (
          <span className="font-heading font-bold text-sm tracking-tight text-foreground truncate">
            Brand Humanizing
          </span>
        )}
      </div>

      <nav className="flex-1 py-3 px-2 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.to ||
            (item.to === "/admin/dashboard" && pathname.startsWith("/admin/posts/"));
          return (
            <Link key={item.to} href={item.to}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative",
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
                {item.badge && count > 0 && (
                  <span
                    className={cn(
                      "flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold",
                      collapsed
                        ? "absolute -top-1 -right-1 w-4 h-4"
                        : "ml-auto min-w-[20px] h-5 px-1.5"
                    )}
                    style={{ boxShadow: "0 0 8px hsl(185 30% 46% / 0.4)" }}
                  >
                    {count > 99 ? "99+" : count}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-2 space-y-1">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors w-full"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-1.5 text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAdminAccess();
  const router = useRouter();
  const pathname = usePathname();
  const [loadingTooLong, setLoadingTooLong] = useState(false);

  useEffect(() => {
    if (!loading) { setLoadingTooLong(false); return; }
    const t = setTimeout(() => setLoadingTooLong(true), 12000);
    return () => clearTimeout(t);
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      if (!user || !isAdmin) {
        if (pathname !== "/admin") router.replace("/admin");
      }
    }
  }, [loading, user, isAdmin, pathname, router]);

  if (loading) {
    return (
      <div className="admin-dark min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        {loadingTooLong ? (
          <div className="text-center space-y-3 px-4">
            <p className="text-muted-foreground text-sm">Auth check is taking too long.</p>
            <button
              onClick={() => router.replace("/admin")}
              className="text-sm text-primary underline underline-offset-2"
            >
              Return to login
            </button>
          </div>
        ) : (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        )}
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <div className="admin-dark min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="admin-dark min-h-screen flex bg-background text-foreground">
      <AdminSidebar />
      <main className="flex-1 min-h-screen overflow-auto">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
