const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

module.exports = withStoreConfig({
  features: store.features,
  reactStrictMode: true,
  compress: true,
  async rewrites() {
    return [
      {
        source: '/.well-known/pki-validation/B5F9FC9EA83F99C8A56EAEF85BB6C7D9.txt',
        destination: '/api/validate'
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap'
      },
      {
        source: '/account/cart/details',
        destination: '/cart/details'
      },
      {
        source: '/robots.txt',
        destination: '/api/robots'
      },
      {
        source: '/blog/:path*',
        destination: 'https://blog.fiercefightgear.com/:path*'
      },
    ]
  },
  images: {
    domains: [
      "medusa-public-images.s3.eu-west-1.amazonaws.com",
      'fiercefightgear.nyc3.digitaloceanspaces.com',
      'blog.fiercefightgear.com',
      "localhost"
    ],
  },
})

