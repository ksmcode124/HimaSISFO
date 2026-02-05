import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://ef40sz0w6l.ufs.sh/f/**'), new URL('https://utfs.io/**')],
    // domains: ['utfs.io'],
  },
};

export default nextConfig;
