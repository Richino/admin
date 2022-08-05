/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "shoe-store-application.s3.amazonaws.com",
            "images.unsplash.com",
            "shoe-store-application.s3.us-east-1.amazonaws.com",
            "firebasestorage.googleapis.com",
            "d8g6c3ka3kwgo.cloudfront.net",
        ],
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/dashboard/overview",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
