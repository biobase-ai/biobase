import Head from 'next/head'
import type { PropsWithChildren } from 'react'

import { BASE_PATH } from 'lib/constants'
import { Separator } from 'ui'

const VercelIntegrationLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <Head>
        <title>Biobase + Vercel</title>
      </Head>
      <main className="flex flex-col w-full h-full">
        <div>
          <div className="mx-auto px-4 sm:px-6">
            <div className="max-w-xl flex justify-between items-center mx-auto py-4">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <div>
                  <span className="sr-only">Biobase</span>
                  <img
                    className="h-6 w-auto sm:h-6"
                    src={`${BASE_PATH}/img/biobase-logo.svg`}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex-grow overflow-y-auto">
          <div className="max-w-7xl h-full mx-auto px-4 sm:px-6">
            <div className="max-w-xl h-full mx-auto py-10">{children}</div>
          </div>
        </div>
      </main>
    </>
  )
}
export default VercelIntegrationLayout
