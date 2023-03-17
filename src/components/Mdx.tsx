import styled from '@emotion/styled'
import React from 'react'
import { StrictPropsWithChildren } from 'types/custom'

const Mdx = ({ children }: StrictPropsWithChildren) => children

const H1 = ({ ...props }) => <StyledH1 {...props} />
const H2 = ({ ...props }) => <StyledH2 {...props} />
const H3 = ({ ...props }) => <StyledH3 {...props} />
const P = ({ ...props }) => <StyledP {...props} />
const Callout = ({ ...props }) => <StyledCallout {...props} />
const Ul = ({ ...props }) => <StyledUl {...props} />
const Li = ({ ...props }) => <StyledLi {...props} />

export default Mdx

Mdx.H1 = H1
Mdx.H2 = H2
Mdx.H3 = H3
Mdx.P = P
Mdx.CALLOUT = Callout
Mdx.UL = Ul
Mdx.LI = Li

const StyledH1 = styled.h1`
  line-height: 2;
  margin-bottom: 20px;
`

const StyledH2 = styled.h2`
  line-height: 1.9;
  margin-bottom: 10px;
`
const StyledH3 = styled.h3`
  line-height: 1.8;
  margin-bottom: 5px;
`

const StyledP = styled.p`
  line-height: 1.7;
`

const StyledCallout = styled.aside`
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.primary.light};
  padding: 10px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`

const StyledUl = styled.ul`
  padding: 10px;
`
const StyledLi = styled.li`
  line-height: 1.6;

  ::before {
    content: '-';
    padding-right: 5px;
  }
`
