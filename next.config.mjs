/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://letthinggo.duckdns.org/:path*',
      },
    ];
  },
};

export default nextConfig;
