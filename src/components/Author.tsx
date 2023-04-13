import styled from '@emotion/styled'
import { Flex, Text } from 'components/@shared'
import React from 'react'

const Author = () => {
  return (
    <Container>
      <Flex flexDirection="column">
        <Text as="b">이종길 | 프론트엔드</Text>
        <Text>Go High</Text>
      </Flex>
      <Flex gap={20}>
        <Link href="https://github.com/jgjgill" target="_blank" rel="noreferrer">
          Github
        </Link>
        <Link
          href="https://www.linkedin.com/in/%EC%A2%85%EA%B8%B8-%EC%9D%B4-bb9b0b241/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </Link>
      </Flex>
    </Container>
  )
}

export default Author

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`

const Link = styled.a`
  transition: 0.3;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary.dark};
  }
`
