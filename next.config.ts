import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Uncomment if deploying to username.github.io/repo-name (not a custom domain):
  // basePath: "/your-repo-name",
  // assetPrefix: "/your-repo-name/",
};

export default nextConfig;
