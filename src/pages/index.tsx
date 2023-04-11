import App from 'App'
import { Author, Category, Layout, Post, PostList, Seo } from 'components'
import { Flex } from 'components/@shared'
import { graphql, HeadFC, PageProps } from 'gatsby'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
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
  const { ref, page } = useIntersectionObserver(data.allMdx.nodes.length)

  return (
    <App>
      <Layout>
        <Flex flexDirection="column" gap={20}>
          <Author />
          <Category selectedCategory="all" />
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
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          slug
          category
        }
        id
        excerpt
        body
      }
      totalCount
      group(field: { frontmatter: { category: SELECT } }) {
        totalCount
        fieldValue
      }
    }
  }
`

export const Head: HeadFC = () => <Seo />

export default IndexPage
