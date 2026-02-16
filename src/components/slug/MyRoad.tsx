import styled from '@emotion/styled'
import { MDXProvider } from '@mdx-js/react'
import { Mdx } from 'components'
import { Flex } from 'components/@shared'
import GoogleAdsense from 'components/GoogleAdsense'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import BackSpace from 'images/back-space.inline.svg'
import React from 'react'
import { Blog, Content } from 'types/content'
import { viewTransition } from 'utils/view-transition'

import DateToc from './DateToc'

const MDX_COMPONENTS = {
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
  Video: Mdx.VIDEO,
}

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
          frontmatter {
            date
            title
          }
        }
      }
    }
  `)

  return (
    <>
      <DateToc contents={data.allMdx.nodes} />

      <Flex gap={10}>
        <BackButton
          type="button"
          onClick={() => {
            viewTransition(() => navigate(-1))
          }}
        >
          <BackSpace width={50} height={50} />
        </BackButton>

        <h1 style={{ wordBreak: 'break-all' }}>{mdx.frontmatter.title}</h1>
      </Flex>

      <GoogleAdsense slot="3520864068" />

      <MDXProvider components={MDX_COMPONENTS}>{children}</MDXProvider>
    </>
  )
}

export default MyRoad

const BackButton = styled.button``
