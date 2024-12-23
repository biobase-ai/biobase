import { GetStaticPaths, GetStaticProps } from 'next'
import biobase from '~/lib/biobaseMisc'
import Error404 from '../404'

function PartnerPage() {
  // Should be redirected to ./experts/:slug or ./integrations/:slug
  return <Error404 />
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const { data: slugs } = await biobase.from('partners').select('slug')

  const paths: {
    params: { slug: string }
    locale?: string | undefined
  }[] =
    slugs?.map(({ slug }) => ({
      params: {
        slug,
      },
    })) ?? []

  return {
    paths,
    fallback: 'blocking',
  }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  let { data: partner } = await biobase
    .from('partners')
    .select('*')
    .eq('approved', true)
    .eq('slug', params!.slug as string)
    .single()

  // During build time, return notFound for sample-partner
  if (params?.slug === 'sample-partner' || !partner) {
    return {
      notFound: true,
    }
  }

  // For actual partners, return the redirect
  let redirectUrl: string
  switch (partner.type) {
    case 'technology':
      redirectUrl = `/partners/integrations/${partner.slug}`
      break
    case 'expert':
      redirectUrl = `/partners/experts/${partner.slug}`
      break
    default:
      return {
        notFound: true,
      }
  }

  return {
    redirect: {
      destination: redirectUrl,
      permanent: false,
    },
  }
}

export default PartnerPage
