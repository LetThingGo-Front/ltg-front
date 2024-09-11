/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://52.79.164.116/:path*',
      },
    ];
  },
};

export default nextConfig;
