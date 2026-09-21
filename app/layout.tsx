import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  metadataBase: new URL("https://brandhumanizing.com"),
  title: {
    default: "Brand Humanizing Institute | Human Edge in a Digital World",
    template: "%s | Brand Humanizing Institute",
  },
  description: "We help organizations use technology to become more human, not less. Research, training, and consulting in AI literacy, creativity, human sciences, and ethics.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://brandhumanizing.com",
    siteName: "Brand Humanizing Institute",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
