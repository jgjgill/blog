import styled from '@emotion/styled'
import App from 'App'
import { Layout, Seo } from 'components'
import { PATH } from 'constants/path'
import { graphql, HeadFC, Link, PageProps } from 'gatsby'
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

const LoadPage = ({ data }: PageProps<Props>) => {
  console.log(data.allMdx.nodes[0])
  return (
    <App>
      <Layout>
        <Aside>
          <h2>Recent Posts</h2>
          <ul>
            {data.allMdx.nodes.map((node) => (
              <li key={node.id}>
                <StyledLink to={`${PATH.ROAD}${node.frontmatter.date}`}>
                  {node.frontmatter.date.replaceAll('-', '.')}
                </StyledLink>
              </li>
            ))}
          </ul>
        </Aside>
        <MyRoad>My Road</MyRoad>

        <RoadCard>
          {data.allMdx.nodes.map((node) => (
            <li key={node.id}>
              <StyledDateLink to={`${PATH.ROAD}${node.frontmatter.date}`}>
                <h2>{node.frontmatter.date.replaceAll('-', '.')}</h2>
                <p>{node.frontmatter.title}</p>
              </StyledDateLink>
            </li>
          ))}
        </RoadCard>
      </Layout>
    </App>
  )
}

export const query = graphql`
  query {
    allMdx(
      filter: { fields: { source: { eq: "roads" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      totalCount
      nodes {
        fields {
          source
          slug
        }
        internal {
          contentFilePath
        }
        id
        body
        frontmatter {
          date
          title
        }
      }
    }
  }
`

export const Head: HeadFC = () => <Seo />

export default LoadPage

const Aside = styled.aside`
  position: fixed;
  top: 100px;
  left: 20px;
  border-left: 3px solid ${({ theme }) => theme.colors.primary.base};
  width: 300px;
  height: calc(100vh - 128px);
  padding: 0 10px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: ${({ theme }) => theme.colors.primary.base};
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.primary.light};
  }

  @media (max-width: 1400px) {
    display: none;
  }
`

const MyRoad = styled.h1`
  font-size: xx-large;
  font-weight: bold;
`

const StyledLink = styled(Link)`
  transition: 0.3s;

  &.active {
    color: ${({ theme }) => theme.colors.primary.base};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary.base};
  }
`

const StyledDateLink = styled(Link)`
  h2 {
    transition: 0.3s;
  }

  &.active {
    h2 {
      color: ${({ theme }) => theme.colors.primary.base};
    }
  }

  &:hover {
    h2 {
      color: ${({ theme }) => theme.colors.primary.base};
    }
  }
`

const RoadCard = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;

  h2 {
    font-size: x-large;
  }
`
