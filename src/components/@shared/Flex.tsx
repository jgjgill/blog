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

type FlexProps<C extends React.ElementType> = StrictPropsWithChildren<Props<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof Props<C>> & {
    ref?: React.ComponentPropsWithRef<C>['ref']
  }

type FlexComponent = <C extends React.ElementType = 'div'>(
  props: FlexProps<C>,
) => React.ReactElement | null

const Flex: FlexComponent = React.forwardRef(
  <C extends React.ElementType = 'div'>(
    {
      as,
      children,
      gap = 0,
      flexDirection = 'row',
      justifyContent = 'flex-start',
      alignItems = 'start',
      ...rest
    }: FlexProps<C>,
    ref: React.ComponentPropsWithRef<C>['ref'],
  ) => {
    const Element = as || 'div'

    return (
      <Element
        gap={gap}
        style={{ display: 'flex', flexDirection, justifyContent, alignItems, gap }}
        ref={ref}
        {...rest}
      >
        {children}
      </Element>
    )
  },
)

export default Flex
