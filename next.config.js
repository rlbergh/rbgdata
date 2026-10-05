/** @type {import('next').NextConfig} */
const nextConfig = {
  // For GitHub Pages deployment
  output: 'export',
  basePath: '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
