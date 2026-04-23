/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      { source: "/learning/half-day-workshop", destination: "/learning", permanent: true },
      { source: "/learning/full-day-training", destination: "/learning/full-day-course", permanent: true },
      { source: "/work-with-us/human-technology-fit-audit", destination: "/work-with-us/audit-and-brainstorm", permanent: true },
      { source: "/work-with-us/customer-journey-humanizing", destination: "/work-with-us", permanent: true },
      { source: "/project", destination: "/work-with-us", permanent: true },
      { source: "/humanfingerprint", destination: "/humantouch", permanent: true },
      { source: "/humanfingerprint/v/:token", destination: "/humantouch", permanent: true },
    ];
  },
};

module.exports = nextConfig;
