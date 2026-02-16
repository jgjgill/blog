import App from 'App'
import { Category, Layout, Post, PostList, Seo } from 'components'
import { Flex } from 'components/@shared'
import GoogleAdsense from 'components/GoogleAdsense'
import { PATH } from 'constants/path'
import { graphql, HeadFC, PageProps } from 'gatsby'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
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

const BlogPage = ({ data }: PageProps<Props>) => {
  const { ref, page } = useIntersectionObserver(data.allMdx.nodes.length)
  const isMobile = useIsMobile()

  return (
    <App>
      <Layout>
        <Flex flexDirection="column" gap={8}>
          <Category selectedCategory="all" />

          {isMobile !== null && (
            <GoogleAdsense
              slot={isMobile ? '3168023427' : '3931169437'}
              width={isMobile ? '300px' : '728px'}
              height={isMobile ? '50px' : '90px'}
            />
          )}

          <PostList
            render={data.allMdx.nodes.slice(0, page).map((node) => (
              <Post key={node.id} node={node} />
            ))}
          />
          <div ref={ref} />
        </Flex>
      </Layout>
    </App>
  )
}

export const query = graphql`
  query {
    allMdx(
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
      totalCount
      group(field: { frontmatter: { category: SELECT } }) {
        totalCount
        fieldValue
      }
    }
  }
`

export const Head: HeadFC = () => (
  <Seo
    title="jgjgill - Post"
    description="글을 통해 기록과 공유를 실천합니다."
    siteUrl={`https://jgjgill-blog.netlify.app${PATH.POST}`}
  />
)

export default BlogPage
