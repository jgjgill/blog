import styled from '@emotion/styled'
import { PATH } from 'constants/path'
import { Link } from 'gatsby'
import React from 'react'
import { Content } from 'types/content'
import { readingTimeWithCount } from 'utils/reading-time'

interface Props {
  node: Content
}

const Post = ({ node }: Props) => {
  const readingTime = readingTimeWithCount(node.body)

  return (
    <Container>
      <Link to={`${PATH.BLOG}${node.frontmatter.slug}`}>
        <Wrapper>
          <h3>{node.frontmatter.title}</h3>
          <Excerpt>{node.excerpt}</Excerpt>
          <time>{node.frontmatter.date}</time> |{' '}
          <span>{readingTime.minutes} min read</span>
        </Wrapper>
      </Link>
    </Container>
  )
}

export default Post

const Container = styled.article`
  border-bottom: 1px solid transparent;
  width: 100%;

  &:hover {
    transition: 0.3s;
    border-bottom: 1px solid ${({ theme }) => theme.colors.secondary.base};
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
