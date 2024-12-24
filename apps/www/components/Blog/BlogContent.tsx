import { memo, useEffect, useState } from 'react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

interface BlogContentProps {
  content: string | null
}

function BlogContent({ content }: BlogContentProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function prepareContent() {
      if (!content) {
        setIsLoading(false)
        return
      }

      try {
        const source = await serialize(content)
        setMdxSource(source)
      } catch (error) {
        console.error('Error serializing content:', error)
      } finally {
        setIsLoading(false)
      }
    }

    prepareContent()
  }, [content])

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-scale-100 rounded w-3/4"></div>
        <div className="h-4 bg-scale-100 rounded"></div>
        <div className="h-4 bg-scale-100 rounded w-5/6"></div>
      </div>
    )
  }

  if (!mdxSource) return null

  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote {...mdxSource} />
    </div>
  )
}

export default memo(BlogContent) 