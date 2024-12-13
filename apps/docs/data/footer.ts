import { CheckCircle, FlaskConical, LifeBuoy } from 'lucide-react'
import { PrivacySettings } from 'ui-patterns/PrivacySettings'

export const primaryLinks = [
  {
    featherIcon: LifeBuoy,
    text: 'Need some help?',
    ctaLabel: 'Contact support',
    url: 'https://biobase.com/support',
  },
  {
    featherIcon: FlaskConical,
    text: 'Latest product updates?',
    ctaLabel: 'See Changelog',
    url: 'https://biobase.com/changelog',
  },
  {
    featherIcon: CheckCircle,
    text: "Something's not right?",
    ctaLabel: 'Check system status',
    url: 'https://status.biobase.com/',
  },
]

export const secondaryLinks = [
  {
    title: 'Contributing',
    url: 'https://github.com/biobase-ai/biobase/blob/master/apps/docs/DEVELOPERS.md',
  },
  {
    title: 'Author Styleguide',
    url: 'https://github.com/biobase-ai/biobase/blob/master/apps/docs/CONTRIBUTING.md',
  },
  { title: 'Open Source', url: 'https://biobase.com/open-source' },
  { title: 'SupaSquad', url: 'https://biobase.com/supasquad' },
  { title: 'Privacy Settings', component: PrivacySettings },
]
