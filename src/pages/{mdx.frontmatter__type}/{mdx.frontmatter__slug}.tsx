import styled from '@emotion/styled'
import { Seo } from 'components'
import BlogPost from 'components/slug/BlogPost'
import MyRoad from 'components/slug/MyRoad'
import { HeadProps } from 'gatsby'
import { graphql, PageProps } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Blog } from 'types/content'

interface Props {
  mdx: Blog
}

const Slug = ({ data, children }: PageProps<Props>) => {
  if (data.mdx.fields.source === 'roads') {
    return <MyRoad mdx={data.mdx}>{children}</MyRoad>
  }

  if (data.mdx.fields.source === 'contents') {
    return <BlogPost mdx={data.mdx}>{children}</BlogPost>
  }
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
      fields {
        slug
        source
      }
      body
      tableOfContents
    }
  }
`

export const Head = ({
  location,
  pageContext,
}: HeadProps<object, { frontmatter: { title: string; description: string } }>) => {
  return (
    <Seo
      title={pageContext.frontmatter.title}
      description={pageContext.frontmatter.description}
      siteUrl={`https://jgjgill-blog.netlify.app${location.pathname}`}
    />
  )
}

export default Slug

const ThumbnailImage = styled(GatsbyImage)`
  margin: 20px 0;

  width: 50%;

  @media (max-width: 480px) {
    width: 100%;
  }
`
