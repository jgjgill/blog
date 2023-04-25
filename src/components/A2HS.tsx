import useA2HS from 'hooks/useA2HS'
import React from 'react'

import { Flex } from './@shared'

const A2HS = () => {
  const { deferredPrompt, install, clearPrompt } = useA2HS()

  if (!deferredPrompt) return null

  return (
    <Flex justifyContent="center">
      <Flex as="button" onClick={install}>
        추가
      </Flex>
      <Flex as="button" onClick={clearPrompt}>
        삭제
      </Flex>
    </Flex>
  )
}

export default A2HS
