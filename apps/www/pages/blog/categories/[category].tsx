import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { startCase } from 'lodash'

import DefaultLayout from '~/components/Layouts/Default'
import BlogGridItem from '~/components/Blog/BlogGridItem'
import { fetchBlogPosts, type BlogPostPreview } from '~/lib/blog-service'

export async function getStaticPaths() {
  const { posts } = await fetchBlogPosts(1, 1000)
  const categories = Array.from(new Set(posts.flatMap(post => post.tags || [])))
  
  return {
    paths: categories.map((category) => ({ 
      params: { category } 
    })),
    fallback: 'blocking'
  }
}

export async function getStaticProps(context: { params?: any }) {
  try {
    const { params = {} } = context
    const category = params.category
    if (!category) return { notFound: true }

    const { posts } = await fetchBlogPosts(1, 1000)
    const filteredPosts = posts.filter(post => post.tags?.includes(category))

    if (!filteredPosts.length) return { notFound: true }

    return {
      props: {
        category,
        blogs: filteredPosts,
      },
    }
  } catch (error) {
    return { notFound: true }
  }
}

interface Props {
  category: string
  blogs: BlogPostPreview[]
}

function CategoriesIndex({ category, blogs }: Props) {
  const title = `${startCase(category)} Blog Posts | Biobase`
  const description = `Blog posts about ${category} from the Biobase team`
  
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          url: `https://biobase.studio/blog/categories/${category}`,
        }}
      />

      <DefaultLayout>
        <div className="mx-auto max-w-7xl px-8 py-16 sm:px-16 xl:px-20">
          <div className="flex items-center space-x-2 mb-16">
            <Link href="/blog" className="text-scale-1100 hover:text-scale-1200">
              Blog
            </Link>
            <span className="text-scale-900">/</span>
            <span className="text-scale-1200 capitalize">{category}</span>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((post) => (
              <BlogGridItem key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </DefaultLayout>
    </>
  )
}

export default CategoriesIndex
