import styled from '@emotion/styled'
import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import { StrictPropsWithChildren } from 'types/custom'

interface LinkProps {
  to: string
}

const Link = ({ to, children, ...props }: StrictPropsWithChildren<LinkProps>) => {
  return (
    <StyledLink to={to} {...props}>
      {children}
    </StyledLink>
  )
}

export default Link

const StyledLink = styled(GatsbyLink)<Omit<LinkProps, 'text'>>`
  color: ${({ theme }) => theme.colors.primary.dark};
`
