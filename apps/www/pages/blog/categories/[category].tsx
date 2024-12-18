import { GetStaticPaths, GetStaticProps } from 'next'
import { getSortedPosts, getAllCategories, getTotalPostCount } from '~/lib/posts'
import type PostTypes from '~/types/post'

// Only include necessary fields in the BlogPost type
type MinimalBlogPost = {
  slug: string // Make slug required for our use case
  title: string
  description: string
}

interface Props {
  posts: MinimalBlogPost[]
  category: string
  totalPosts: number
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getAllCategories('_blog')
  const paths = categories.map((category) => ({
    params: { category },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const category = params?.category as string
  if (!category) {
    return {
      notFound: true,
    }
  }

  try {
    const [posts, totalPosts] = await Promise.all([
      getSortedPosts({
        directory: '_blog',
        category,
        page: 1,
        limit: 10,
      }),
      getTotalPostCount('_blog', category)
    ])

    // Only include necessary fields to reduce data size
    const minimalPosts = posts.map(({ slug, title, description }) => ({
      slug,
      title,
      description,
    }))

    return {
      props: {
        posts: minimalPosts,
        category,
        totalPosts,
      },
      // Add revalidation to reduce build time and function size
      revalidate: 3600, // Revalidate every hour
    }
  } catch (error) {
    console.error('Error fetching blog category data:', error)
    return {
      notFound: true,
    }
  }
}

export default function BlogCategory({ posts, category, totalPosts }: Props) {
  return (
    <div className="container mx-auto px-8 py-16">
      <h1 className="text-4xl font-bold mb-8">Blog Posts in {category}</h1>
      <p className="text-lg mb-8">Total posts: {totalPosts}</p>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.slug} className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
            <p className="text-muted-foreground">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
