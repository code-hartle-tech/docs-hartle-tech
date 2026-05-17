import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'HARTLE.TECH docs',
  description: 'Public engineering docs for HARTLE.TECH — architecture, integration guides, product overviews.',
  cleanUrls: true,
  appearance: 'dark',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#00e5ff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'HARTLE.TECH docs' }],
    ['meta', { property: 'og:image', content: 'https://docs.hartle.tech/og-card.svg' }],
  ],
  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'HARTLE.TECH · docs',
    nav: [
      { text: 'Guides', link: '/guides/' },
      { text: 'Architecture', link: '/architecture/' },
      { text: 'Products', link: '/products/' },
      { text: 'hartle.tech', link: 'https://hartle.tech' },
    ],
    sidebar: {
      '/guides/': [
        {
          text: 'Guides',
          items: [
            { text: 'Overview', link: '/guides/' },
            { text: 'Getting started', link: '/guides/getting-started' },
            { text: 'Contributing', link: '/guides/contributing' },
          ],
        },
      ],
      '/architecture/': [
        {
          text: 'Architecture',
          items: [
            { text: 'Overview', link: '/architecture/' },
            { text: 'GitOps + Flux', link: '/architecture/gitops' },
            { text: 'Identity (Authentik)', link: '/architecture/identity' },
            { text: 'Secrets (OpenBao)', link: '/architecture/secrets' },
          ],
        },
      ],
      '/products/': [
        {
          text: 'Products',
          items: [
            { text: 'Overview', link: '/products/' },
            { text: 'NearTrace', link: '/products/neartrace' },
            { text: 'Medusa', link: '/products/medusa' },
            { text: 'DumpSock', link: '/products/dumpsock' },
            { text: 'Nosferato', link: '/products/nosferato' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/code-hartle-tech' },
    ],
    footer: {
      message: 'Apache-2.0 · contact@hartle.tech',
      copyright: '© 2026 HARTLE.TECH (NIPC 518241327)',
    },
    search: { provider: 'local' },
    editLink: {
      pattern: 'https://github.com/code-hartle-tech/docs-hartle-tech/edit/main/docs/external/:path',
      text: 'Edit on GitHub',
    },
  },
})
