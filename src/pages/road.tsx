import styled from '@emotion/styled'
import { MDXProvider } from '@mdx-js/react'
import App from 'App'
import { Layout, Mdx, Seo } from 'components'
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

const LoadPage = ({ data, children }: PageProps<Props>) => {
  console.log(data)

  return (
    <App>
      <Layout>
        <Aside>
          <h2>Recent Posts</h2>
          <ul>
            {data.allMdx.nodes.map((node) => (
              <li key={node.id}>{node.frontmatter.date.replaceAll('-', '.')}</li>
            ))}
          </ul>
        </Aside>
        <h2>My Road 제작중..! 🫡</h2>
        <div>그날 그날 생각을 정리하는 페이지를 만들 예정 😚</div>

        <ul>
          {data.allMdx.nodes.map((node) => (
            <li key={node.id}>
              <h2>{node.frontmatter.date.replaceAll('-', '.')}</h2>
              <p>{node.body}</p>
            </li>
          ))}
        </ul>

        <MDXProvider
          components={{
            h1: Mdx.H1,
            h2: Mdx.H2,
            h3: Mdx.H3,
            p: Mdx.P,
            ul: Mdx.UL,
            li: Mdx.LI,
            a: Mdx.ANCHOR,
            blockquote: Mdx.BLOCKQUOTE,
            Image: Mdx.IMAGE,
            Callout: Mdx.CALLOUT,
          }}
        >
          {children}
        </MDXProvider>
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
        id
        body
        frontmatter {
          date
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
