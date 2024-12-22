import matter from 'gray-matter'
import { mdxSerialize } from '~/lib/mdx/mdxSerialize'
import { MDXProvider } from '@mdx-js/react'
import { NextSeo } from 'next-seo'
import * as fs from 'fs'
import { useRouter } from 'next/router'
import DefaultLayout from '~/components/Layouts/Default'
import TextLink from '~/components/TextLink'
import mdxComponents from '~/lib/mdx/mdxComponents'
import { Button } from '~/components/Button'
import { InferGetStaticPropsType } from 'next'
import { useTelemetryProps } from '~/lib/telemetry'

export const getStaticPaths = async () => {
  const paths = fs
    .readdirSync(`${process.cwd()}/_alternatives`)
    .filter((path) => path.endsWith('.mdx'))
    .map((path) => ({ params: { slug: path.replace(/\.mdx?$/, '') } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: any) => {
  const { slug } = params as { slug: string }
  const filePath = `${process.cwd()}/_alternatives/${slug}.mdx`

  if (!fs.existsSync(filePath)) {
    return {
      notFound: true,
    }
  }

  const { content, data } = matter.read(filePath)
  const mdxSource = await mdxSerialize(content)

  if (data.disable_page_build) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}

const AlternativePage = ({ source, frontMatter }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const telemetryProps = useTelemetryProps()

  const meta = {
    title: frontMatter.meta_title ?? frontMatter.title,
    description: frontMatter.meta_description ?? frontMatter.description,
    url: `https://biobase.studio/alternatives/${frontMatter.slug}`,
    image: frontMatter.og_image ?? '/images/alternatives/og-image.jpg',
  }

  return (
    <>
      <NextSeo
        title={meta.title}
        description={meta.description}
        openGraph={{
          title: meta.title,
          description: meta.description,
          url: meta.url,
          type: 'article',
          images: [
            {
              url: meta.image,
              alt: `${frontMatter.title} thumbnail`,
              width: 1200,
              height: 627,
            },
          ],
          article: {
            publishedTime: frontMatter.date,
            tags: frontMatter.tags?.map((cat: string) => cat),
          },
        }}
      />
      <DefaultLayout>
        <article className="relative">
          <div className="bg-alternative">
            <div className="overflow-hidden">
              <div className="relative mx-auto max-w-[90rem] px-8 sm:px-16 xl:px-20">
                <div className="relative pt-8 lg:pt-16">
                  <div className="absolute -top-[150%] left-0 opacity-10 w-[800px] aspect-square border border-brand rounded-full" />
                  <div className="absolute -top-[100%] -left-[50%] opacity-10 w-[800px] aspect-square border border-brand rounded-full" />
                  <div className="absolute -top-[50%] -left-[100%] opacity-10 w-[800px] aspect-square border border-brand rounded-full" />
                  <div className="flex flex-col gap-2 md:gap-3 items-start mb-8">
                    <h1 className="text-foreground text-3xl md:text-4xl xl:pr-9">{frontMatter.title}</h1>
                    <div className="prose max-w-none">
                      <MDXProvider components={mdxComponents}>
                        <div dangerouslySetInnerHTML={{ __html: source.compiledSource }} />
                      </MDXProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-8 sm:px-16 xl:px-20 grid lg:grid-cols-3 gap-12 py-10 md:py-16">
            <div className="col-span-2">
            </div>
            <aside className="mt-8">
              {frontMatter.cta && (
                <Button
                  type="primary"
                  size="medium"
                  asChild
                >
                  <TextLink
                    href={frontMatter.cta.url ?? '#'}
                    target={frontMatter.cta.target ? frontMatter.cta.target : undefined}
                  >
                    {frontMatter.cta.label ?? 'Get Started'}
                  </TextLink>
                </Button>
              )}
            </aside>
          </div>
        </article>
      </DefaultLayout>
    </>
  )
}

export default AlternativePage
