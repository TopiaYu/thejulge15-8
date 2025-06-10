import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/**')],
  },
};

export default nextConfig;
