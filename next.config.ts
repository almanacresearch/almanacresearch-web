import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://almanacresearch.com"
      : undefined,
};

export default nextConfig;
