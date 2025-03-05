import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'images.metmuseum.org',
            pathname: '**',
        }
    ]
}
};

export default nextConfig;
