const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  transpilePackages: ['common', 'ui', 'ui-patterns', 'shared-data', 'icons', 'ai-commands'],
  typescript: {
    // We'll handle type checking in a separate process
    ignoreBuildErrors: true,
  },
  eslint: {
    // We'll handle linting in a separate process
    ignoreDuringBuilds: true,
  },
  // Optimize serverless function size
  experimental: {
    outputFileTracingRoot: __dirname,
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/linux-x64',
        '.contentlayer',
        'public',
        '_blog',
        'node_modules/next/dist/compiled/@ampproject/toolbox-optimizer/**/*',
        'node_modules/next/dist/server/lib/squoosh/**/*.wasm',
        'node_modules/sharp/**/*',
      ],
    },
  },
  // Exclude large dependencies from serverless functions
  webpack: (config, { isServer, dev }) => {
    if (isServer) {
      // Mark certain large packages as external to reduce bundle size
      config.externals.push('sharp', '@code-hike/lighter')
    }

    // Add support for TypeScript files in workspace packages
    config.module.rules.push({
      test: /\.(tsx|ts)$/,
      include: [/packages\/.*\/src/, /packages\/.*\/lib/, /packages\/.*\/.*/],
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
            plugins: [
              ['@babel/plugin-transform-runtime', { 
                regenerator: true,
                helpers: true,
                useESModules: !isServer
              }]
            ]
          },
        },
      ],
    })

    // Handle Edge Runtime compatibility
    config.resolve.alias = {
      ...config.resolve.alias,
      'ajv/dist/compile/codegen': require.resolve('ajv/dist/compile/codegen'),
    }

    // Disable nomodule polyfills
    if (config.name === 'client') {
      config.optimization.moduleIds = 'named'
      config.plugins = config.plugins.filter(
        (plugin) => plugin.constructor.name !== 'NoModulePolyfillPlugin'
      )
    }

    return config
  },
}

module.exports = withContentlayer(nextConfig) 