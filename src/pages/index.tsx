import App from 'App'
import { Author, Layout, Post, Seo } from 'components'
import { Flex } from 'components/@shared'
import GoogleAdsense from 'components/GoogleAdsense'
import { graphql, HeadFC, PageProps } from 'gatsby'
import React from 'react'
import { Content } from 'types/content'

interface Props {
  allMdx: {
    nodes: Content[]
    totalCount: number
    group: {
      totalCount: number
      fieldValue: string
    }[]
  }
}

const IndexPage = ({ data }: PageProps<Props>) => {
  return (
    <App>
      <Layout>
        <Flex flexDirection="column" gap={8}>
          <Author />

          <GoogleAdsense slot="4730003951" />

          <Flex flexDirection="column" gap={20}>
            <h2>Recent Posts</h2>

            <Flex flexDirection="column" gap={80} justifyContent="space-between">
              {data.allMdx.nodes.map((node) => (
                <Post key={node.id} node={node} />
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Layout>
    </App>
  )
}

export const query = graphql`
  query {
    allMdx(
      limit: 3
      sort: { frontmatter: { date: DESC } }
      filter: { fields: { source: { eq: "contents" } } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          slug
          category
          thumbnail_alt
          thumbnail {
            childImageSharp {
              gatsbyImageData(transformOptions: { fit: FILL })
            }
          }
        }
        id
        excerpt
        body
      }
    }
  }
`

export const Head: HeadFC = () => <Seo />

export default IndexPage
