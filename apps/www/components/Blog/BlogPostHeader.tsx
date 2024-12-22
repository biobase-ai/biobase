import Image from 'next/image'
import { FC } from 'react'
import { format } from 'date-fns'

interface BlogPostHeaderProps {
  title: string
  description?: string
  author: string
  publishedAt: string
  coverImage?: string
}

const BlogPostHeader: FC<BlogPostHeaderProps> = ({
  title,
  description,
  author,
  publishedAt,
  coverImage,
}) => {
  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="text-xl leading-8 text-gray-600 dark:text-gray-400">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <p className="text-base">
            <span className="font-medium text-gray-900 dark:text-white">{author}</span>
            <span className="mx-1 text-gray-600 dark:text-gray-400">·</span>
            <time className="text-gray-600 dark:text-gray-400">
              {format(new Date(publishedAt), 'MMMM d, yyyy')}
            </time>
          </p>
        </div>
      </div>

      {coverImage && (
        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
    </div>
  )
}

export default BlogPostHeader
