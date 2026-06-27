/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
}

module.exports = nextConfig
