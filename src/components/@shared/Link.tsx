import styled from '@emotion/styled'
import { Link as GatsbyLink } from 'gatsby'
import * as React from 'react'

interface Props {
  path: string
  text: string
}

const Link = ({ path, text }: Props) => {
  return <StyledLink to={path}>{text}</StyledLink>
}

export default Link

const StyledLink = styled(GatsbyLink)``
