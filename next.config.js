/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "revphlo.com" }],
        destination: "https://www.revphlo.com/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
