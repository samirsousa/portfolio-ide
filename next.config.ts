import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/portfolio-ide',
  assetPrefix: '/portfolio-ide',
};

export default nextConfig;