import { NextSeo } from 'next-seo'
import { useRouter } from 'next/compat/router'

function RefSEO({ title }) {
  const router = useRouter()

  const path = router.asPath.replace('crawlers/', '')

  return (
    <NextSeo
      title={title}
      openGraph={{
        title,
        url: `https://biobase.studio/docs${path}`,
        images: [
          {
            url: `https://biobase.studio/docs/img/biobase-og-image.png`,
          },
        ],
      }}
    />
  )
}

export default RefSEO
