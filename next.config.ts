import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    "preview-chat-ad89e6cd-be46-4931-83c2-5212da3d4d3b.space.z.ai",
    "*.space.z.ai",
  ],
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
