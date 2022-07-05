/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  images: {
    domains: ['d2ey9sqrvkqdfs.cloudfront.net'],
  },
};

module.exports = nextConfig;
