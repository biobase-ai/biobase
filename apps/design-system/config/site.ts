export const siteConfig = {
  name: 'Biobase Design System',
  url: 'https://biobase.studio/design-system',
  ogImage: 'https://biobase.studio/design-system/og.jpg',
  description: 'Design System of Biobase',
  links: {
    twitter: 'https://twitter.com/biobase',
    github: 'https://github.com/biobase-ai/biobase/tree/master/apps/design-system',
    credits: {
      radix: 'https://www.radix-ui.com/themes/docs/overview/getting-started',
      shadcn: 'https://ui.shadcn.com/',
      geist: 'https://vercel.com/geist/introduction',
    },
  },
}

export type SiteConfig = typeof siteConfig
