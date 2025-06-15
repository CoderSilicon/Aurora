import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    domains: ['img.clerk.com'], // ✅ Add this
  },
};

export default nextConfig;
