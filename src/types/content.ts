import { ReactNode } from '@mdx-js/react/lib'
import { ImageDataLike } from 'gatsby-plugin-image'

export interface Content {
  id: string
  frontmatter: { date: string; slug: string; title: string; category: string }
  excerpt: ReactNode
}

export interface Blog {
  frontmatter: {
    title: string
    date: string
    thumbnail_alt: string
    thumbnail: ImageDataLike
  }
}
