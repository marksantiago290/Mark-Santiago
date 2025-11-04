/**
 * @type {import('next').NextConfig}
 */

const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: '../.env' })

const runtimeCaching = require("next-pwa/cache")

const withPWA = require('next-pwa')({
  dest: "public",
  runtimeCaching,
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  publicExcludes: ["!resume.pdf", "!robots.txt"]
})

module.exports = withPWA({
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload '
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ]
      },
      {
        source: '/fonts/Barlow/Barlow-400.woff2',
        headers: [
          {
            key: 'Cache-control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/fonts/Barlow/Barlow-500.woff2',
        headers: [
          {
            key: 'Cache-control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/fonts/Barlow/Barlow-600.woff2',
        headers: [
          {
            key: 'Cache-control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/fonts/Barlow/Barlow-700.woff2',
        headers: [
          {
            key: 'Cache-control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/fonts/Barlow/Barlow-800.woff2',
        headers: [
          {
            key: 'Cache-control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/fonts/Inter-var.woff2',
        headers: [
          {
            key: 'Cache-control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
      {
        source: '/fonts/Sarina/Sarina-400.woff2',
        headers: [
          {
            key: 'Cache-control',
            value: 'public, immutable, max-age=31536000',
          },
        ],
      },
    ]
  },
  generateBuildId: async () => {
    return 'marksantiago2909-build'
  },
  // swcMinify: true,
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'postimg.cc'
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc'
      },
      {
        protocol: 'https',
        hostname: 'media2.dev.to'
      },
      {
        protocol: 'https',
        hostname: 'github-readme-stats-one-bice.vercel.app'
      },
      {
        protocol: 'https',
        hostname: 'dev-to-uploads.s3.amazonaws.com'
      },
      {
        protocol: 'https',
        hostname: 'github-readme-streak-stats.herokuapp.com'
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  env: {
    BACKEND_API_BASE_URL: process.env.BACKEND_API_BASE_URL,
    BACKEND_API_TOKEN: process.env.BACKEND_API_TOKEN,
    GITH_ACCESS_TOKEN: process.env.GITH_ACCESS_TOKEN,
    EMAIL_JS_SERVICE_ID: process.env.EMAIL_JS_SERVICE_ID,
    EMAIL_JS_TEMPLATE_ID: process.env.EMAIL_JS_TEMPLATE_ID,
    EMAIL_JS_COMMENT_TEMPLATE_ID: process.env.EMAIL_JS_COMMENT_TEMPLATE_ID,
    EMAIL_JS_PUBLIC_KEY: process.env.EMAIL_JS_PUBLIC_KEY,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    GA_PROPERTY_ID: process.env.GA_PROPERTY_ID,
    GA_PROJECT_ID: process.env.GA_PROJECT_ID,
    GA_CLIENT_EMAIL: process.env.GA_CLIENT_EMAIL,
    GA_PRIVATE_KEY: process.env.GA_PRIVATE_KEY,
    DARKSTAR_GOOGLE_API_KEY: process.env.DARKSTAR_GOOGLE_API_KEY,
  }
})
