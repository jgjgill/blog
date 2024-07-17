import styled from '@emotion/styled'
import App from 'App'
import { Layout, Seo } from 'components'
import { Flex, Text } from 'components/@shared'
import { HeadFC } from 'gatsby'
import React from 'react'

const values = [
  '개발자는 문제를 해결하는 사람이라는 생각을 가지고 있습니다. 이때 문제 상황을 적절하게 접근하여 유연하게 해결하는 것을 중요하게 여깁니다.',
  '비효율을 싫어합니다. 코드 작성부터 커뮤니케이션까지 생산성을 높이는데 관심이 많습니다.',
  '소프트웨어 장인, 정원사가 되고자 합니다. 가치 있는 서비스를 만들되, 품질과 지속 가능성을 놓치고 싶지 않습니다.',
  '개발자이지만 개발자에 의존하지 않은 환경을 만들고 싶습니다. 자동화를 통한 독립적인 환경, 사람이 아닌 문서에 의존하는 환경이 만들고자 합니다.',
  '실패에 크게 연연하지 않습니다. 실패를 겪으면 원인을 찾아 다시 경험하지 않는 것에 중점을 둡니다.',
  '`1일 1배포`를 실천합니다. 작은 성취와 빠른 피드백을 통해 지속적인 개선을 추구합니다.',
  '잘 읽히는 코드가 좋은 코드라는 생각으로 가독성을 가장 중요하게 생각합니다. 그래서 일관된 구조, 직관적인 네이밍, 친절한 주석을 좋아합니다.',
  '좋은 코드를 쓰고자 좋은 코드를 많이 보려고 노력합니다. 이를 위해 오픈 소스 활동을 하면서 성장하고자 합니다.',
]

const AboutPage = () => {
  return (
    <App>
      <Layout>
        <Flex flexDirection="column" gap={40}>
          <Flex flexDirection="column" gap={20}>
            <h2>Careers</h2>

            <Description>
              <Link
                href="https://cashwalk.com/community"
                target="_blank"
                rel="noreferrer"
              >
                캐시워크
              </Link>
              에서 프론트엔드 개발자로 일하고 있습니다. 2024.01. ~
            </Description>
          </Flex>

          <Flex flexDirection="column" gap={20}>
            <h2>Values</h2>

            {values.map((value) => (
              <Description as="p" key={value}>
                {value}
              </Description>
            ))}
          </Flex>

          <Flex flexDirection="column" gap={20}>
            <h2>Activities</h2>

            <Flex flexDirection="column" gap={40}>
              <Flex flexDirection="column" gap={20}>
                <Flex flexDirection="column" gap={10}>
                  <h3>발표</h3>

                  <Flex flexDirection="column" gap={5}>
                    <Link
                      href="https://www.youtube.com/watch?v=J7S7R2aM6Bo"
                      target="_blank"
                      rel="noreferrer"
                    >
                      불변성 - 원시값은 불변하다, 참조값은 불변하지 않다?
                    </Link>

                    <Link
                      href="https://www.youtube.com/watch?v=rZLNp4Y8V4Y"
                      target="_blank"
                      rel="noreferrer"
                    >
                      모듈 -Vite는 왜 빠르고 어떠한 도구인가?
                    </Link>
                  </Flex>
                </Flex>

                <Flex flexDirection="column" gap={10}>
                  <h3>오픈 소스 기여</h3>

                  <Flex flexDirection="column" gap={5}>
                    <Link
                      href="https://github.com/toss/overlay-kit/pulls?q=is%3Apr+author%3Ajgjgill+"
                      target="_blank"
                      rel="noreferrer"
                    >
                      overlay-kit
                    </Link>

                    <Link
                      href="https://github.com/toss/es-toolkit/pulls?q=is%3Apr+author%3Ajgjgill+"
                      target="_blank"
                      rel="noreferrer"
                    >
                      es-toolkit
                    </Link>

                    <Link
                      href="https://github.com/toss/suspensive/pulls?q=is%3Apr+author%3Ajgjgill+"
                      target="_blank"
                      rel="noreferrer"
                    >
                      suspensive
                    </Link>

                    <Link
                      href="https://github.com/mdn/translated-content/pulls?q=is%3Apr+author%3Ajgjgill+"
                      target="_blank"
                      rel="noreferrer"
                    >
                      MDN 문서 번역
                    </Link>
                  </Flex>
                </Flex>

                <Flex flexDirection="column" gap={10}>
                  <h3>커뮤니티</h3>

                  <Flex flexDirection="column" gap={5}>
                    <p>글또</p>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
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
