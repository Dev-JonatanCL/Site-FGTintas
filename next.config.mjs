/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.STANDALONE === 'true' ? 'standalone' : undefined,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
