import type { NextConfig } from "next";

// The static site served each page as a .html file; keep those links working.
const legacyPages = ["model-3", "model-y", "cybertruck", "roadster"];

const nextConfig: NextConfig = {
  images: {
    // Card images may later be uploaded to Supabase Storage.
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
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
