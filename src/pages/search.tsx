import styled from '@emotion/styled'
import App from 'App'
import { Layout, Post } from 'components'
import { Flex } from 'components/@shared'
import Fuse from 'fuse.js'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useMemo, useState } from 'react'
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

  const fuse = useMemo(() => {
    return new Fuse<Content>(
      search.fusejs.data,
      {},
      Fuse.parseIndex(JSON.parse(search.fusejs.index)),
    )
  }, [search])

  return (
    <App>
      <Layout>
        <Flex flexDirection="column" gap={20}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />

          <ul>
            {fuse.search(query).map((post) => (
              <Post key={post.refIndex} node={post.item} />
            ))}
          </ul>
          <PostList></PostList>
        </Flex>
      </Layout>
    </App>
  )
}

export default Search

const PostList = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`
