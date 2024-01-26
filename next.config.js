/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wonski.notion.site",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
