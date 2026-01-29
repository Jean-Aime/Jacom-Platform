/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    optimizeCss: true
  },
  compress: true,
  poweredByHeader: false
};

module.exports = nextConfig;
