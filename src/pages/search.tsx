import styled from '@emotion/styled'
import App from 'App'
import { Layout, Post } from 'components'
import { Flex } from 'components/@shared'
import { graphql, useStaticQuery } from 'gatsby'
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

  return (
    <App>
      <Layout>
        <Flex flexDirection="column" gap={20}>
          <Input
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />

          {query !== '' && (
            <span>
              &apos;<strong>{query}</strong>&apos; 검색 결과 ({nodes.length}
              개)
            </span>
          )}

          <PostList>
            {nodes.map((node) => (
              <Post key={node.refIndex} node={node.item} />
            ))}
          </PostList>
        </Flex>
      </Layout>
    </App>
  )
}

export default Search

const Input = styled.input`
  border-radius: 10px;
  width: 100%;
  padding: 10px 20px;
  border: 3px solid ${({ theme }) => theme.colors.secondary.light};

  &:focus {
    outline: none;
  }
`

const PostList = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`
