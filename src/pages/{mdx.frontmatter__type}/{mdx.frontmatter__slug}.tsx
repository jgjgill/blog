import App from 'App'
import { Layout, Seo } from 'components'
import BlogPost from 'components/slug/BlogPost'
import MyRoad from 'components/slug/MyRoad'
import { HeadProps } from 'gatsby'
import { graphql, PageProps } from 'gatsby'
import React from 'react'
import { Blog } from 'types/content'

interface Props {
  mdx: Blog
}

const Slug = ({ data, children }: PageProps<Props>) => {
  return (
    <App>
      <Layout>
        {data.mdx.fields.source === 'roads' && <MyRoad mdx={data.mdx}>{children}</MyRoad>}
        {data.mdx.fields.source === 'contents' && (
          <BlogPost mdx={data.mdx}>{children}</BlogPost>
        )}
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