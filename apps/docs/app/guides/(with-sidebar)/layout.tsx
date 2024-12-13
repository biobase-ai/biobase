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
  const { data, error } = await biobaseMisc()
    .from('partners')
    .select('slug, title')
    .eq('type', 'technology')
    .order('title')
  if (error) {
    console.error(new Error('Error fetching partners', { cause: error }))
  }

  return data ?? []
}

export default GuidesLayout
