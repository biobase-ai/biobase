import path from 'path'
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
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
      default: 'No description provided'
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
      default: {},
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
      default: {},
    },
    fragment: {
      type: 'boolean',
      required: false,
      default: false,
    },
  },
  computedFields,
}))

function onVisitLine(node) {
  if (node.children.length === 0) {
    node.children = [{ type: 'text', value: ' ' }]
  }
}

function onVisitHighlightedLine(node) {
  node.properties.className = ['line--highlighted']
}

function onVisitHighlightedWord(node) {
  node.properties.className = ['word--highlighted']
}

export default makeSource({
  contentDirPath: '.',
  documentTypes: [Doc],
  mdx: {
    remarkPlugins: [
      remarkGfm,
      [remarkFrontmatter, { type: 'yaml', marker: '-' }],
      codeImport,
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeComponent,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          test: ['h2', 'h3', 'h4'],
          properties: { 
            className: ['subheading-anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: {
            light: 'github-light',
            dark: 'github-dark',
          },
          onVisitLine,
          onVisitHighlightedLine,
          onVisitHighlightedWord,
        },
      ],
    ],
  },
})
