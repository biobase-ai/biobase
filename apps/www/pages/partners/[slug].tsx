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
  // Special handling for build-time or sample partner
  if (params?.slug === 'sample-partner') {
    return {
      notFound: true,
    }
  }

  let { data: partner } = await biobase
    .from('partners')
    .select('*')
    .eq('approved', true)
    .eq('slug', params!.slug as string)
    .single()

  // If no partner found, return not found
  if (!partner) {
    return {
      notFound: true,
    }
  }

  // Determine redirect based on partner type
  let redirectUrl: string | null = null
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

  // Return redirect if a valid URL was generated
  if (redirectUrl) {
    return {
      redirect: {
        destination: redirectUrl,
        permanent: false,
      },
    }
  }

  // Fallback to not found if no redirect could be determined
  return {
    notFound: true,
  }
}

export default PartnerPage
