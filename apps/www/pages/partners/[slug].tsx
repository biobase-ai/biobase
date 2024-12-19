import { GetStaticPaths, GetStaticProps } from 'next'
import biobase from '~/lib/biobaseMisc'
import Error404 from '../404'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function PartnerPage({ partner, redirectTo }: { partner: Partner, redirectTo: string }) {
  const router = useRouter()

  useEffect(() => {
    if (redirectTo) {
      router.replace(redirectTo)
    }
  }, [redirectTo, router])

  // Show a loading state or return null while redirecting
  return null
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

  if (!partner || process.env.npm_lifecycle_event === 'build') {
    return {
      notFound: true,
    }
  }

  // Instead of redirecting during build time, we'll return the partner data
  // and handle the redirect on the client side
  return {
    props: {
      partner,
      redirectTo: partner.type === 'technology' 
        ? `/partners/integrations/${partner.slug}`
        : `/partners/experts/${partner.slug}`,
    },
  }
}

export default PartnerPage
