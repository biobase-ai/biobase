import React from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import { MDXRemote } from 'next-mdx-remote'
import { NextSeo } from 'next-seo'
import dayjs from 'dayjs'
import matter from 'gray-matter'
import {
  DesktopComputerIcon,
  VideoCameraIcon,
  MicrophoneIcon,
  HandIcon,
} from '@heroicons/react/solid'
import capitalize from 'lodash/capitalize'
import { ChevronLeft, X as XIcon } from 'lucide-react'

import authors from 'lib/authors.json'
import { isNotNullOrUndefined } from '~/lib/helpers'
import mdxComponents from '~/lib/mdx/mdxComponents'
import { mdxSerialize } from '~/lib/mdx/mdxSerialize'
import { getAllPostSlugs, getPostdata, getSortedPosts } from '~/lib/posts'
import { isBrowser, useTelemetryProps } from 'common'
import Telemetry, { TelemetryEvent } from '~/lib/telemetry'
import gaEvents from '~/lib/gaEvents'

import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import advancedFormat from 'dayjs/plugin/advancedFormat'

import { Button, Image } from 'ui'
import DefaultLayout from '~/components/Layouts/Default'
import SectionContainer from '~/components/Layouts/SectionContainer'
import ShareArticleActions from '~/components/Blog/ShareArticleActions'

import * as biobaseLogoWordmarkDark from 'common/assets/images/biobase-logo-wordmark--dark.png'
import * as biobaseLogoWordmarkLight from 'common/assets/images/biobase-logo-wordmark--light.png'

import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import type Author from '~/types/author'
import fs from 'fs'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)

type EventType = 'webinar' | 'meetup' | 'conference' | 'talk' | 'hackathon' | 'launch_week'

type CTA = {
  url: string
  label?: string
  disabled_label?: string
  target?: '_blank' | '_self'
}

type CompanyType = {
  name: string
  website_url: string
  logo: string
  logo_light: string
}

interface EventData {
  title: string
  subtitle?: string
  main_cta?: CTA
  description: string
  type: EventType
  company?: CompanyType
  onDemand?: boolean
  disable_page_build?: boolean
  duration?: string
  timezone?: string
  tags?: string[]
  date: string
  end_date?: string
  speakers: string
  speakers_label?: string
  og_image?: string
  thumb?: string
  thumb_light?: string
  youtubeHero?: string
  author_url?: string
  launchweek?: number | string
  meta_title?: string
  meta_description?: string
  video?: string
}

type EventPageProps = {
  source: any
  frontMatter: EventData
}

type MatterReturn = {
  data: EventData
  content: string
}

type Event = {
  slug: string
  source: string
  content: any
}

type Params = {
  slug: string
}

