import styled from '@emotion/styled'
import App from 'App'
import { Layout, Seo } from 'components'
import { Flex, Text } from 'components/@shared'
import { HeadFC } from 'gatsby'
import React from 'react'

const AboutPage = () => {
  return (
    <App>
      <Layout>
        <Flex flexDirection="column" gap={40}>
          <Flex flexDirection="column" gap={20}>
            <h2>Careers</h2>

            <p>공사중..! 🚧</p>
          </Flex>

          <Flex flexDirection="column" gap={20}>
            <h2>Activities</h2>

            <Flex flexDirection="column" gap={40}>
              <Flex flexDirection="column" gap={10}>
                <Description as="h3">
                  모호하고 어렵게 느껴지는 개념을 발표하면서 지식 공유를 실천합니다.
                </Description>

                <Flex flexDirection="column" gap={10}>
                  <Link
                    href="https://present.do/documents/649e4b65c164ca6162d9050e"
                    target="_blank"
                    rel="noreferrer"
                  >
                    불변성
                  </Link>
                  <p>원시값은 불변하다, 참조값은 불변하지 않다?</p>
                </Flex>

                <Flex flexDirection="column" gap={10}>
                  <Link
                    href="https://present.do/documents/64c72b3c10ab9a5ae566556d"
                    target="_blank"
                    rel="noreferrer"
                  >
                    모듈
                  </Link>
                  <p>Vite는 왜 빠르고 어떠한 도구인가?</p>
                </Flex>
              </Flex>

              <Flex flexDirection="column" gap={10}>
                <Description as="h3">
                  오픈 소스 커뮤니티에 지속적으로 관심을 가지며 기여를 통해 성취감을
                  얻습니다.
                </Description>

                <Flex flexDirection="column" gap={10}>
                  <Link
                    href="https://github.com/mdn/translated-content/pulls?q=is%3Apr+author%3Ajgjgill+"
                    target="_blank"
                    rel="noreferrer"
                  >
                    MDN 문서 번역
                  </Link>
                  <p>
                    공식 문서를 기반으로 학습하면서 번역이 되지 않거나 잘못된 번역에 대해
                    주도적으로 개선하고자 합니다.
                  </p>
                </Flex>

                <Flex flexDirection="column" gap={10}>
                  <Link
                    href="https://github.com/toss/slash/pull/335"
                    target="_blank"
                    rel="noreferrer"
                  >
                    toss/slash
                  </Link>
                  <p>
                    오픈 소스 프로젝트에 참여하면서 코드 분석과 기술적 역량을 향상시키고자
                    합니다.
                  </p>
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Flex flexDirection="column" gap={20}>
            <h2>Educations</h2>

            <h3>데브코스</h3>

            <h3>세종대학교</h3>
          </Flex>
        </Flex>
      </Layout>
    </App>
  )
}

export const Head: HeadFC = () => <Seo />

export default AboutPage

const Description = styled(Text)`
  font-size: ${({ theme }) => theme.fontSize.xl};
`

const Link = styled.a`
  transition: 0.3;
  font-weight: ${({ theme }) => theme.fontWeight.bold};

  border-bottom: 2px solid ${({ theme }) => theme.colors.primary.base};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.base};
  }
`
