import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { MDXProvider } from '@mdx-js/react'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import authors from 'lib/authors.json'
import { generateReadingTime } from '~/lib/helpers'
import { mdxSerialize } from '~/lib/mdx/mdxSerialize'
import { mdxComponents } from '~/lib/mdx/mdxComponents'
import { fetchBlogPostBySlug, fetchBlogPosts, type BlogPost } from '~/lib/blog-service'

const ShareArticleActions = dynamic(() => import('~/components/Blog/ShareArticleActions'))
const BlogPostHeader = dynamic(() => import('~/components/Blog/BlogPostHeader'))
const BlogPostFooter = dynamic(() => import('~/components/Blog/BlogPostFooter'))
const CTABanner = dynamic(() => import('~/components/CTABanner'))
const DefaultLayout = dynamic(() => import('~/components/Layouts/Default'))

export const getStaticPaths = async () => {
  // Get all posts without pagination to generate all paths
  const { posts } = await fetchBlogPosts(1, 1000)
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{ blog: BlogPost; relatedPosts: BlogPost[] }> = async ({
  params,
}) => {
  const { slug } = params as { slug: string }
  const blogPost = await fetchBlogPostBySlug(slug)
  
  if (!blogPost) {
    return {
      notFound: true,
    }
  }

  // Get related posts
  const { posts: allPosts } = await fetchBlogPosts(1, 1000)
  const relatedPosts = allPosts
    .filter(post => 
      post.slug !== slug && 
      (post.tags?.some(tag => blogPost.tags?.includes(tag)) || 
      post.author === blogPost.author)
    )
    .slice(0, 3)
    .map(post => ({
      ...post,
      content: '', // Don't send full content for related posts
    })) as BlogPost[]

  const mdxSource = await mdxSerialize(blogPost.content)

  return {
    props: {
      blog: {
        ...blogPost,
        mdxSource,
      },
      relatedPosts,
    },
  }
}

function BlogPost({ blog, relatedPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const { title, description, publishedAt, author, image, content, tags } = blog

  const meta_title = `${title} | Biobase Blog`
  const meta_description = description || ''

  return (
    <>
      <NextSeo
        title={meta_title}
        description={meta_description}
        openGraph={{
          title: meta_title,
          description: meta_description,
          url: `https://biobase.studio${router.asPath}`,
          images: image ? [{ url: image }] : undefined,
        }}
      />

      <DefaultLayout>
        <div className="mx-auto max-w-4xl px-8 py-16 sm:px-16 xl:px-20">
          <article className="prose dark:prose-dark max-w-none">
            <header className="mb-16">
              <h1 className="mb-8 text-4xl font-bold">{title}</h1>
              <div className="flex items-center space-x-4 text-scale-1100">
                <time dateTime={publishedAt}>
                  {dayjs(publishedAt).format('MMM D, YYYY')}
                </time>
                {author && (
                  <>
                    <span>·</span>
                    <span>{author}</span>
                  </>
                )}
                {tags && tags.length > 0 && (
                  <>
                    <span>·</span>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-scale-100 px-3 py-0.5 text-sm font-medium text-scale-1100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </header>

            {image && (
              <div className="relative mb-16 aspect-[16/9]">
                <Image
                  src={image}
                  alt={`${title} cover image`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            )}

            <MDXProvider components={mdxComponents}>
              <div className="mdx-content" dangerouslySetInnerHTML={{ __html: content }} />
            </MDXProvider>
          </article>

          {relatedPosts.length > 0 && (
            <div className="mt-16 border-t pt-16">
              <h2 className="mb-8 text-2xl font-bold">Related Posts</h2>
              <div className="grid gap-8 md:grid-cols-3">
                {relatedPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <article className="group cursor-pointer">
                      {post.image && (
                        <div className="relative mb-4 aspect-[16/9]">
                          <Image
                            src={post.image}
                            alt={`${post.title} thumbnail`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        </div>
                      )}
                      <h3 className="text-xl font-semibold group-hover:text-primary-600">
                        {post.title}
                      </h3>
                      {post.description && (
                        <p className="mt-2 text-scale-1100 line-clamp-2">
                          {post.description}
                        </p>
                      )}
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </DefaultLayout>
    </>
  )
}

export default BlogPost
