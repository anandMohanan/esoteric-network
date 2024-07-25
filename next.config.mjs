import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@node-rs/argon2"]
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
