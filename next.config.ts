import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",

  // Redirect non-www requests to the www domain
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "almanacresearch.com",
          },
        ],
        destination: "https://www.almanacresearch.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
