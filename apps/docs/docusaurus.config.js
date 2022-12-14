/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'AutoRepl docs',
  tagline: 'Get to AutoRepl next level with its documentation',
  url: 'https://docs.autorepl.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.webp',
  organizationName: 'AutoRepl', // Usually your GitHub org/user name.
  themeConfig: {
    navbar: {
      title: 'AutoRepl',
      logo: {
        alt: 'AutoRepl Logo',
        src: 'img/logo.webp',
      },
      items: [],
    },

    footer: {
      links: [
        {
          title: 'Product',
          items: [
            {
              label: 'Homepage',
              to: 'https://www.autorepl.com',
            },
            {
              label: 'Roadmap',
              to: 'https://app.autorepl.com/feedback',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/getautorepl',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/autorepl/?viewAsMember=true',
            },
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/getautorepl/',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'Terms of Service',
              href: 'https://www.autorepl.com/terms-of-service',
            },
            {
              label: 'Privacy Policy',
              href: 'https://www.autorepl.com/privacy-policies',
            },
          ],
        },
      ],
    },
    colorMode: {
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
