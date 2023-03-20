import styled from '@emotion/styled'
import { MDXProvider } from '@mdx-js/react'
import App from 'App'
import { Comment, Layout, Mdx, Seo, Toc } from 'components'
import { Flex } from 'components/@shared'
import { graphql, PageProps } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import { Blog } from 'types/content'
import { readingTimeWithCount } from 'utils/reading-time'

interface Props {
  mdx: Blog
}

const BlogPost = ({ data, children }: PageProps<Props>) => {
  const thumbnail = getImage(data.mdx.frontmatter.thumbnail)
  const readingTime = readingTimeWithCount(data.mdx.body)

  console.log(data.mdx.tableOfContents)

  if (!thumbnail) throw new Error('이미지가 존재하지 않습니다!')
  return (
    <App>
      <Layout>
        <h1>{data.mdx.frontmatter.title}</h1>
        <time>{data.mdx.frontmatter.date}</time>
        <span>{readingTime.minutes} min read</span>
        <Toc toc={data.mdx.tableOfContents} />
        <Flex justifyContent="center">
          <ThumbnailImage image={thumbnail} alt={data.mdx.frontmatter.thumbnail_alt} />
        </Flex>

        <MDXProvider
          components={{
            h1: Mdx.H1,
            h2: Mdx.H2,
            h3: Mdx.H3,
            p: Mdx.P,
            ul: Mdx.UL,
            li: Mdx.LI,
            blockquote: Mdx.BLOCKQUOTE,
            Callout: Mdx.CALLOUT,
          }}
        >
          {children}
        </MDXProvider>

        <Comment />
      </Layout>
    </App>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date
        thumbnail_alt
        thumbnail {
          childImageSharp {
            gatsbyImageData(transformOptions: { fit: FILL })
          }
        }
      }
      body
      tableOfContents
    }
  }
`

export const Head = () => <Seo />

export default BlogPost

const ThumbnailImage = styled(GatsbyImage)`
  margin: 20px 0;

  width: 50%;

  @media (max-width: 480px) {
    width: 100%;
  }
`
