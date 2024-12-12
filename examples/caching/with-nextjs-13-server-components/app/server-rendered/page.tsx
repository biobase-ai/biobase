import Link from 'next/link'
import biobase from '../../utils/biobase'

// do not cache this page
export const revalidate = 0

export default async function Posts() {
  const { data: posts } = await biobase.from('posts').select('id, title')

  if (!posts) {
    return <p>No posts found.</p>
  }

  return posts.map((post) => (
    <p key={post.id}>
      <Link href={`/static/${post.id}`}>{post.title}</Link>
    </p>
  ))
}
