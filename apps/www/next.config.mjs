import { getAllTags } from './lib/posts.js'
import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
    unoptimized: true,
  },
  transpilePackages: ['common', 'ui', 'ui-patterns', 'shared-data', 'icons', 'ai-commands'],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  distDir: '.next',
  experimental: {
    outputFileTracingRoot: process.cwd(),
    outputFileTracingIncludes: {
      '**/*.{js,json,jsx,ts,tsx}': ['**/*'],
    },
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/linux-x64',
        '.next/cache/**/*',
        '.next/server/chunks/**/*',
        '.next/static/**/*',
      ],
    }
  }
}

export default withContentlayer(nextConfig)
