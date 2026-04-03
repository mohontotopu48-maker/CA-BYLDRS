import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: ["*"],
  // Vercel optimization: skip static page optimization for SPA
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
