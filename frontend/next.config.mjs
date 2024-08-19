/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'readymadeui.com',
      }
    ],
  },
  // i18n: {
  //   locales: ['ko', 'en'],
  //   defaultLocale: 'ko',
  // },
}

export default nextConfig;