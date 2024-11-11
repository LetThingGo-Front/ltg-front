/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/v1/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_MOCKING === "enabled" ? "http://localhost:9090/v1/:path*" : "https://api.letthinggo.com/v1/:path*"}`,
      },
    ];
  },
};

export default nextConfig;
