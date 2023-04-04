import React from 'react'
import { StrictPropsWithChildren } from 'types/custom'

interface Props<C extends React.ElementType> {
  as?: C
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

const Flex = <C extends React.ElementType = 'div'>({
  as,
  children,
  gap = 0,
  flexDirection = 'row',
  justifyContent = 'flex-end',
  alignItems = 'start',
  ...rest
}: StrictPropsWithChildren<
  Props<C> & Omit<React.ComponentPropsWithoutRef<C>, keyof Props<C>>
>) => {
  const Element = as || 'div'

  return (
    <Element
      gap={gap}
      style={{ display: 'flex', flexDirection, justifyContent, alignItems, gap }}
      {...rest}
    >
      {children}
    </Element>
  )
}

export default Flex
