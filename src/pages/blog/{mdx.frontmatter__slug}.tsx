import styled from '@emotion/styled'
import { MDXProvider } from '@mdx-js/react'
import App from 'App'
import { Seo } from 'components'
import Flex from 'components/@shared/Flex'
import Comment from 'components/Comment'
import Layout from 'components/Layout'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'

const BlogPost = ({ data, children }: any) => {
  console.log(data)
  const thumbnail = getImage(data.mdx.frontmatter.thumbnail)!

  return (
    <App>
      <Layout>
        <h1>{data.mdx.frontmatter.title}</h1>
        <time>{data.mdx.frontmatter.date}</time>
        <Flex justifyContent="center">
          <ThumbnailImage image={thumbnail} alt={data.mdx.frontmatter.thumbnail_alt} />
        </Flex>

        <MDXProvider components={{}}>{children}</MDXProvider>

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
        thumbnail_alt
        thumbnail {
          childImageSharp {
            gatsbyImageData(transformOptions: { fit: FILL })
          }
        }
      }
    }
  }
`

export const Head = () => <Seo />

export default BlogPost

const ThumbnailImage = styled(GatsbyImage)`
  width: 50%;

  @media (max-width: 480px) {
    width: 100%;
  }
`
