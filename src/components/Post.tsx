import styled from '@emotion/styled'
import { PATH } from 'constants/path'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import { Content } from 'types/content'
import { readingTimeWithCount } from 'utils/reading-time'

import { Text } from './@shared'

interface Props {
  node: Content
}

const Post = ({ node }: Props) => {
  const readingTime = readingTimeWithCount(node.body)
  const thumbnail = getImage(node.frontmatter.thumbnail)

  if (!thumbnail) throw new Error('이미지가 존재하지 않습니다!')

  return (
    <Container>
      <Link to={`${PATH.POST}${node.frontmatter.slug}`}>
        <Card>
          <ThumbnailImage
            image={thumbnail}
            objectFit="fill"
            alt={node.frontmatter.thumbnail_alt}
          />
          <Wrapper>
            <Title as="h3">{node.frontmatter.title}</Title>
            <Excerpt>{node.excerpt}</Excerpt>
            <Text as="time">{node.frontmatter.date}</Text> |{' '}
            <Text>{readingTime.minutes} min read</Text>
            <Category>{node.frontmatter.category}</Category>
          </Wrapper>
        </Card>
      </Link>
    </Container>
  )
}

export default Post

const Container = styled.article`
  border-bottom: 1px solid transparent;
  width: 100%;

  &:hover {
    h3 {
      color: ${({ theme }) => theme.colors.primary.base};
    }
  }
`

const Card = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

const Wrapper = styled.div`
  padding: 20px;
`
const Title = styled(Text)`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  margin-bottom: 10px;
`

const Excerpt = styled.p`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`
const ThumbnailImage = styled(GatsbyImage)`
  width: 240px;
  height: 240px;
  flex-shrink: 0;
  border-radius: 10px;
  background-color: black;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const Category = styled.div`
  margin-top: 30px;
  padding: 10px 20px;
  width: fit-content;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.black};
`
