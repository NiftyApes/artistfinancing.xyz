import path from 'path'

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@reservoir0x/reservoir-kit-ui', '@niftyapes/sdk'],
  webpack: (config) => {
    // Add alias for `wagmi`, `@wagmi/core`, and any other peer dependencies
    config.resolve.alias['wagmi'] = path.resolve('./node_modules/wagmi')
    config.resolve.alias['@wagmi/core'] = path.resolve(
      './node_modules/@wagmi/core'
    )
    // ... Add other aliases as needed

    // Return the modified config
    return config
  },
}

export default nextConfig
