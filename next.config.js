// Baseline security headers applied to every route. Intentionally NO
// Content-Security-Policy here: a strict CSP has to be built and tested against
// this app's inline scripts, fonts, images and Supabase calls, and a wrong one
// silently breaks the site. Add it separately once it can be verified.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // HSTS without includeSubDomains/preload on purpose: those are hard to undo
  // and would over-commit any subdomain. Widen later if every subdomain is HTTPS.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't advertise the framework.
  poweredByHeader: false,
  images: {
    // The app uses plain <img>, not next/image, so the image optimizer needs no
    // remote hosts. An empty list closes the /_next/image endpoint to arbitrary
    // remote URLs (an open-proxy / SSRF surface) while local images still work.
    // If you ever adopt next/image with remote sources, add those exact hosts here.
    remotePatterns: [],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Prevent server-side bundling of browser-only packages
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    return config;
  },
  async redirects() {
    return [
      // /pricing merged into /learning (the single training offer page). The old
      // page file is kept for reference but is never reached because of this 301.
      { source: "/pricing", destination: "/learning", permanent: true },
      // The old skill self-assessment was replaced by the levels test.
      { source: "/assessment", destination: "/start", permanent: true },
      { source: "/learning/half-day-workshop", destination: "/learning", permanent: true },
      { source: "/learning/full-day-training", destination: "/learning/full-day-course", permanent: true },
      // The public offer is four levels (lib/pricing LEVELS). The old 5-step
      // project path and the coming-soon online course are parked: their page
      // files stay, but visitors land on the level that replaced them. Temporary
      // (307) on purpose, so they can be brought back without cached redirects.
      { source: "/work-with-us/inspiration-session", destination: "/learning/inspiration-session", permanent: true },
      { source: "/work-with-us", destination: "/taskforce", permanent: false },
      { source: "/work-with-us/:path*", destination: "/taskforce", permanent: false },
      { source: "/project", destination: "/taskforce", permanent: false },
      { source: "/learning/online-course", destination: "/learning", permanent: false },
      { source: "/humanfingerprint", destination: "/humantouch", permanent: true },
      { source: "/humanfingerprint/v/:token", destination: "/humantouch", permanent: true },
    ];
  },
};

module.exports = nextConfig;
