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

  if (!partner || partner.type === 'expert' || process.env.npm_lifecycle_event === 'build') {
    return {
      notFound: true,
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: `/partners/integrations/${partner.slug}`,
    },
  }
}

export default PartnerPage
