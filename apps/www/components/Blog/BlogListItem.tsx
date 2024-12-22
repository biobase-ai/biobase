import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import type { BlogPostPreview } from '~/lib/blog-service'

interface Props {
  post: BlogPostPreview
}

const BlogListItem = ({ post }: Props) => {
  const { title, description, slug, publishedAt, author, image, tags } = post

  return (
    <Link href={`/blog/${slug}`}>
      <article className="group cursor-pointer">
        <div className="grid gap-4 md:grid-cols-3">
          {image && (
            <div className="relative aspect-[16/9] md:col-span-1">
              <Image
                src={image}
                alt={`${title} thumbnail`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          )}
          <div className={image ? 'md:col-span-2' : 'md:col-span-3'}>
            <h3 className="text-xl font-semibold group-hover:text-primary-600">{title}</h3>
            <div className="mt-2 text-scale-1000">
              <time dateTime={publishedAt}>
                {format(new Date(publishedAt), 'MMM d, yyyy')}
              </time>
              {author && (
                <>
                  <span className="mx-2">·</span>
                  <span>{author}</span>
                </>
              )}
            </div>
            {description && (
              <p className="mt-2 text-scale-1100 line-clamp-2">{description}</p>
            )}
            {tags && tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-scale-100 px-3 py-0.5 text-sm font-medium text-scale-1100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default BlogListItem
