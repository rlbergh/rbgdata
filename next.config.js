/** @type {import('next').NextConfig} */
const nextConfig = {
  // For GitHub Pages deployment
  output: 'export',
  basePath: '',
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        default: false,
        vendors: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
