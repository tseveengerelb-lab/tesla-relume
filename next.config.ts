import type { NextConfig } from "next";

// The static site served each page as a .html file; keep those links working.
const legacyPages = ["model-3", "model-y", "cybertruck", "roadster"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      ...legacyPages.map((slug) => ({
        source: `/${slug}.html`,
        destination: `/${slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
