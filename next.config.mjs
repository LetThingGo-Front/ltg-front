/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://api.letthinggo.com/:path*',
      },
    ];
  },
};

export default nextConfig;
