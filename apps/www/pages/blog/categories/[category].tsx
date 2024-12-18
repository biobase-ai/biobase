import { NextSeo } from 'next-seo'
import { getSortedPosts, getAllCategories, getTotalPostCount } from '~/lib/posts'
import Link from 'next/link'
import { startCase } from 'lodash'
import { useRouter } from 'next/router'

import DefaultLayout from '~/components/Layouts/Default'
import BlogGridItem from '~/components/Blog/BlogGridItem'
import type { Directories } from '~/lib/posts'

export async function getStaticPaths() {
  const categories = await getAllCategories('_blog')
  return {
    paths: categories.slice(0, 5).map((category: string) => ({ 
      params: { category } 
    })),
    fallback: 'blocking'
  }
}

export async function getStaticProps(context: { params?: any; query?: any }) {
  try {
    const { params = {}, query = {} } = context
    const category = params.category
    const page = Number(query.page) || 1
    const postsPerPage = 9
    
    if (!category) return { notFound: true }

    const [posts, totalCount] = await Promise.all([
      getSortedPosts({ 
        directory: '_blog',
        limit: postsPerPage,
        offset: (page - 1) * postsPerPage,
        categories: [category]
      }),
      getTotalPostCount('_blog', category)
    ])
    
    if (!posts.length) return { notFound: true }

    return {
      props: {
        category,
        blogs: posts,
        currentPage: page,
        totalPages: Math.ceil(totalCount / postsPerPage)
      },
      revalidate: 60 * 60 // Revalidate every hour
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return { notFound: true }
  }
}

interface Props {
  category: string
  blogs: any[]
  currentPage: number
  totalPages: number
}

export default function BlogCategory({ category, blogs, currentPage, totalPages }: Props) {
  const router = useRouter()
  const formattedCategory = startCase(category)

  const handlePageChange = (page: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page }
    })
  }

  return (
    <DefaultLayout>
      <NextSeo
        title={`${formattedCategory} Blog Posts | Biobase`}
        description={`Read our latest blog posts about ${formattedCategory.toLowerCase()}`}
        openGraph={{
          title: `${formattedCategory} Blog Posts | Biobase`,
          description: `Read our latest blog posts about ${formattedCategory.toLowerCase()}`,
          url: `https://biobase.com/blog/categories/${category}`,
        }}
      />

      <div className="container mx-auto px-8 py-16 sm:px-16 xl:px-20">
        <div className="flex items-center space-x-4">
          <Link href="/blog" className="text-scale-900 hover:text-scale-1200">
            ← Back to all posts
          </Link>
          <span className="text-scale-900">|</span>
          <h1 className="text-scale-1200 text-2xl">{formattedCategory}</h1>
        </div>

        <div className="grid gap-10 py-16 lg:grid-cols-3">
          {blogs.map((blog: any) => (
            <BlogGridItem key={blog.slug} post={blog} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center space-x-4 py-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 ${
                  currentPage === page
                    ? 'bg-scale-1200 text-white'
                    : 'bg-scale-100 text-scale-1200 hover:bg-scale-200'
                } rounded`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  )
}
