import styled from '@emotion/styled'
import App from 'App'
import { Layout, Post, PostList, Seo } from 'components'
import { Flex, Text } from 'components/@shared'
import GoogleAdsense from 'components/GoogleAdsense'
import { PATH } from 'constants/path'
import { graphql, HeadFC, useStaticQuery } from 'gatsby'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { useIsMobile } from 'hooks/useIsMobile'
import useSearch from 'hooks/useSearch'
import React, { useState } from 'react'
import { Content } from 'types/content'

interface searchPost {
  fusejs: {
    index: string
    data: Content[]
  }
}

const Search = () => {
  const search: searchPost = useStaticQuery(graphql`
    {
      fusejs {
        index
        data
      }
    }
  `)
  const [query, setQuery] = useState('')
  const nodes = useSearch(query, search.fusejs)
  const { ref, page } = useIntersectionObserver(nodes.length)
  const isMobile = useIsMobile()

  return (
    <App>
      <Layout>
        <Flex flexDirection="column" gap={8}>
          {isMobile !== null && (
            <GoogleAdsense
              slot={isMobile ? '9696503835' : '4538432263'}
              width={isMobile ? '300px' : '728px'}
              height={isMobile ? '200px' : '280px'}
            />
          )}

          <Flex flexDirection="column" gap={20} style={{ width: '100%' }}>
            <Input
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
            />

            {query !== '' && (
              <Text>
                &apos;<strong>{query}</strong>&apos; 검색 결과 ({nodes.length}개)
              </Text>
            )}

            <PostList
              render={nodes.slice(0, page).map((node) => (
                <Post key={node.refIndex} node={node.item} />
              ))}
            />
          </Flex>
          <div ref={ref} />
        </Flex>
      </Layout>
    </App>
  )
}

export default Search

export const Head: HeadFC = () => (
  <Seo
    title="jgjgill - Search"
    description="블로그 글 검색 기능"
    siteUrl={`https://jgjgill-blog.netlify.app${PATH.SEARCH}`}
  />
)

const Input = styled.input`
  border-radius: 10px;
  width: 100%;
  padding: 10px 20px;
  color: #343434;

  &:focus {
    outline: none;
  }
`
