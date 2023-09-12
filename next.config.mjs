/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@reservoir0x/reservoir-kit-ui', '@niftyapes/sdk'],
  webpack: (config) => {
    config.cache.buildDependencies.mydeps = ['./yalc.lock']
    config.snapshot = {
      managedPaths: [/^(.+?[\\/]node_modules)[\\/]((?!@niftyapes)).*[\\/]*/],
    }
    return config
  },
}

export default nextConfig
