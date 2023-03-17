import styled from '@emotion/styled'
import React, { HTMLAttributes } from 'react'
import { StrictPropsWithChildren } from 'types/custom'

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  gap?: number
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
}

const Flex = ({
  children,
  gap = 0,
  flexDirection = 'row',
  justifyContent = 'flex-end',
  alignItems = 'start',
  ...props
}: StrictPropsWithChildren<FlexProps>) => {
  // const Element = as || 'div'
  return (
    <StyledFlex
      gap={gap}
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      alignItems={alignItems}
      {...props}
    >
      {children}
    </StyledFlex>
  )
}

const StyledFlex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  gap: ${({ gap }) => `${gap}px`};
`

export default Flex
