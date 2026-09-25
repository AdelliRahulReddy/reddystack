/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/service/mobile-apps',
        destination: '/service/applications',
        permanent: true,
      },
      {
        source: '/service/mvp-building',
        destination: '/service/mvp-builds',
        permanent: true,
      },
      {
        source: '/blog-details-2',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/website-development-services',
        destination: '/website-development',
        permanent: true,
      },
      {
        source: '/mobile-app-development-services',
        destination: '/app-development',
        permanent: true,
      },
      {
        source: '/seo-website-development-for-small-businesses',
        destination: '/seo-services',
        permanent: true,
      },
      {
        source: '/ai-automation-services-for-small-teams',
        destination: '/ai-automation',
        permanent: true,
      },
      {
        source: '/website-maintenance-services',
        destination: '/website-development',
        permanent: true,
      },
      {
        source: '/social-media-marketing',
        destination: '/service',
        permanent: true,
      },
      {
        source: '/blog-details',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog-sidebar',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/portfolio-details',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/service-details',
        destination: '/service',
        permanent: true,
      },
    ];
  },

}

module.exports = nextConfig
