import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@node-rs/argon2"]
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    remotePatterns: [
        {
            protocol: "https",
            hostname: "blob.vercel.app",
        },
    ],
};

export default nextConfig;
