import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
//     custom image domains here
    experimental: {
        useDeploymentId: true,
        // Optionally, use with Server Actions
        useDeploymentIdServerActions: true,
    },
    images: {
        remotePatterns: [
            // {
            //     protocol: 'https',
            //     hostname: 'picsum.photos',
            //     pathname: '/**',
            // },
            {
                protocol: 'https',
                hostname: '**',
                pathname: '/**'
            },
        ],
    },

};

export default nextConfig;
