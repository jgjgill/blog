import styled from '@emotion/styled'
import React from 'react'

interface Props {
  render: React.ReactNode
}

const PostList = ({ render }: Props) => {
  return <Container>{render}</Container>
}

export default PostList

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 80px;
  width: 100%;
`
