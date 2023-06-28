/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    pageExtensions: ["tsx"],
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
