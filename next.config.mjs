/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // image.png is a user-provided local photo; no remote optimization needed.
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
