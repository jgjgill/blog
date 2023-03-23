import styled from '@emotion/styled'
import App from 'App'
import { Layout, Post, SearchTemp } from 'components'
import { Flex } from 'components/@shared'
import React from 'react'

const Search = () => {
  return (
    <App>
      <Layout>
        <Flex flexDirection="column" gap={20}>
          <SearchTemp />
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
