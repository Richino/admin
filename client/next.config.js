/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "shoe-store-application.s3.amazonaws.com",
            "images.unsplash.com","shoe-store-application.s3.us-east-1.amazonaws.com"
        ],
    },
};

module.exports = nextConfig;
