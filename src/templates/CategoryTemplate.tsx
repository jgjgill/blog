import styled from '@emotion/styled'
import App from 'App'
import { Author } from 'components'
import Flex from 'components/@shared/Flex'
import Category from 'components/Category'
import Layout from 'components/Layout'
import Post from 'components/Post'
import { graphql, PageProps } from 'gatsby'
import React from 'react'
import { Content } from 'types/content'

interface Props {
  allMdx: {
    nodes: Content[]
  }
}

const CategoryTemplate = ({
  data,
  pageContext,
}: PageProps<Props, { category: string }>) => {
  return (
    <App>
      <Layout>
        <Flex flexDirection="column" gap={20}>
          <Author />
          <Category selectedCategory={pageContext.category} />

          <PostList>
            {data.allMdx.nodes.map((node) => (
              <Post key={node.id} node={node} />
            ))}
          </PostList>
        </Flex>
      </Layout>
    </App>
  )
}

export default CategoryTemplate

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
        }
        id
        excerpt
      }
    }
  }
`

const PostList = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`