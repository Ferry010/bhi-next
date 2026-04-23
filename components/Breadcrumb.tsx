import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

export default function Breadcrumb({ items, variant = "light" }: { items: BreadcrumbItem[]; variant?: "light" | "dark" }) {
  const allItems = [{ label: "Home", to: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.to ? { item: `https://brandhumanizing.com${item.to}` } : {}),
    })),
  };

  const isDark = variant === "dark";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className={`flex items-center gap-1.5 text-sm ${isDark ? "text-primary-foreground/50" : "text-text-light"}`}>
          {allItems.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3.5 h-3.5" />}
              {item.to && i < allItems.length - 1 ? (
                <Link href={item.to} className={`transition-colors ${isDark ? "hover:text-primary-foreground" : "hover:text-foreground"}`}>
                  {item.label}
                </Link>
              ) : (
                <span className={`font-medium ${isDark ? "text-primary-foreground/80" : "text-foreground"}`}>{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
