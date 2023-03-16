import styled from '@emotion/styled'
import { PATH } from 'constants/path'
import React from 'react'
import { Content } from 'types/content'

import Link from './@shared/Link'

interface Props {
  node: Content
}

const Post = ({ node }: Props) => {
  return (
    <Container>
      <Link to={`${PATH.BLOG}${node.frontmatter.slug}`}>
        <Wrapper>
          <h3>{node.frontmatter.title}</h3>
          <Excerpt>{node.excerpt}</Excerpt>
          <time>{node.frontmatter.date}</time>
        </Wrapper>
      </Link>
    </Container>
  )
}

export default Post

const Container = styled.article`
  border-radius: 20px;
  width: 100%;

  &:hover {
    transition: 0.3s;
    background-color: ${({ theme }) => theme.colors.primary.light};
  }
`

const Wrapper = styled.div`
  padding: 20px;
`

const Excerpt = styled.p`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`
