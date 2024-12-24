const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'github.com', 'wwzkoeobldwlepkiekcy.supabase.co'],
  },
  webpack: (config, { dev, isServer }) => {
    // Fix cache invalidation issues
    config.snapshot = {
      ...(config.snapshot ?? {}),
      managedPaths: [/^(.+?[\\/]node_modules[\\/])/],
      immutablePaths: [],
      buildDependencies: {
        config: [__filename],
      },
    }

    // Fix sql-formatter dependency issue
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'get-stdin': false,
    }

    return config
  },
}

module.exports = withContentlayer(nextConfig) 