import styled from '@emotion/styled'
import { MDXProvider } from '@mdx-js/react'
import { Comment, Mdx, Toc } from 'components'
import { Flex } from 'components/@shared'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import { Blog } from 'types/content'
import { readingTimeWithCount } from 'utils/reading-time'

interface Props {
  mdx: Blog
  children: React.ReactNode
}

const BlogPost = ({ mdx, children }: Props) => {
  const thumbnail = getImage(mdx.frontmatter.thumbnail)
  const readingTime = readingTimeWithCount(mdx.body)

  if (!thumbnail) throw new Error('이미지가 존재하지 않습니다!')

  return (
    <>
      <h1>{mdx.frontmatter.title}</h1>
      <time>{mdx.frontmatter.date}</time>
      <span>{readingTime.minutes} min read</span>
      <Toc toc={mdx.tableOfContents} />
      <Flex justifyContent="center">
        <ThumbnailImage image={thumbnail} alt={mdx.frontmatter.thumbnail_alt} />
      </Flex>

      <MDXProvider
        components={{
          h1: Mdx.H1,
          h2: Mdx.H2,
          h3: Mdx.H3,
          p: Mdx.P,
          ul: Mdx.UL,
          li: Mdx.LI,
          a: Mdx.ANCHOR,
          blockquote: Mdx.BLOCKQUOTE,
          Image: Mdx.IMAGE,
          Callout: Mdx.CALLOUT,
          Video: Mdx.VIDEO,
        }}
      >
        {children}
      </MDXProvider>

      <Comment />
    </>
  )
}

export default BlogPost

const ThumbnailImage = styled(GatsbyImage)`
  margin: 20px 0;

  width: 50%;

  @media (max-width: 480px) {
    width: 100%;
  }
`
