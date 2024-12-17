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

export async function getStaticProps(context: { params?: any; query?: any }) {
  try {
    // Destructure with default empty objects
    const { params = {}, query = {} } = context

    console.log('Full context:', context)

    // Validate category parameter
    const category = params.category
    if (!category) {
      console.error('No category parameter provided')
      return {
        notFound: true
      }
    }

    const POSTS_PER_PAGE = 12
    const currentPage = Number(query.page) || 1
    const offset = (currentPage - 1) * POSTS_PER_PAGE

    console.log('Params:', params)
    console.log('Query:', query)

    // Normalize category for case-insensitive matching
    const normalizedCategory = category.toLowerCase()

    // Ensure the category exists
    const allCategories = getAllCategories('_blog')
    console.log('All Categories:', allCategories)

    const matchingCategory = allCategories.find(
      (cat: string) => cat.toLowerCase() === normalizedCategory
    )

    console.log('Matching Category:', matchingCategory)

    if (!matchingCategory) {
      console.log(`No matching category found for: ${normalizedCategory}`)
      return {
        notFound: true
      }
    }

    const posts = getSortedPosts({ 
      directory: '_blog', 
      limit: POSTS_PER_PAGE,
      offset,
      categories: [matchingCategory] 
    })

    console.log('Posts:', posts)

    // Get total count for pagination
    const allPosts = getSortedPosts({ 
      directory: '_blog', 
      categories: [matchingCategory] 
    })
    const totalPosts = allPosts.length

    console.log('Total Posts:', totalPosts)

    return {
      props: {
        category: matchingCategory,
        blogs: posts,
        totalPosts,
        currentPage,
        postsPerPage: POSTS_PER_PAGE,
      },
      revalidate: 3600
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      notFound: true
    }
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
