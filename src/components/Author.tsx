import styled from '@emotion/styled'
import { Flex } from 'components/@shared'
import React from 'react'

const Author = () => {
  return (
    <Container>
      <Flex flexDirection="column">
        <b>이종길 | 프론트엔드</b>
        <span>Go High</span>
      </Flex>
      <Flex gap={20}>
        <a href="https://github.com/">Github</a>
        <a href="https://www.linkedin.com/in/%EC%A2%85%EA%B8%B8-%EC%9D%B4-bb9b0b241/">
          LinkedIn
        </a>
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
