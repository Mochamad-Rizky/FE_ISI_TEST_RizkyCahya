import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  serverRuntimeConfig: {
    URI: process.env.NEXTSERVER_BASE_API,
  },
  publicRuntimeConfig: {
    URI: process.env.NEXT_PUBLIC_BASE_API,
  },
};

export default nextConfig;
