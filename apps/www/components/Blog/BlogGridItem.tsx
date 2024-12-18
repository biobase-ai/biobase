import Image from 'next/image'
import Link from 'next/link'
import type PostTypes from '~/types/post'

interface Props {
  post: PostTypes
  showImage?: boolean
}

const BlogGridItem = ({ post, showImage = true }: Props) => {
  const { title, description, url, image } = post

  return (
    <Link href={url} className="group">
      <div className="flex flex-col gap-3">
        {showImage && image && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-medium text-foreground group-hover:text-foreground-light">
            {title}
          </h3>
          {description && (
            <p className="line-clamp-2 text-foreground-light">{description}</p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default BlogGridItem
