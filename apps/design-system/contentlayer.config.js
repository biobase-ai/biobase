import path from 'path'
import { getHighlighter, loadTheme } from '@shikijs/compat'
import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer2/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { codeImport } from 'remark-code-import'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import { visit } from 'unist-util-visit'

import { rehypeComponent } from './lib/rehype-component'

/** @type {import('contentlayer2/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
}

const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `docs/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    published: {
      type: 'boolean',
      default: true,
    },
    component: {
      type: 'boolean',
      default: false,
      required: false,
    },
    source: {
      type: 'json',
      required: false,
    },
    toc: {
      type: 'boolean',
      required: false,
      default: true,
    },
    featured: {
      type: 'boolean',
      required: false,
      default: false,
    },
    links: {
      type: 'json',
      required: false,
    },
    fragment: {
      type: 'boolean',
      required: false,
      default: false,
    },
  },
  computedFields,
}))

const theme = {
  dark: 'github-dark',
  light: 'github-light',
}

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Doc],
  mdx: {
    remarkPlugins: [remarkGfm, codeImport, remarkFrontmatter],
    rehypePlugins: [
      rehypeSlug,
      rehypeComponent,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          test: ['h2', 'h3', 'h4'],
          properties: { className: ['subheading-anchor'] },
        },
      ],
      [rehypePrettyCode, { theme }],
    ],
  },
})
