import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
//     custom image domains here
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
                pathname: '/**'
            },
        ],
    },

};

export default nextConfig;
