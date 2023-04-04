import React from 'react'
import { StrictPropsWithChildren } from 'types/custom'

interface Props<C extends React.ElementType> {
  as?: C
}

const Text = <C extends React.ElementType = 'span'>({
  as,
  children,
  ...rest
}: StrictPropsWithChildren<Props<C> & React.ComponentPropsWithoutRef<C>>) => {
  const Component = as || 'span'

  return <Component {...rest}>{children}</Component>
}

export default Text
