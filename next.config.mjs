/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {},
  // output: "standalone",
  output: process.env.NODE_ENV === "development" ? "standalone" : "export",
  basePath:
    process.env.NODE_ENV === "development"
      ? ""
      : process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix:
    process.env.NODE_ENV === "development"
      ? ""
      : process.env.NEXT_PUBLIC_BASE_PATH,
  trailingSlash: process.env.NODE_ENV === "development" ? false : true,
  images: {
    unoptimized: process.env.NODE_ENV === "development" ? false : true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
