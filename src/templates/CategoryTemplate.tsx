import App from 'App'
import { PostList } from 'components'
import Flex from 'components/@shared/Flex'
import Category from 'components/Category'
import GoogleAdsense from 'components/GoogleAdsense'
import Layout from 'components/Layout'
import Post from 'components/Post'
import { PATH } from 'constants/path'
import { graphql, HeadFC, PageProps } from 'gatsby'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import React from 'react'
import { Content } from 'types/content'

interface Props {
  allMdx: {
    nodes: Content[]
  }
  category: {
    totalCount: number
    group: {
      totalCount: number
      fieldValue: string
    }[]
  }
}

const CategoryTemplate = ({
  data,
  pageContext,
}: PageProps<Props, { category: string }>) => {
  const { ref, page } = useIntersectionObserver(data.allMdx.nodes.length)

  return (
    <App>
      <Layout>
        <Flex flexDirection="column" gap={8}>
          <Category selectedCategory={pageContext.category} />

          <GoogleAdsense slot="3931169437" />

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

export default CategoryTemplate

export const Head: HeadFC = ({ location }) => {
  const title = 'jgjgill - Post'
  const description = '글을 통해 기록과 공유를 실천합니다.'
  const siteUrl = `https://jgjgill-blog.netlify.app${location.pathname}`
  const ogImage =
    'https://raw.githubusercontent.com/jgjgill/blog/main/src/images/og-image.png'

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="development" />
      <meta name="author" content="jgjgill" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="jgjgill-blog" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <link rel="canonical" href={`https://jgjgill-blog.netlify.app${PATH.POST}`} />
    </>
  )
}

export const query = graphql`
  query ($category: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { category: { in: [$category] } } }
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
