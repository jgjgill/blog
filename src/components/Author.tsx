import styled from '@emotion/styled'
import { Flex, Link } from 'components/@shared'
import React from 'react'

const Author = () => {
  return (
    <Container>
      <Flex flexDirection="column">
        <b>jgjgill</b>
        <i>Go High</i>
      </Flex>
      <Flex gap={20}>
        <Link to="https://github.com/">Github</Link>
        <Link to="https://www.linkedin.com/in/%EC%A2%85%EA%B8%B8-%EC%9D%B4-bb9b0b241/">
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
