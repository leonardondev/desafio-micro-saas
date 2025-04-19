import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**/*',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**/*',
      },
    ],
  },
}

export default nextConfig

// lh3.googleusercontent.com/a/ACg8ocKsVAcZBAYAOkAPNNl49yALYH75h9s4v7jgXzIUC_2rnaQHpWA1=s96-c
