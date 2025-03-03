import styled from '@emotion/styled'
import App from 'App'
import { Layout, Seo } from 'components'
import GoogleAdsense from 'components/GoogleAdsense'
import { PATH } from 'constants/path'
import { graphql, HeadFC, navigate, PageProps } from 'gatsby'
import React from 'react'
import { Content } from 'types/content'
import { viewTransition } from 'utils/view-transition'

interface Props {
  allMdx: {
    nodes: Content[]
    totalCount: number
    group: { totalCount: number; fieldValue: string }[]
  }
}

const LoadPage = ({ data }: PageProps<Props>) => {
  return (
    <App>
      <Layout>
        <MyRoad>My Road</MyRoad>

        <GoogleAdsense slot="3739597744" />

        <RoadCard>
          {data.allMdx.nodes.map((node) => (
            <li key={node.id}>
              <StyledTitleButton
                onClick={() =>
                  viewTransition(() => navigate(`${PATH.ROAD}${node.frontmatter.date}`))
                }
              >
                <h3>{node.frontmatter.date.replaceAll('-', '.')}</h3>
                <h2>{node.frontmatter.title}</h2>
              </StyledTitleButton>
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

export const Head: HeadFC = () => (
  <Seo
    title="jgjgill - Road"
    description="삶의 인상 깊은 순간들을 메모합니다."
    siteUrl={`https://jgjgill-blog.netlify.app${PATH.ROAD}`}
  />
)

export default LoadPage

const MyRoad = styled.h1`
  font-size: xx-large;
  font-weight: bold;
  margin-bottom: 20px;
`

const StyledTitleButton = styled.button`
  padding: 0;
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
    font-size: large;
    text-align: start;
  }

  h3 {
    font-size: medium;
    font-weight: 500;
    text-align: start;
  }
`
