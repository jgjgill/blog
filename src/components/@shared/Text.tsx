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

const Text: TextComponent = <C extends React.ElementType = 'span'>({
  as,
  children,
  ...rest
}: StrictPropsWithChildren<
  Props<C> & Omit<React.ComponentPropsWithoutRef<C>, keyof Props<C>>
>) => {
  const Component = as || 'span'

  return <Component {...rest}>{children}</Component>
}

export default Text
