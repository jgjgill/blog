import { ReactNode } from '@mdx-js/react/lib'
import { ImageDataLike } from 'gatsby-plugin-image'

export interface Content {
  id: string
  frontmatter: Frontmatter
  excerpt: ReactNode
  body: string
}

export type Frontmatter = {
  date: string
  slug: string
  title: string
  category: string
  thumbnail_alt: string
  thumbnail: ImageDataLike
  type: 'post' | 'road'
  description: string
}

export interface Blog {
  fields: {
    slug: string
    source: 'contents' | 'roads'
  }
  frontmatter: {
    title: string
    date: string
    thumbnail_alt: string
    thumbnail: ImageDataLike
  }
  body: string
  tableOfContents: { items?: TableItem[] }
}

export interface TableItem {
  url: string
  title: string
  items?: TableItem[]
}
