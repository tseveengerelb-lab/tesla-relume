import type { NextConfig } from "next";

// The static site served each page as a .html file; keep those links working.
const legacyPages = ["model-3", "model-y", "cybertruck", "roadster"];

const nextConfig: NextConfig = {
  images: {
    // Card images uploaded from /admin live in Supabase Storage.
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
  experimental: {
    serverActions: {
      // /admin uploads card images through a Server Action: 5MB file + form overhead.
      bodySizeLimit: "6mb",
    },
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
