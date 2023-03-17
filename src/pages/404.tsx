import styled from '@emotion/styled'
import App from 'App'
import { Layout, Post } from 'components'
import { Flex, Link } from 'components/@shared'
import { PATH } from 'constants/path'
import { graphql, HeadFC, PageProps } from 'gatsby'
import React from 'react'
import { Content } from 'types/content'

interface Props {
  allMdx: {
    nodes: Content[]
  }
}

const NotFoundPage = ({ data }: PageProps<Props>) => {
  return (
    <App>
      <Layout>
        <Flex flexDirection="column" alignItems="center" gap={40}>
          <Flex flexDirection="column" alignItems="center" gap={20}>
            <Title>죄송합니다. 해당 페이지를 찾을 수 없습니다.😅</Title>
            <HomeButton to={PATH.HOME}>홈으로 이동</HomeButton>
          </Flex>
          <h2>최신 게시물 둘러보기</h2>
          <Flex flexDirection="column" justifyContent="space-between">
            {data.allMdx.nodes.map((node) => (
              <Post key={node.id} node={node} />
            ))}
          </Flex>
        </Flex>
      </Layout>
    </App>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>

export const query = graphql`
  query {
    allMdx(limit: 3, sort: { frontmatter: { date: DESC } }) {
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

const Title = styled.h1`
  width: 100%;
`

const HomeButton = styled(Link)`
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.primary.base};
  color: ${({ theme }) => theme.colors.white};
`
