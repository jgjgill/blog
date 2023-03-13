import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Link as GatsbyLink } from 'gatsby'
import React from 'react'

interface Props {
  path: string
  text: string
  fontSize?: string
}

const Link = ({ path, text, fontSize = 'base' }: Props) => {
  return (
    <StyledLink to={path} fontSize={fontSize}>
      {text}
    </StyledLink>
  )
}

export default Link

const StyledLink = styled<any>(GatsbyLink)`
  ${({ theme, fontSize }) => css`
    font-size: ${theme.fontSize[fontSize]};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.colors.primary.dark};
  `}
`
