import Link from 'next/link'
import Image from 'next/image'
import TextLink from '~/components/TextLink'
import { Button } from '~/components/Button'

const components = {
  Link,
  Image,
  TextLink,
  Button,
  // Add custom components here
  a: ({ href, children, ...props }: any) => {
    if (href.startsWith('/')) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  },
  img: ({ src, alt, ...props }: any) => {
    return (
      <Image
        src={src}
        alt={alt}
        layout="responsive"
        width={800}
        height={400}
        {...props}
      />
    )
  }
}

export { components as mdxComponents }
