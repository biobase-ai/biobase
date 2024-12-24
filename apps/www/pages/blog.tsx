import { useState } from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { fetchBlogPosts } from '~/lib/blog-service'
import type { BlogPostPreview, PaginatedBlogPosts } from '~/lib/blog-service'

import DefaultLayout from '~/components/Layouts/Default'
import BlogGridItem from '~/components/Blog/BlogGridItem'
import BlogListItem from '~/components/Blog/BlogListItem'
import BlogFilters from '~/components/Blog/BlogFilters'
import { cn } from 'ui'
import { LOCAL_STORAGE_KEYS, isBrowser } from 'common'

export type BlogView = 'list' | 'grid'

interface BlogProps {
  blogData: PaginatedBlogPosts
}

function Blog({ blogData }: BlogProps) {
  const { BLOG_VIEW } = LOCAL_STORAGE_KEYS
  const localView = isBrowser ? (localStorage?.getItem(BLOG_VIEW) as BlogView) : undefined
  const [blogs, setBlogs] = useState(blogData.posts)
  const [view, setView] = useState<BlogView>(localView ?? 'list')
  const [page, setPage] = useState(blogData.page)
  const [hasMore, setHasMore] = useState(blogData.hasMore)
  const [isLoading, setIsLoading] = useState(false)
  const isList = view === 'list'
  const router = useRouter()
  const { category } = router.query

  const meta_title = 'Biobase Blog: Latest Updates and News'
  const meta_description = 'Stay up to date with the latest news, updates, and insights from the Biobase team.'

  const loadMore = async () => {
    if (isLoading || !hasMore) return
    
    setIsLoading(true)
    try {
      const nextPage = page + 1
      const data = await fetchBlogPosts(nextPage, 10, category as string)
      setBlogs([...blogs, ...data.posts])
      setPage(nextPage)
      setHasMore(data.hasMore)
    } catch (error) {
      console.error('Error loading more posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <NextSeo
        title={meta_title}
        description={meta_description}
        openGraph={{
          title: meta_title,
          description: meta_description,
          url: `https://biobase.studio/blog`,
        }}
      />

      <DefaultLayout>
        <div className="mx-auto max-w-7xl px-8 py-16 sm:px-16 xl:px-20">
          <div className="mb-16">
            <h1 className="text-4xl font-bold mb-8">Biobase Blog</h1>
            <BlogFilters
              blogs={blogs}
              setBlogs={setBlogs}
              view={view}
              setView={setView}
            />
          </div>

          <div className={cn(
            'grid gap-8',
            isList ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'
          )}>
            {blogs.map((post) => (
              isList ? (
                <BlogListItem key={post.slug} post={post} />
              ) : (
                <BlogGridItem key={post.slug} post={post} />
              )
            ))}
          </div>

          {hasMore && (
            <div className="mt-16 text-center">
              <button
                onClick={loadMore}
                disabled={isLoading}
                className="px-6 py-2 text-sm font-medium text-scale-1200 bg-scale-100 hover:bg-scale-200 rounded-md transition-colors"
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      </DefaultLayout>
    </>
  )
}

export async function getStaticProps({ params }: any) {
  const blogData = await fetchBlogPosts(1, 10, params?.category)
  
  return {
    props: {
      blogData,
    },
    revalidate: 60 // Revalidate every minute
  }
}

export default Blog