export const getStaticPaths = async () => {
  const paths = fs
    .readdirSync(`${process.cwd()}/_events`)
    .filter((path) => path.endsWith('.mdx'))
    .map((path) => ({ 
      params: { 
        slug: path.replace(/\.mdx?$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '') 
      } 
    }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: any) => {
  const { slug } = params as { slug: string }
  const files = fs.readdirSync(`${process.cwd()}/_events`)
  const filePath = files.find(f => f.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx?$/, '') === slug)
  
  if (!filePath) {
    return {
      notFound: true,
    }
  }

  const { content, data } = matter.read(`${process.cwd()}/_events/${filePath}`)
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

const EventPage = ({ source, frontMatter }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const speakersArray = frontMatter.speakers?.split(',')
  const speakers = speakersArray
    ?.map((speakerId: string) => {
      return authors.find((author) => author.author_id === speakerId)
    })
    .filter(isNotNullOrUndefined) as Author[]
  const hadEndDate = frontMatter.end_date?.length

  const IS_REGISTRATION_OPEN =
    frontMatter.onDemand ||
    (hadEndDate ? Date.parse(frontMatter.end_date!) > Date.now() : Date.parse(frontMatter.date) > Date.now())

  const ogImageUrl = frontMatter.og_image
    ? frontMatter.og_image
    : encodeURI(
        `${process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:54321' : 'https://obuldanrptloktxcffvn.supabase.co'}/functions/v1/og-images?site=events&eventType=${frontMatter.type}&title=${frontMatter.meta_title ?? frontMatter.title}&description=${frontMatter.meta_description ?? frontMatter.description}&date=${dayjs(frontMatter.date).tz(frontMatter.timezone).format(`DD MMM YYYY`)}&duration=${frontMatter.duration}`
      )

  const meta = {
    title: `${frontMatter.meta_title ?? frontMatter.title} | ${dayjs(frontMatter.date)
      .tz(frontMatter.timezone)
      .format(
        hadEndDate ? `DD` : `DD MMM YYYY`
      )}${hadEndDate ? dayjs(frontMatter.end_date).tz(frontMatter.timezone).format(` - DD MMM`) : ''} | ${capitalize(frontMatter.type)}`,
    description: frontMatter.meta_description ?? frontMatter.description,
    url: `https://biobase.studio/events/${frontMatter.slug}`,
    image: ogImageUrl,
  }

  const eventIcons = {
    conference: (props: any) => <MicrophoneIcon {...props} />,
    hackathon: (props: any) => <DesktopComputerIcon {...props} />,
    meetup: (props: any) => <HandIcon {...props} />,
    webinar: (props: any) => <VideoCameraIcon {...props} />,
  }

  const Icon = eventIcons[frontMatter.type]

  const router = useRouter()
  const telemetryProps = useTelemetryProps()

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
          videos: frontMatter.video
            ? [
                {
                  url: frontMatter.video,
                  type: 'application/x-shockwave-flash',
                  width: 640,
                  height: 385,
                },
              ]
            : undefined,
          article: {
            publishedTime: frontMatter.date,
            tags: frontMatter.tags?.map((cat: string) => {
              return cat
            }),
          },
        }}
      />
      <DefaultLayout>
        <article className="relative">
          <div className="bg-alternative">
            <div className="overflow-hidden">
              <div className="relative mx-auto max-w-[90rem] grid grid-cols-12 px-8 sm:px-16 xl:px-20">
                <div className="relative col-span-12 lg:col-span-7 pt-8 lg:pt-16">
                  <div className="absolute -top-[150%] left-0 opacity-10 w-[800px] aspect-square border border-brand rounded-full" />
                  <div className="absolute -top-[100%] -left-[50%] opacity-10 w-[800px] aspect-square border border-brand rounded-full" />
                  <div className="absolute -top-[50%] -left-[100%] opacity-10 w-[800px] aspect-square border border-brand rounded-full" />
                  <div className="flex flex-col gap-2 md:gap-3 items-start mb-8">
                    <div className="flex flex-row text-sm items-center flex-wrap">
                      <Icon className="hidden sm:inline-block w-4 h-4 text-brand mr-2" />
                      <span className="uppercase text-brand font-mono">{frontMatter.type}</span>
                      <span className="mx-3 px-3 border-x">
                        {dayjs(frontMatter.date).tz(frontMatter.timezone).format(`DD MMM YYYY [at] hA z`)}
                      </span>
                      <span className="">Duration: {frontMatter.duration}</span>
                    </div>

                    <h1 className="text-foreground text-3xl md:text-4xl xl:pr-9">{frontMatter.title}</h1>
                    <p>{frontMatter.subtitle}</p>
                    <Button
                      type="primary"
                      size="medium"
                      disabled={!IS_REGISTRATION_OPEN}
                      asChild
                    >
                      <Link
                        href={frontMatter.main_cta?.url ?? '#'}
                        target={frontMatter.main_cta?.target ? frontMatter.main_cta?.target : undefined}
                        onClick={() => router.push(frontMatter.main_cta?.url ?? '#')}
                      >
                        {IS_REGISTRATION_OPEN
                          ? frontMatter.main_cta?.label
                            ? frontMatter.main_cta?.label
                            : 'Register to this event'
                          : frontMatter.main_cta?.disabled_label
                            ? frontMatter.main_cta?.disabled_label
                            : 'Registrations are closed'}
                      </Link>
                    </Button>

                    <ShareArticleActions title={meta.title} slug={meta.url} basePath="" />
                  </div>
                </div>
                {!!frontMatter.thumb && (
                  <div className="relative w-full aspect-[5/3] lg:aspect-[3/2] overflow-hidden border shadow-lg rounded-lg z-10">
                    <Image
                      src={{
                        dark: `/images/events/` + frontMatter.thumb,
                        light:
                          `/images/events/` +
                          (!!frontMatter.thumb_light ? frontMatter.thumb_light! : frontMatter.thumb),
                      }}
                      fill
                      sizes="100%"
                      className="
                        next-image--dynamic-fill
                        [&.next-image--dynamic-fill_img]:!w-full
                        [&.next-image--dynamic-fill_img]:!h-full
                        [&.next-image--dynamic-fill_img]:!object-cover
                        "
                      alt={`${frontMatter.title} thumbnail`}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <SectionContainer className="grid lg:grid-cols-3 gap-12 !py-10 md:!py-16">
            {frontMatter.company && (
              <div className="order-first lg:col-span-full flex items-center gap-4">
                <figure className="h-6 [&_.next-image--dynamic-fill_img]:!h-full">
                  <Image
                    src={{ dark: biobaseLogoWordmarkDark, light: biobaseLogoWordmarkLight }}
                    alt="biobase Logo"
                    width={120}
                    height={24}
                    className="next-image--dynamic-fill"
                  />
                </figure>
                <XIcon className="w-4 h-4 text-foreground-lighter" />
                <Link
                  href={frontMatter.company?.website_url ?? '#'}
                  target="_blank"
                  className="h-5 aspect-[9/1] transition-opacity opacity-100 hover:opacity-90 [&_.next-image--dynamic-fill_img]:!h-full"
                >
                  <Image
                    src={{ dark: frontMatter.company?.logo, light: frontMatter.company?.logo_light }}
                    alt={`${frontMatter.company?.name} Logo`}
                    width={160}
                    height={30}
                    sizes="100%"
                    className="next-image--dynamic-fill"
                  />
                </Link>
              </div>
            )}
            <div className="col-span-2">
              <h2 className="text-foreground-light text-sm font-mono uppercase">
                About this event
              </h2>
              <MDXRemote {...source} components={mdxComponents()} />
            </div>
            <aside className="mt-8">
              <Button
                type="primary"
                size="medium"
                disabled={!IS_REGISTRATION_OPEN}
                asChild
              >
                <Link
                  href={frontMatter.main_cta?.url ?? '#'}
                  aria-disabled={!IS_REGISTRATION_OPEN}
                  target={frontMatter.main_cta?.target ? frontMatter.main_cta?.target : undefined}
                >
                  {IS_REGISTRATION_OPEN
                    ? frontMatter.main_cta?.label
                      ? frontMatter.main_cta?.label
                      : 'Register now'
                    : frontMatter.main_cta?.disabled_label
                      ? frontMatter.main_cta?.disabled_label
                      : 'Registrations are closed'}
                </Link>
              </Button>

              {speakers && (
                <div className="flex flex-col gap-4">
                  <h2 className="text-foreground-light text-sm font-mono uppercase">
                    {frontMatter.speakers_label ?? 'Speakers'}
                  </h2>
                  <ul className="list-none flex flex-col md:flex-row flex-wrap lg:flex-col gap-4 md:gap-8 lg:gap-4">
                    {speakers?.map((speaker) => (
                      <li key={speaker.author_id}>
                        <Link
                          href={speaker.author_url}
                          target="_blank"
                          className="group flex gap-3 items-center"
                        >
                          <div className="relative w-10 h-10">
                            <Image
                              src={speaker.author_image_url}
                              alt={speaker.author}
                              fill
                              className="
                                rounded-full
                                border
                                !border-background
                                group-hover:!border-brand
                                transition-colors
                                object-cover
                                bg-surface-100
                              "
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-foreground text-sm truncate group-hover:text-brand transition-colors">
                              {speaker.author}
                            </p>
                            <p className="text-foreground-light text-xs truncate">
                              {speaker.position}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </SectionContainer>
        </article>
      </DefaultLayout>
    </>
  )
}

export default EventPage
