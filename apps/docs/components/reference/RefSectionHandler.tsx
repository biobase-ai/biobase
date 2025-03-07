import { useRouter } from 'next/compat/router'
import Head from 'next/head'
import { useEffect } from 'react'

import { type MenuId } from '~/components/Navigation/NavigationMenu/NavigationMenu'
import RefEducationSection from '~/components/reference/RefEducationSection'
import RefFunctionSection from '~/components/reference/RefFunctionSection'

import RefSubLayout from '~/layouts/ref/RefSubLayout'
import ApiOperationSection from './ApiOperationSection'
import CliCommandSection from './CLICommandSection'
import OldVersionAlert from './OldVersionAlert'
import type { IAPISpec, ICommonSection, IRefStaticDoc, ISpec, TypeSpec } from './Reference.types'
import { SidebarSkeleton, TopNavSkeleton } from '~/layouts/MainSkeleton'
import MgmtApiOperationSection from '~/components/reference/MgmtApiOperationSection'

interface RefSectionHandlerProps {
  sections: ICommonSection[]
  spec?: ISpec | IAPISpec
  typeSpec?: TypeSpec
  pageProps: { docs: IRefStaticDoc[] }
  type: 'client-lib' | 'cli' | 'api' | 'mgmt-api'
  isOldVersion?: boolean
  menuId: MenuId
}

const RefSectionHandler = (props: RefSectionHandlerProps) => {
  const router = useRouter()

  const [slug] = router.query.slug

  // When user lands on a url like http://biobase.studio/docs/reference/javascript/sign-up
  // find the #sign-up element and scroll to that
  useEffect(() => {
    document.getElementById(slug)?.scrollIntoView()
  }, [slug])

  useEffect(() => {
    function handler() {
      const [slug] = window.location.pathname.split('/').slice(-1)
      document.getElementById(slug)?.scrollIntoView()
    }

    window.addEventListener('popstate', handler)

    return () => {
      window.removeEventListener('popstate', handler)
    }
  }, [])

  function getPageTitle() {
    switch (props.type) {
      case 'client-lib':
        return props.spec.info.title
      case 'cli':
        return 'Biobase CLI reference'
      case 'api':
      case 'mgmt-api':
        return 'Biobase API reference'
      default:
        return 'Biobase Docs'
    }
  }

  const pageTitle = getPageTitle()
  const section = props.sections.find((section) => section.slug === slug)
  const fullTitle = `${pageTitle}${section ? ` - ${section.title}` : ''}`
  const path = router.asPath.replace('/crawlers', '')

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={section?.title ?? pageTitle} />
        <meta property="og:image" content={`https://biobase.studio/docs/img/biobase-og-image.png`} />
        <meta
          name="twitter:image"
          content={`https://biobase.studio/docs/img/biobase-og-image.png`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`https://biobase.studio${router.basePath}${path}`} />
      </Head>
      <TopNavSkeleton>
        <SidebarSkeleton menuId={props.menuId}>
          {props.isOldVersion && <OldVersionAlert sections={props.sections} />}
          <RefSubLayout>
            {props.sections.map((section, i) => {
              const sectionType = section.type
              switch (sectionType) {
                case 'markdown':
                  const markdownData = props.pageProps.docs.find((doc) => doc.id === section.id)

                  return (
                    <RefEducationSection
                      key={section.id + i}
                      item={section}
                      markdownContent={markdownData}
                    />
                  )
                case 'function':
                  return (
                    <RefFunctionSection
                      key={section.id + i}
                      funcData={section}
                      commonFuncData={section}
                      spec={props.spec}
                      typeSpec={props.typeSpec}
                    />
                  )
                case 'cli-command':
                  return (
                    <CliCommandSection
                      key={section.id + i}
                      funcData={section}
                      commonFuncData={section}
                    />
                  )
                case 'operation':
                  if (props.type === 'mgmt-api') {
                    return (
                      <MgmtApiOperationSection
                        key={section.id + i}
                        funcData={section}
                        commonFuncData={section}
                        spec={props.spec}
                      />
                    )
                  } else {
                    return (
                      <ApiOperationSection
                        key={section.id + i}
                        funcData={section}
                        commonFuncData={section}
                        spec={props.spec}
                      />
                    )
                  }
                default:
                  throw new Error(`Unknown common section type '${sectionType}'`)
              }
            })}
          </RefSubLayout>
        </SidebarSkeleton>
      </TopNavSkeleton>
    </>
  )
}

export default RefSectionHandler
