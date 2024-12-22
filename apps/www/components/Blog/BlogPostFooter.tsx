import { FC } from 'react'
import Link from 'next/link'

interface BlogPostFooterProps {
  tags?: string[]
}

const BlogPostFooter: FC<BlogPostFooterProps> = ({ tags }) => {
  if (!tags || tags.length === 0) return null

  return (
    <div className="mx-auto max-w-4xl py-8">
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogPostFooter
