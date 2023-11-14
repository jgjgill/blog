import styled from '@emotion/styled'
import { MDXProvider } from '@mdx-js/react'
import App from 'App'
import { Layout, Mdx, Seo } from 'components'
import { Flex } from 'components/@shared'
import { PATH } from 'constants/path'
import { graphql, HeadFC, Link, navigate, useStaticQuery } from 'gatsby'
import BackSpace from 'images/back-space.inline.svg'
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
              <StyledLink key={node.id} to={`${PATH.ROAD}${node.frontmatter.date}`}>
                <li>{node.frontmatter.date.replaceAll('-', '.')}</li>
              </StyledLink>
            ))}
          </ul>
        </Aside>
        <Flex gap={10}>
          <BackButton
            type="button"
            onClick={() =>
              document.startViewTransition(() => {
                navigate(-1)
              })
            }
          >
            <BackSpace width={50} height={50} />
          </BackButton>

          <h1>{mdx.frontmatter.title}</h1>
        </Flex>

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

const StyledLink = styled(Link)`
  transition: 0.3s;

  &.active {
    color: ${({ theme }) => theme.colors.primary.base};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary.base};
  }
`

const BackButton = styled.button`
  width: fit-content;
  padding: 0;

  transition: 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.base};
  }
`
