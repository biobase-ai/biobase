import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import type { DocumentGen } from 'contentlayer/core'
import remarkGfm from 'remark-gfm'
import remarkMdxImages from 'remark-mdx-images'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const sharedFields = {
  title: { type: 'string', required: true },
  description: { type: 'string', required: true },
  date: { type: 'string', required: true },
  tags: { type: 'list', of: { type: 'string' }, required: false },
  author: { type: 'string', required: false },
  author_url: { type: 'string', required: false },
  author_image_url: { type: 'string', required: false },
  image: { type: 'string', required: false },
  thumb: { type: 'string', required: false },
} as const

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '_blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    ...sharedFields,
    published_at: { type: 'string', required: true },
    launchweek: { type: 'string', required: false },
    toc_depth: { type: 'number', required: false },
    video: { type: 'string', required: false },
    youtubeHero: { type: 'string', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc: DocumentGen) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    url: {
      type: 'string',
      resolve: (doc: DocumentGen) => `/blog/${doc._raw.sourceFileName.replace(/\.mdx$/, '')}`,
    },
    body: {
      type: 'json',
      resolve: (doc) => doc.body
    }
  },
}))

export const Event = defineDocumentType(() => ({
  name: 'Event',
  filePathPattern: '_events/**/*.mdx',
  contentType: 'mdx',
  fields: {
    ...sharedFields,
    start_date: { type: 'string', required: true },
    end_date: { type: 'string', required: false },
    location: { type: 'string', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc: DocumentGen) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}))

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: '_pages/**/*.mdx',
  contentType: 'mdx',
  fields: {
    ...sharedFields,
    sidebar_position: { type: 'number', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc: DocumentGen) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}))

export const Alternative = defineDocumentType(() => ({
  name: 'Alternative',
  filePathPattern: '_alternatives/**/*.mdx',
  contentType: 'mdx',
  fields: {
    ...sharedFields,
    alternative_to: { type: 'string', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc: DocumentGen) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}))

export const Customer = defineDocumentType(() => ({
  name: 'Customer',
  filePathPattern: '_customers/**/*.mdx',
  contentType: 'mdx',
  fields: {
    ...sharedFields,
    customer_name: { type: 'string', required: true },
    customer_logo: { type: 'string', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc: DocumentGen) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Event, Page, Alternative, Customer],
  markdown: {
    remarkPlugins: [remarkGfm, remarkMdxImages, remarkToc],
    rehypePlugins: [
      rehypeSlug,
      rehypeHighlight,
      rehypeCodeTitles,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
})
