import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [480, 640, 828, 1080, 1280, 1600, 1920, 2400],
  },
};

export default nextConfig;
