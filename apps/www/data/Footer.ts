import { PrivacySettings } from 'ui-patterns/PrivacySettings'

const footerData = [
  {
    title: 'Product',
    links: [
      {
        text: 'Database',
        url: '/database',
      },
      {
        text: 'Auth',
        url: '/auth',
      },
      {
        text: 'Functions',
        url: '/edge-functions',
      },
      {
        text: 'Realtime',
        url: '/realtime',
      },
      {
        text: 'Storage',
        url: '/storage',
      },
      {
        text: 'Vector',
        url: '/vector',
      },
      {
        text: 'Pricing',
        url: '/pricing',
      },
      {
        text: 'GA Week',
        url: '/ga-week',
      },
    ],
  },
  {
    title: 'Resources',
    links: [
      {
        text: 'Support',
        url: '/support',
      },
      {
        text: 'System Status',
        url: 'https://status.biobase.studio/',
      },
      {
        text: 'Become a Partner',
        url: '/partners',
      },
      {
        text: 'Integrations',
        url: '/partners/integrations',
      },
      {
        text: 'Experts',
        url: '/partners/experts',
      },
      {
        text: 'Brand Assets / Logos',
        url: '/brand-assets',
      },
      {
        text: 'Security and Compliance',
        url: '/security',
      },
      {
        text: 'DPA',
        url: '/legal/dpa',
      },
      {
        text: 'SOC2',
        url: '/security',
      },
      {
        text: 'HIPAA',
        url: 'https://forms.biobase.studio/hipaa2',
      },
    ],
  },
  {
    title: 'Developers',
    links: [
      {
        text: 'Documentation',
        url: '/docs',
      },
      {
        text: 'Changelog',
        url: '/changelog',
      },
      {
        text: 'Contributing',
        url: 'https://github.com/biobase-ai/biobase/blob/master/CONTRIBUTING.md',
      },
      {
        text: 'Open Source',
        url: '/open-source',
      },
      {
        text: 'SupaSquad',
        url: '/supasquad',
      },
      {
        text: 'DevTo',
        url: 'https://dev.to/biobase',
      },
      {
        text: 'RSS',
        url: '/rss.xml',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      {
        text: 'Blog',
        url: '/blog',
      },
      {
        text: 'Customer Stories',
        url: '/customers',
      },
      {
        text: 'Careers',
        url: '/careers',
      },
      {
        text: 'Company',
        url: '/company',
      },
      {
        text: 'Events & Webinars',
        url: '/events',
      },
      {
        text: 'General Availability',
        url: '/ga',
      },
      {
        text: 'Terms of Service',
        url: '/terms',
      },
      {
        text: 'Privacy Policy',
        url: '/privacy',
      },
      {
        text: 'Privacy Settings',
        component: PrivacySettings,
      },
      {
        text: 'Acceptable Use Policy',
        url: '/aup',
      },
      {
        text: 'Support Policy',
        url: '/support-policy',
      },
      {
        text: 'Service Level Agreement',
        url: '/sla',
      },
      {
        text: 'Humans.txt',
        url: '/humans.txt',
      },
      {
        text: 'Lawyers.txt',
        url: '/lawyers.txt',
      },
      {
        text: 'Security.txt',
        url: '/.well-known/security.txt',
      },
    ],
  },
]

export default footerData
