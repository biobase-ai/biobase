'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'

import { cn } from 'ui'
import { CodeBlockWrapper } from '@/components/code-block-wrapper'

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
}

export function ComponentSource({ src, className, ...props }: ComponentSourceProps) {
  const [code, setCode] = useState<string>('')

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await fetch(src)
        const text = await response.text()
        setCode(text)
      } catch (error) {
        console.error('Error fetching source code:', error)
      }
    }

    if (src) {
      fetchCode()
    }
  }, [src])

  return (
    <CodeBlockWrapper
      expandButtonTitle="Expand"
      className={cn('my-6 overflow-hidden rounded-md', className)}
    >
      <pre className="language-tsx">
        <code>{code}</code>
      </pre>
    </CodeBlockWrapper>
  )
}
