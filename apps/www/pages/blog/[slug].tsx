import { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { NextSeo } from 'next-seo'
import { fetchBlogPostBySlug, fetchBlogIndex, type BlogPost } from '~/lib/blog-service'
import DefaultLayout from '~/components/Layouts/Default'

interface BlogPostProps {
  post: {
    title: string
    description?: string
    author?: string
    publishedAt: string
    image?: string
    slug: string
    tags?: string[]
  }
  content?: string | null
}

export default function BlogPost({ post, content }: BlogPostProps) {
  const [isLoading, setIsLoading] = useState(!content)
  const [postContent, setPostContent] = useState<string | null>(content || null)

  useEffect(() => {
    async function loadContent() {
      if (!content) {
        try {
          const fullPost = await fetchBlogPostBySlug(post.slug)
          if (fullPost && fullPost.content) {
            setPostContent(fullPost.content)
          }
        } catch (error) {
          console.error('Error loading blog post content:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }
    loadContent()
  }, [post.slug, content])

  return (
    <>
      <NextSeo
        title={post.title}
        description={post.description}
        openGraph={{
          title: post.title,
          description: post.description,
          url: `https://biobase.studio/blog/${post.slug}`,
          images: post.image ? [{ url: post.image }] : undefined,
        }}
      />

      <DefaultLayout>
        <div className="mx-auto max-w-4xl px-8 py-16 sm:px-16 xl:px-20">
          <article>
            <header className="mb-8">
              <h1 className="text-4xl font-bold">{post.title}</h1>
              {post.description && (
                <p className="mt-4 text-xl text-scale-1100">{post.description}</p>
              )}
              <div className="mt-4 text-scale-1000">
                {post.author && <span>{post.author} · </span>}
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </header>

            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-scale-100 rounded w-3/4"></div>
                <div className="h-4 bg-scale-100 rounded"></div>
                <div className="h-4 bg-scale-100 rounded w-5/6"></div>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                {postContent}
              </div>
            )}
          </article>
        </div>
      </DefaultLayout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await fetchBlogIndex()
  
  const paths = posts.map((post: any) => ({
    params: { slug: post.slug },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({ params }) => {
  const slug = params?.slug as string
  const post = await fetchBlogPostBySlug(slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  // Only include essential data in the initial props
  const essentialPostData = {
    title: post.title,
    description: post.description,
    author: post.author,
    publishedAt: post.publishedAt,
    image: post.image,
    slug: post.slug,
    tags: post.tags,
  }

  return {
    props: {
      post: essentialPostData,
      // Content will be loaded client-side for large posts
      content: post.content && post.content.length > 50000 ? null : post.content,
    },
    revalidate: 60,
  }
}
