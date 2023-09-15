import path from 'path'

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@reservoir0x/reservoir-kit-ui', '@niftyapes/sdk'],
  webpack: (config) => {
    // Add alias for `wagmi`
    config.resolve.alias['wagmi'] = path.resolve('./node_modules/wagmi')
    // ... Add other aliases as needed

    // Return the modified config
    return config
  },
}

export default nextConfig
