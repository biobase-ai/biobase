import { type PropsWithChildren } from 'react'

import { biobaseMisc } from '~/lib/biobaseMisc'
import Layout from '~/layouts/guides'

const GuidesLayout = async ({ children }: PropsWithChildren) => {
  const partners = await getPartners()
  const partnerNavItems = partners.map((partner) => ({
    name: partner.title,
    url: `https://biobase.studio/partners/integrations/${partner.slug}` as `https://${string}`,
  }))

  return <Layout additionalNavItems={partnerNavItems}>{children}</Layout>
}

async function getPartners() {
  // Only try to fetch if not in build environment
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'build') {
    console.log('Skipping real partner fetch during build, using mock data instead');
    return [
      { slug: 'mock-partner-1', title: 'Mock Partner 1' },
      { slug: 'mock-partner-2', title: 'Mock Partner 2' },
    ];
  }

  try {
    const { data, error } = await biobaseMisc()
      .from('partners')
      .select('slug, title')
      .eq('type', 'technology')
      .order('title')
    if (error) {
      console.error(new Error('Error fetching partners', { cause: error }))
      // Fallback to mock data if fetch fails
      return [
        { slug: 'mock-partner-1', title: 'Mock Partner 1' },
        { slug: 'mock-partner-2', title: 'Mock Partner 2' },
      ];
    }

    return data ?? []
  } catch (err) {
    console.error(new Error('Error fetching partners', { cause: err }))
    // Fallback to mock data if fetch fails
    return [
      { slug: 'mock-partner-1', title: 'Mock Partner 1' },
      { slug: 'mock-partner-2', title: 'Mock Partner 2' },
    ];
  }
}

export default GuidesLayout
