import styled from '@emotion/styled'
import App from 'App'
import { Layout, Seo } from 'components'
import { Flex } from 'components/@shared'
import GoogleAdsense from 'components/GoogleAdsense'
import { PATH } from 'constants/path'
import { graphql, HeadFC, Link, PageProps } from 'gatsby'
import { useIsMobile } from 'hooks/useIsMobile'
import React from 'react'
import { Content } from 'types/content'

interface Props {
  allMdx: {
    nodes: Content[]
    totalCount: number
    group: { totalCount: number; fieldValue: string }[]
  }
}

const LoadPage = ({ data }: PageProps<Props>) => {
  const isMobile = useIsMobile()

  return (
    <App>
      <Layout>
        <Flex flexDirection="column" gap={8}>
          <MyRoad>My Road</MyRoad>

          {isMobile !== null && (
            <GoogleAdsense
              slot={isMobile ? '1854941758' : '3739597744'}
              width={isMobile ? '300px' : '728px'}
              height={isMobile ? '50px' : '90px'}
            />
          )}

          <RoadCard>
            {data.allMdx.nodes.map((node) => (
              <li key={node.id}>
                <StyledDateLink to={`${PATH.ROAD}${node.frontmatter.date}`}>
                  <h3>{node.frontmatter.date.replaceAll('-', '.')}</h3>
                  <h2>{node.frontmatter.title}</h2>
                </StyledDateLink>
              </li>
            ))}
          </RoadCard>
        </Flex>
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
`

const StyledDateLink = styled(Link)`
  padding: 0;

  &:hover {
    h3 {
      color: ${({ theme }) => theme.colors.primary.base};
    }

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
