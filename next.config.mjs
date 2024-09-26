/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrite() {
    return [
      {
        source: '/:path*',
        destination: 'https://api.letthinggo.com/:path*',
      },
    ];
  },
};

export default nextConfig;
