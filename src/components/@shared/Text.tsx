import React from 'react'
import { StrictPropsWithChildren } from 'types/custom'

interface Props<C extends React.ElementType> {
  as?: C
}

type TextProps<C extends React.ElementType> = StrictPropsWithChildren<Props<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof Props<C>> & {
    ref?: React.ComponentPropsWithRef<C>['ref']
  }

type TextComponent = <C extends React.ElementType = 'span'>(
  props: TextProps<C>,
) => React.ReactElement | null

const Text: TextComponent = React.forwardRef(
  <C extends React.ElementType = 'span'>(
    { as, children, ...rest }: TextProps<C>,
    ref: React.ComponentPropsWithRef<C>['ref'],
  ) => {
    const Element = as || 'span'

    return (
      <Element ref={ref} {...rest}>
        {children}
      </Element>
    )
  },
)

export default Text
