import type { NextConfig } from "next";

// Preview builds live under a sub-path (e.g. PREVIEW_BASE_PATH=/preview)
const previewBasePath = process.env.PREVIEW_BASE_PATH;

const nextConfig: NextConfig = {
  output: "export",
  ...(previewBasePath && {
    basePath: previewBasePath,
    env: { NEXT_PUBLIC_BASE_PATH: previewBasePath },
  }),
  images: {
    // next/image doesn't prefix basePath onto local src — a custom loader does
    ...(previewBasePath
      ? { loader: "custom" as const, loaderFile: "./lib/image-loader.ts" }
      : { unoptimized: true }),
  },
};

export default nextConfig;
