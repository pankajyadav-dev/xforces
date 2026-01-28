import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages:["@repo/db"],
  reactCompiler: true,
};

export default nextConfig;
