import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://ef40sz0w6l.ufs.sh/f/**')], //agar bisa load gambar dari github
    domains: ['utfs.io'], // agar bisa load gambar dari uploadthing
  },
};

export default nextConfig;
