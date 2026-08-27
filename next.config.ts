import type { NextConfig } from "next";

// The existing Sites/Vinext build keeps its original server configuration.
// Only the dedicated GitHub Pages command exports a server-free website.
const nextConfig: NextConfig = process.env.PORTFOLIO_GITHUB_PAGES === "1"
  ? {
      output: "export",
      trailingSlash: true,
      images: { unoptimized: true },
      typescript: { tsconfigPath: "tsconfig.pages.json" },
    }
  : {};

export default nextConfig;
