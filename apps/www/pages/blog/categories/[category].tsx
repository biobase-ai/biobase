import { NextSeo } from 'next-seo'
import { getSortedPosts, getAllCategories } from '~/lib/posts'
import Link from 'next/link'
import { startCase } from 'lodash'

import DefaultLayout from '~/components/Layouts/Default'
import BlogGridItem from '~/components/Blog/BlogGridItem'
import type PostTypes from '~/types/post'

export async function getStaticPaths() {
  const categories = getAllCategories('_blog')
  return {
    paths: categories.map((category: string) => ({ 
      params: { category: category } 
    })),
    fallback: 'blocking'
  }
}

export async function getStaticProps(context: { params?: any }) {
  try {
    const { params = {} } = context
    const category = params.category
    if (!category) return { notFound: true }

    const posts = getSortedPosts({ 
      directory: '_blog', 
      limit: 5, // 减少到5篇
      categories: [category] 
    })

    if (!posts.length) return { notFound: true }

    return {
      props: {
        category,
        blogs: posts,
      },
      revalidate: 3600
    }
  } catch (error) {
    return { notFound: true }
  }
}

interface Props {
  category: string
  blogs: PostTypes[]
  totalPosts: number
  currentPage: number
  postsPerPage: number
}

function CategoriesIndex(props: Props) {
  const { blogs, category, totalPosts, currentPage, postsPerPage } = props
  const capitalizedCategory = startCase(category.replaceAll('-', ' '))
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  // Add a safety check in case no blogs are found
  if (!blogs || blogs.length === 0) {
    return (
      <DefaultLayout>
        <div className="container mx-auto px-8 py-16 sm:px-16 xl:px-20">
          <h1>No posts found in the {capitalizedCategory} category</h1>
        </div>
      </DefaultLayout>
    )
  }

  return (
    <>
      <NextSeo
        title={`Blog | ${capitalizedCategory}`}
        description={`Latest ${capitalizedCategory} news from the Biobase team.`}
      />
      <DefaultLayout>
        <div className="container mx-auto px-8 py-16 sm:px-16 xl:px-20">
          <div className="text-foreground-lighter flex space-x-1">
            <h1 className="cursor-pointer">
              <Link href="/blog">Blog</Link>
              <span className="px-2">/</span>
              <span>{`${capitalizedCategory}`}</span>
            </h1>
          </div>
          <ol className="grid grid-cols-12 gap-8 py-16 lg:gap-16">
            {blogs.map((blog: PostTypes, idx: number) => (
              <div
                className="col-span-12 mb-16 md:col-span-12 lg:col-span-6 xl:col-span-4"
                key={idx}
              >
                <BlogGridItem post={blog} />
              </div>
            ))}
          </ol>
          {totalPages > 1 && (
            <div className="flex justify-center space-x-4 py-8">
              <Link
                href={`/blog/categories/${category}?page=${currentPage - 1}`}
                className={`${
                  currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                }`}
              >
                Previous
              </Link>
              <span>{`Page ${currentPage} of ${totalPages}`}</span>
              <Link
                href={`/blog/categories/${category}?page=${currentPage + 1}`}
                className={`${
                  currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
                }`}
              >
                Next
              </Link>
            </div>
          )}
        </div>
      </DefaultLayout>
    </>
  )
}

export default CategoriesIndex
