import fs from 'fs'

import { useRouter } from 'next/router'
import Head from 'next/head'

import { NextSeo } from 'next-seo'
import { generateRss } from '~/lib/rss'
import { getSortedPosts } from '~/lib/posts'

import DefaultLayout from '~/components/Layouts/Default'
import type PostTypes from '~/types/post'
import { motion } from 'framer-motion'
import styles from '~/styles/customers.module.css'
import Link from 'next/link'
import { GlassPanel } from 'ui-patterns/GlassPanel'
import EventCallout from '../components/EventCallout'
import { useBreakpoint } from 'common'

export async function getStaticProps() {
  try {
    const allPostsData = getSortedPosts({ directory: '_customers' })
    
    // Filter out any posts that don't have required fields
    const validPosts = allPostsData.filter(post => 
      post && post.title && (post.date || (post as any).publishedAt)
    )
    
    // Add fallback date if missing
    const processedPosts = validPosts.map(post => ({
      ...post,
      date: post.date || (post as any).publishedAt || new Date().toISOString(),
    }))
    
    // Only generate RSS if we have valid posts
    if (processedPosts.length > 0) {
      const rss = generateRss(processedPosts)
      // create a rss feed in public directory
      // rss feed is added via <Head> component in render return
      fs.writeFileSync('./public/customers-rss.xml', rss)
    }

    return {
      props: {
        blogs: processedPosts || [],
      },
    }
  } catch (error) {
    console.error('Error in getStaticProps for customers page:', error)
    // Return empty blogs array to prevent build failures
    return {
      props: {
        blogs: [],
      },
    }
  }
}

function CustomerStoriesPage(props: any) {
  const { basePath } = useRouter()
  const isMobile = useBreakpoint(768)

  const meta = {
    title: 'Customer Stories | Biobase',
    image: `${basePath}/images/customers/og/customer-stories.jpg`,
    description:
      'See how Biobase empowers companies of all sizes to accelerate their growth and streamline their work.',
  }

  const caseStudyThumbs = props.blogs?.map((blog: PostTypes, idx: number) => {
    return {
      logo: blog.logo,
      logoInverse: blog.logo_inverse,
      title: blog.title,
      link: blog.url,
    }
  }) || []

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:image" content={meta.image} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS feed for customer stories"
          href={`${basePath}/customers-rss.xml`}
        />
      </Head>
      <NextSeo
        title={meta.title}
        description={meta.description}
        openGraph={{
          title: meta.title,
          description: meta.description,
          url: `${basePath}/customers`,
          images: [
            {
              url: meta.image,
            },
          ],
        }}
      />
      <DefaultLayout>
        <div className="relative z-0 bg-background overflow-hidden">
          <div className="container mx-auto mt-28 sm:mt-44 px-4 xl:px-20">
            <div className="mx-auto relative z-10">
              <motion.div
                className="mx-auto sm:max-w-2xl text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, easing: 'easeOut' } }}
              >
                <EventCallout size={isMobile ? 'tiny' : 'small'} className="mb-4 lg:mb-8 -mt-4" />
                <h1 className="text-foreground mb-3 text-3xl">Customer stories</h1>
                <h2 className="text-foreground-light text-base sm:text-xl">
                  Discover case studies on how Biobase is being used around the world to quickly
                  create outstanding products and set new industry standards.
                </h2>
              </motion.div>
              <div className="mx-auto my-12 md:my-20 grid grid-cols-12 gap-6 not-prose">
                {caseStudyThumbs.map((caseStudy: any, i: number) => (
                  <Link href={`${caseStudy.link}`} key={caseStudy.title} passHref legacyBehavior>
                    <motion.a
                      className="col-span-12 md:col-span-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.4,
                          ease: [0.24, 0.25, 0.05, 1],
                          delay: 0.2 + i / 15,
                        },
                      }}
                    >
                      <GlassPanel
                        {...caseStudy}
                        background={true}
                        showIconBg={true}
                        showLink={true}
                        hasLightIcon
                      >
                        {caseStudy.description}
                      </GlassPanel>
                    </motion.a>
                  </Link>
                ))}
              </div>
            </div>
            <div
              className={[
                'absolute inset-0 h-[150px] sm:h-[300px] bg-background z-0 after:!bg-background',
                styles['bg-visual'],
              ].join(' ')}
            />
          </div>
        </div>
      </DefaultLayout>
    </>
  )
}

export default CustomerStoriesPage
