import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typedRoutes: true,
  experimental: {
    typedEnv: true,
    turbopackFileSystemCacheForDev: true,
  },
}

export default nextConfig
