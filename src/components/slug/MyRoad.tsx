import styled from '@emotion/styled'
import { MDXProvider } from '@mdx-js/react'
import App from 'App'
import { Layout, Mdx, Seo } from 'components'
import { graphql, HeadFC, useStaticQuery } from 'gatsby'
import React from 'react'
import { Blog, Content } from 'types/content'

interface Props {
  mdx: Blog
  children: React.ReactNode
}

interface Roads {
  allMdx: {
    nodes: Content[]
    totalCount: number
    group: {
      totalCount: number
      fieldValue: string
    }[]
  }
}

const MyRoad = ({ mdx, children }: Props) => {
  const data: Roads = useStaticQuery(graphql`
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
  `)

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
        <time>{mdx.frontmatter.date}</time>

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

export const Head: HeadFC = () => <Seo />

export default MyRoad

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
