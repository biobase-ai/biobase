import '@code-hike/mdx/styles'
import 'config/code-hike.scss'
import '../styles/main.scss'
import '../styles/new-docs.scss'
import '../styles/prism-okaidia.scss'

import { type Metadata, type Viewport } from 'next'

import { genFaviconData } from 'common/MetaFavicons/app-router'

import { GlobalProviders } from '~/features/app.providers'
import { TopNavSkeleton } from '~/layouts/MainSkeleton'
import { BASE_PATH, IS_PRODUCTION } from '~/lib/constants'

const metadata: Metadata = {
  applicationName: 'Biobase Docs',
  title: 'Biobase Docs',
  description:
    'Biobase is an open source Firebase alternative providing all the backend features you need to build a product.',
  metadataBase: new URL('https://biobase.studio'),
  icons: genFaviconData(BASE_PATH),
  robots: {
    index: IS_PRODUCTION,
    follow: IS_PRODUCTION,
  },
  openGraph: {
    type: 'article',
    authors: 'Biobase',
    url: `${BASE_PATH}`,
    images: `${BASE_PATH}/img/biobase-og-image.png`,
    publishedTime: new Date().toISOString(),
    modifiedTime: new Date().toISOString(),
  },
  twitter: {
    card: 'summary_large_image',
    site: '@biobase',
    creator: '@biobase',
    images: `${BASE_PATH}/img/biobase-og-image.png`,
  },
}

const viewport: Viewport = {
  themeColor: '#1E1E1E',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <GlobalProviders>
          <TopNavSkeleton>{children}</TopNavSkeleton>
        </GlobalProviders>
      </body>
    </html>
  )
}

export { metadata, viewport }
export default RootLayout
