import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ngifengeshwvyzhqvprn.supabase.co",
      },
    ],
  },
};

export default nextConfig;
