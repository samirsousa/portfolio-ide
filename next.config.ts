import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
   basePath: '/nome-do-seu-repositorio',
};

export default nextConfig;