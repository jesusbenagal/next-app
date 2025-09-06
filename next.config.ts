// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [{ source: "/", destination: "/productos", permanent: true }];
  },
};

export default nextConfig;
