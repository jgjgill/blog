import styled from '@emotion/styled'
import useA2HS from 'hooks/useA2HS'
import useUnmountAnimation from 'hooks/useUnmountAnimation'
import React from 'react'

import { Flex, Text } from './@shared'

const A2HS = () => {
  const { deferredPrompt, install, clearPrompt } = useA2HS()
  const { isRenderCodition, handleTransitionEnd, triggerAnimation } = useUnmountAnimation(
    Boolean(deferredPrompt),
  )

  if (!isRenderCodition) return null

  return (
    <Container
      className="modal"
      onTransitionEnd={handleTransitionEnd}
      $isAnimation={triggerAnimation}
    >
      <Flex alignItems="center" flexDirection="column" gap={20}>
        <Text as="h3">바로가기 추가</Text>
        <Text as="h4">
          블로그를 방문해주셔서 감사합니다😄 <br /> 바로가기를 추가하시겠습니까?
        </Text>

        <ButtonWrapper
          justifyContent="space-around"
          onTransitionEnd={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <Button as="button" className="modal" onClick={install}>
            추가
          </Button>
          <Button as="button" className="modal" onClick={clearPrompt}>
            취소
          </Button>
        </ButtonWrapper>
      </Flex>
    </Container>
  )
}

export default A2HS

const Container = styled.div<{ $isAnimation: boolean }>`
  position: fixed;
  right: 40px;
  bottom: 40px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  transform: ${({ $isAnimation }) => !$isAnimation && 'translateY(500px)'};
  animation: mountAnimation 1s;
  transition: background-color 0.3s, transform 1s;

  @keyframes mountAnimation {
    0% {
      transform: translateY(500px);
    }
    100% {
      transform: translateY(0);
    }
  }
`

const ButtonWrapper = styled(Flex)`
  width: 100%;
`

const Button = styled(Text)`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  background-color: transparent;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.light};
  }
`
