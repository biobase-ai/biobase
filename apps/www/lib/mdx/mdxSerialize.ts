import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import remarkMdxImages from 'remark-mdx-images'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export const mdxSerialize = async (source: string) => {
  const mdxSource = await serialize(source, {
    parseFrontmatter: true,
    scope: {}, // Reduce serialized data size by not passing unnecessary scope
    mdxOptions: {
      development: false,
      remarkPlugins: [
        [remarkGfm, { 
          tableCellPadding: true,
          tablePipeAlign: true,
          stringLength: str => str.length
        }],
        remarkMdxImages,
        [remarkToc, { 
          tight: true, 
          maxDepth: 3, // Reduce TOC depth
          skip: 'export|import|jsx|tsx', // Skip code blocks in TOC
        }],
      ],
      rehypePlugins: [
        rehypeSlug,
        [rehypeHighlight, { 
          ignoreMissing: true,
          subset: true, // Only include used languages
          plainText: ['txt', 'text'], // Treat these as plain text
        }],
        rehypeCodeTitles,
        [rehypeAutolinkHeadings, { 
          behavior: 'wrap',
          properties: { className: ['anchor'] }, // Minimize added attributes
        }],
      ],
      format: 'mdx',
    },
  })

  return mdxSource
}
