/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'media.easy.com.ar',
          },
        ],
      },
}

module.exports = nextConfig
