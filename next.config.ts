import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Since we are doing a static export, ensure images are unoptimized if using next/image
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
