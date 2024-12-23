import '@code-hike/mdx/styles'
import 'config/code-hike.scss'
import '../styles/index.css'

import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { AuthProvider, IS_PROD, ThemeProvider, useTelemetryProps, useThemeSandbox } from 'common'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SonnerToaster, themes } from 'ui'
import { CommandProvider } from 'ui-patterns/CommandMenu'
import { useConsent } from 'ui-patterns/ConsentToast'

import MetaFaviconsPagesRouter, {
  DEFAULT_FAVICON_ROUTE,
  DEFAULT_FAVICON_THEME_COLOR,
} from 'common/MetaFavicons/pages-router'
import { WwwCommandMenu } from '~/components/CommandMenu'
import { API_URL, APP_NAME, DEFAULT_META_DESCRIPTION, IS_PREVIEW } from '~/lib/constants'
import { post } from '~/lib/fetchWrapper'
import supabase from '~/lib/biobase'
import useDarkLaunchWeeks from '../hooks/useDarkLaunchWeeks'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const telemetryProps = useTelemetryProps()
  const { consentValue, hasAcceptedConsent } = useConsent()
  const IS_DEV = !IS_PROD && !IS_PREVIEW
  const blockEvents = IS_DEV || !hasAcceptedConsent

  useThemeSandbox()

  function handlePageTelemetry(route: string) {
    return post(`${API_URL}/telemetry/page`, {
      referrer: document.referrer,
      title: document.title,
      route,
      ga: {
        screen_resolution: telemetryProps?.screenResolution,
        language: telemetryProps?.language,
      },
    })
  }

  useEffect(() => {
    if (blockEvents) return

    function handleRouteChange(url: string) {
      handlePageTelemetry(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, blockEvents])

  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="description" content={DEFAULT_META_DESCRIPTION} />
        <MetaFaviconsPagesRouter 
          route={DEFAULT_FAVICON_ROUTE} 
          themeColor={DEFAULT_FAVICON_THEME_COLOR} 
        />
      </Head>
      <ThemeProvider>
        <AuthProvider>
          <SessionContextProvider supabaseClient={supabase}>
            <CommandProvider>
              <WwwCommandMenu />
              <Component {...pageProps} />
              <SonnerToaster />
            </CommandProvider>
          </SessionContextProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}
