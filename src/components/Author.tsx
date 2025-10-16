import styled from '@emotion/styled'
import { Flex, Text } from 'components/@shared'
import { PATH } from 'constants/path'
import { StaticImage } from 'gatsby-plugin-image'
import { useAnalytics } from 'hooks/useAnalytics'
import React from 'react'

const Author = () => {
  const { trackEvent } = useAnalytics()

  return (
    <Container>
      <Profile>
        <Flex flexDirection="column" alignItems="center" gap={20}>
          <ImageWrapper>
            <StaticImage
              width={150}
              height={150}
              objectFit="cover"
              src="../images/main-image.jpg"
              alt="main-image"
            />
          </ImageWrapper>
        </Flex>

        <Flex flexDirection="column" gap={20}>
          <Text as="h1">프론트엔드 개발자 이종길입니다.</Text>
          <Flex flexDirection="column" gap={10}>
            <Text as="p">
              작은 것부터 한 걸음씩 나아가며 문제를 접근하는 것을 좋아합니다.
            </Text>
            <Text as="p">주변을 먼저 살피며 팀과 함께 성장하는 것을 지향합니다.</Text>
            <Text as="p">가독성과 일관성을 중요하게 생각합니다.</Text>
          </Flex>
          <Flex gap={20}>
            <Link
              aria-label="posts-link"
              href={PATH.NAMEPLATE}
              target="_blank"
              rel="nofollow"
              onClick={() => {
                trackEvent('author_click', { event_category: 'nameplate' })
              }}
            >
              Business Card
            </Link>

            <Link
              href="https://github.com/jgjgill"
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                trackEvent('author_click', { event_category: 'github' })
              }}
            >
              Github
            </Link>
            <Link
              href="https://www.linkedin.com/in/%EC%A2%85%EA%B8%B8-%EC%9D%B4-bb9b0b241/"
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                trackEvent('author_click', { event_category: 'linkedin' })
              }}
            >
              LinkedIn
            </Link>
          </Flex>
        </Flex>
      </Profile>
    </Container>
  )
}

export default Author

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
  padding-bottom: 0px;
`

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 100%;
  flex-shrink: 0;
`

const Link = styled.a`
  transition: 0.3;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary.base};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.base};
  }
`
