import styled from '@emotion/styled'
import App from 'App'
import { Author, Category, Layout, Post, Seo } from 'components'
import { Flex } from 'components/@shared'
import { graphql, HeadFC, PageProps } from 'gatsby'
import React from 'react'
import { Content } from 'types/content'

interface Props {
  allMdx: {
    nodes: Content[]
  }
}

const IndexPage = ({ data }: PageProps<Props>) => {
  return (
    <App>
      <Layout>
        <Flex flexDirection="column" gap={20}>
          <Author />
          <Category selectedCategory="all" />
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
      }
    }
  }
`

export const Head: HeadFC = () => <Seo />

export default IndexPage

const PostList = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
