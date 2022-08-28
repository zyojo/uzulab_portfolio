/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ryotanakahara.jp', 'images.microcms-assets.io'],
  },
}

module.exports = nextConfig
