import styled from '@emotion/styled'
import App from 'App'
import { Author, Layout, Post, Seo } from 'components'
import { Flex } from 'components/@shared'
import GoogleAdsense from 'components/GoogleAdsense'
import SideProjects from 'components/SideProjects'
import { graphql, HeadFC, PageProps } from 'gatsby'
import { useIsMobile } from 'hooks/useIsMobile'
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
  const isMobile = useIsMobile()

  return (
    <App>
      <Layout>
        <Flex flexDirection="column" gap={8}>
          <Author />

          {isMobile !== null && (
            <GoogleAdsense
              slot={isMobile ? '4481105096' : '4730003951'}
              width={isMobile ? '300px' : '728px'}
              height={isMobile ? '50px' : '90px'}
            />
          )}

          <SideProjects />

          {isMobile !== null && (
            <GoogleAdsense
              slot={isMobile ? '7126180819' : '4840926425'}
              width={isMobile ? '300px' : '728px'}
              height={isMobile ? '50px' : '90px'}
            />
          )}

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
        fields {
          readingTime
        }
      }
    }
  }
`

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'SiteNavigationElement',
      position: 1,
      name: 'Post',
      description: '글을 통해 기록과 공유를 실천합니다.',
      url: 'https://jgjgill-blog.netlify.app/post/',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 2,
      name: 'About',
      description: '저의 삶과 가치관을 공유합니다.',
      url: 'https://jgjgill-blog.netlify.app/about/',
    },
    {
      '@type': 'SiteNavigationElement',
      position: 3,
      name: 'Road',
      description: '삶의 인상 깊은 순간들을 메모합니다.',
      url: 'https://jgjgill-blog.netlify.app/road/',
    },
  ],
}

const schemaAsString = JSON.stringify(schema, null, 2)

export const Head: HeadFC = () => (
  <>
    <Seo />
    <script type="application/ld+json">{schemaAsString}</script>
  </>
)

export default IndexPage
