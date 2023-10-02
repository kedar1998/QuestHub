/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    mdxRs: true,
    serverComponentsExternalPackage: ["mongoose"],
  },
};

module.exports = nextConfig;
