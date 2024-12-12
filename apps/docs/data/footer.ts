import { CheckCircle, FlaskConical, LifeBuoy } from 'lucide-react'
import { PrivacySettings } from 'ui-patterns/PrivacySettings'

export const primaryLinks = [
  {
    featherIcon: LifeBuoy,
    text: 'Need some help?',
    ctaLabel: 'Contact support',
    url: 'https://biobase.studio/support',
  },
  {
    featherIcon: FlaskConical,
    text: 'Latest product updates?',
    ctaLabel: 'See Changelog',
    url: 'https://biobase.studio/changelog',
  },
  {
    featherIcon: CheckCircle,
    text: "Something's not right?",
    ctaLabel: 'Check system status',
    url: 'https://status.biobase.studio/',
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
  { title: 'Open Source', url: 'https://biobase.studio/open-source' },
  { title: 'SupaSquad', url: 'https://biobase.studio/supasquad' },
  { title: 'Privacy Settings', component: PrivacySettings },
]
